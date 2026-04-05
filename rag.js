// ============================================================
// SMRITI AI — RAG.JS
// RAG-Powered Legal FIR Generation using Pinecone + Gemini
// ============================================================
// SETUP: Paste your keys below before using
// ============================================================

const PINECONE_API_KEY  = "pcsk_5TTfFi_7fADDo7GnQXzWCkDKhGCBA3JQvynULqmPzsbdsch25ncq1pZGGPd1s2pdVfYS1W";   // ADD YOUR PINECONE API KEY HERE
const PINECONE_HOST     = "https://fir-templates-4i8008b.svc.aped-4627-b74a.pinecone.io";   // ADD YOUR PINECONE INDEX HOST URL HERE
                                // e.g. https://fir-templates-xxxx.svc.xxxx.pinecone.io

// Reuse Gemini key from api.js — make sure api.js is loaded before rag.js
// If running standalone, uncomment and fill the line below:
// const GEMINI_API_KEY = "";

// ============================================================
// STEP 1 — EMBED TEXT USING GEMINI EMBEDDING API
// Returns a 768-dimensional float array for any input text
// ============================================================
async function embedText(text) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/embedding-001",
          content: { parts: [{ text: text }] }
        })
      }
    );
    const data = await response.json();
    if (!data.embedding || !data.embedding.values) {
      throw new Error("Embedding API returned no values: " + JSON.stringify(data));
    }
    return data.embedding.values;
  } catch (err) {
    console.error("embedText error:", err);
    throw err;
  }
}

// ============================================================
// STEP 2 — UPLOAD ALL 10 FIR SAMPLES TO PINECONE
// Call this ONCE from test-rag.html to populate the database
// Do NOT call this on every FIR generation
// ============================================================
async function uploadFIRSamples() {
  if (typeof FIR_SAMPLES === "undefined") {
    throw new Error("FIR_SAMPLES not found. Make sure fir-samples.js is loaded before rag.js");
  }

  const results = [];

  for (let i = 0; i < FIR_SAMPLES.length; i++) {
    try {
      console.log(`Embedding FIR sample ${i + 1} of ${FIR_SAMPLES.length}...`);

      const vector = await embedText(FIR_SAMPLES[i]);

      const response = await fetch(`${PINECONE_HOST}/vectors/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": PINECONE_API_KEY
        },
        body: JSON.stringify({
          vectors: [{
            id: `fir-sample-${i}`,
            values: vector,
            metadata: {
              text: FIR_SAMPLES[i],
              index: i
            }
          }]
        })
      });

      const result = await response.json();
      console.log(`Sample ${i + 1} uploaded:`, result);
      results.push({ index: i, success: true });

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300));

    } catch (err) {
      console.error(`Failed to upload sample ${i + 1}:`, err);
      results.push({ index: i, success: false, error: err.message });
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`Upload complete: ${successCount}/${FIR_SAMPLES.length} samples uploaded.`);
  return results;
}

// ============================================================
// STEP 3 — RETRIEVE MOST SIMILAR FIR TEMPLATE FROM PINECONE
// Takes a crime description, returns the most matching FIR template
// ============================================================
async function retrieveFIRTemplate(crimeDescription) {
  try {
    const queryVector = await embedText(crimeDescription);

    const response = await fetch(`${PINECONE_HOST}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": PINECONE_API_KEY
      },
      body: JSON.stringify({
        vector: queryVector,
        topK: 1,
        includeMetadata: true
      })
    });

    const data = await response.json();

    if (!data.matches || data.matches.length === 0) {
      console.warn("No matches found in Pinecone. Using fallback template.");
      return null;
    }

    const bestMatch = data.matches[0];
    console.log(`Retrieved FIR template (score: ${bestMatch.score.toFixed(3)})`);
    return bestMatch.metadata.text;

  } catch (err) {
    console.error("retrieveFIRTemplate error:", err);
    return null; // Return null so generateRAGFIR can fall back gracefully
  }
}

// ============================================================
// STEP 4 — GENERATE FIR USING RAG (MAIN FUNCTION)
// This replaces generateFIR() from api.js
// Call this from index.html handleGenerateFIR()
// ============================================================
async function generateRAGFIR(crimeData, officerInfo, witnessStatement) {
  try {
    // Build a short crime description for similarity search
    const crimeDescription = [
      crimeData?.scene?.location || "",
      crimeData?.incident_summary || "",
      crimeData?.scene?.time_of_incident || ""
    ].join(" ").trim() || witnessStatement.slice(0, 200);

    // Retrieve the most similar real FIR template from Pinecone
    const template = await retrieveFIRTemplate(crimeDescription);

    // Build the RAG prompt
    let prompt = "";

    if (template) {
      prompt = `You are a senior Indian police officer drafting an official FIR document.

TASK: Generate a complete, court-admissible First Information Report (FIR) in the exact same format and structure as the TEMPLATE below. Fill in the template with the CRIME DATA provided. Do NOT copy the template's facts — only copy the FORMAT, structure, section headings, and official language style.

TEMPLATE FORMAT TO FOLLOW:
${template}

---

NOW FILL THIS FORMAT WITH THE FOLLOWING ACTUAL CRIME DATA:

Officer Name: ${officerInfo?.name || "N/A"}
Badge Number: ${officerInfo?.badge || "N/A"}
Rank: ${officerInfo?.rank || "N/A"}
Police Station: ${officerInfo?.station || "N/A"}

Suspect Description:
- Gender: ${crimeData?.suspect?.gender || "Unknown"}
- Age: ${crimeData?.suspect?.age || "Unknown"}
- Height: ${crimeData?.suspect?.height || "Unknown"}
- Build: ${crimeData?.suspect?.build || "Unknown"}
- Complexion: ${crimeData?.suspect?.skin_tone || "Unknown"}
- Hair: ${crimeData?.suspect?.hair || "Unknown"}
- Clothing: ${crimeData?.suspect?.clothing || "Unknown"}
- Distinctive Marks: ${crimeData?.suspect?.distinctive_marks || "None observed"}

Vehicle Details:
- Type: ${crimeData?.vehicle?.type || "Unknown"}
- Color: ${crimeData?.vehicle?.color || "Unknown"}
- Make: ${crimeData?.vehicle?.make || "Unknown"}
- Number Plate: ${crimeData?.vehicle?.number_plate || "Unknown"}
- Condition: ${crimeData?.vehicle?.condition || "Unknown"}

Crime Scene:
- Location: ${crimeData?.scene?.location || "Unknown"}
- Time: ${crimeData?.scene?.time_of_incident || "Unknown"}
- Environment: ${crimeData?.scene?.environment || "Unknown"}
- Weather: ${crimeData?.scene?.weather || "Unknown"}
- Landmarks: ${crimeData?.scene?.landmarks || "Unknown"}

Incident Summary: ${crimeData?.incident_summary || "See witness statement below"}

Witness Statement (verbatim):
${witnessStatement}

INSTRUCTIONS:
1. Follow the TEMPLATE FORMAT exactly — same section numbers, same headings, same official language
2. Fill in ALL fields with the crime data above
3. Use formal Indian police report language throughout
4. Generate a realistic FIR Number, today's date, and all header fields
5. The "F.I.R. Contents" section should be a formal third-person narrative based on the witness statement
6. End with "Action Taken" and Investigating Officer details
7. Return plain text only — no markdown, no asterisks, no backticks`;

    } else {
      // Fallback prompt if Pinecone retrieval fails
      prompt = `You are a senior Indian police officer. Write a complete, court-admissible First Information Report (FIR) under Section 154 Cr.P.C. in standard Indian police format.

Include all standard FIR fields: District, Police Station, FIR No, Date & Time, Act & Sections, Type of Information, Date & Time of Occurrence, Accused details, Property details if any, FIR Contents (formal narrative), and Action Taken.

Use formal Indian legal language throughout.

Crime Data:
Officer: ${officerInfo?.name || "N/A"}, Badge: ${officerInfo?.badge || "N/A"}, Station: ${officerInfo?.station || "N/A"}
Suspect: ${JSON.stringify(crimeData?.suspect || {})}
Vehicle: ${JSON.stringify(crimeData?.vehicle || {})}
Scene: ${JSON.stringify(crimeData?.scene || {})}
Summary: ${crimeData?.incident_summary || ""}
Witness Statement: ${witnessStatement}

Return plain text FIR only. No markdown.`;
    }

    // Call Gemini to generate the final FIR
    const firText = await callGemini(prompt);
    return firText;

  } catch (err) {
    console.error("generateRAGFIR error:", err);
    throw new Error("RAG FIR generation failed: " + err.message);
  }
}

// ============================================================
// MERGE INSTRUCTIONS FOR index.html
// ============================================================
// 1. Add in <head> BEFORE api.js:
//    <script src="fir-samples.js"></script>
//    <script src="rag.js"></script>
//
// 2. In handleGenerateFIR() inside index.html, replace:
//    generatedFirText = await generateFIR(crimeData, officerInfo, witnessStatement);
//    WITH:
//    generatedFirText = await generateRAGFIR(crimeData, officerInfo, witnessStatement);
//
// 3. Make sure GEMINI_API_KEY is defined in api.js (loaded before rag.js)
//    rag.js reuses that same key automatically
//
// 4. Run uploadFIRSamples() ONCE from test-rag.html before demo
//    After that, Pinecone has all 10 templates and is ready
// ==========================================