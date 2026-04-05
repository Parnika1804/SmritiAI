// ============================================================
// SMRITI AI — API LOGIC FILE
// ============================================================
// MERGE INSTRUCTIONS FOR PERSON 1:
// 1. Add this in your HTML <head> after jsPDF CDN:
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
//    <script src="api.js"></script>
// 2. Make sure both index.html and api.js are in the SAME folder
// 3. Replace dummy card data with actual function calls (see bottom of this file)
// ============================================================

const GEMINI_API_KEY = "AIzaSyC6y0rO4BJdk1fBFamsf6wbX8feY0FR3WI"; // ADD YOUR GEMINI KEY HERE
const HF_API_KEY = "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";     // ADD YOUR HUGGINGFACE KEY HERE

// ============================================================
// FUNCTION 1 — callGemini(prompt)
// Sends any prompt to Gemini and returns the text response
// ============================================================
async function callGemini(prompt) {
  try {
    if (!GEMINI_API_KEY) throw new Error("Gemini API key is missing. Add it at the top of api.js");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;

  } catch (e) {
    console.error("callGemini failed:", e.message);
    throw e;
  }
}

// ============================================================
// FUNCTION 2 — analyzeStatement(witnessStatement)
// Sends witness text to Gemini, returns crimeData as JSON object
// Returns: { suspect, vehicle, scene, incident_summary }
// ============================================================
async function analyzeStatement(witnessStatement) {
  try {
    if (!witnessStatement || witnessStatement.trim().length === 0) {
      throw new Error("Witness statement is empty.");
    }

    const prompt = `You are a forensic AI assistant for Indian police. Analyze this witness statement carefully and extract ALL possible details. Return ONLY a raw JSON object. No markdown, no backticks, no explanation, no extra text. Use empty string "" for any field that is not mentioned.

Return exactly this JSON structure:
{
  "suspect": {
    "age": "",
    "gender": "",
    "height": "",
    "build": "",
    "skin_tone": "",
    "hair": "",
    "eyes": "",
    "clothing": "",
    "distinctive_marks": ""
  },
  "vehicle": {
    "type": "",
    "color": "",
    "make": "",
    "number_plate": "",
    "condition": ""
  },
  "scene": {
    "location": "",
    "time_of_incident": "",
    "environment": "",
    "landmarks": "",
    "weather": ""
  },
  "incident_summary": ""
}

Witness Statement: "${witnessStatement}"`;

    let raw = await callGemini(prompt);
    raw = raw.replace(/```json|```/g, "").trim();
    const crimeData = JSON.parse(raw);
    console.log("analyzeStatement success:", crimeData);
    return crimeData;

  } catch (e) {
    console.error("analyzeStatement failed:", e.message);
    throw e;
  }
}

// ============================================================
// FUNCTION 3 — generateFIR(crimeData, officerInfo, witnessStatement)
// Sends crime data to Gemini, returns a formal FIR as plain text
// officerInfo = { name, badge, station }
// Returns: string (full FIR text)
// ============================================================
async function generateFIR(crimeData, officerInfo, witnessStatement) {
  try {
    if (!crimeData) throw new Error("crimeData is missing.");

    const prompt = `You are an Indian police FIR drafting AI. Write a complete, official First Information Report using the data below. Use formal Indian police language. Return plain text only. No markdown, no backticks, no bullet points.

Officer Name: ${officerInfo?.name || "N/A"}
Badge Number: ${officerInfo?.badge || "N/A"}
Police Station: ${officerInfo?.station || "N/A"}

Crime Data:
${JSON.stringify(crimeData, null, 2)}

Witness Statement:
"${witnessStatement || ""}"

Include all of the following sections in the FIR:
- FIR Number (auto generate a realistic one)
- Date and Time
- Police Station Name
- Applicable IPC Sections
- Complainant / Victim Details
- Full Description of the Incident
- Suspect Physical Description
- Vehicle Description (if applicable)
- Crime Scene Description
- Witness Statement (verbatim excerpt)
- Investigating Officer Name and Signature block

Make it sound fully official and court admissible.`;

    const firText = await callGemini(prompt);
    console.log("generateFIR success");
    return firText;

  } catch (e) {
    console.error("generateFIR failed:", e.message);
    throw e;
  }
}

// ============================================================
// FUNCTION 4 — generateSketch(suspectDetails)
// Sends suspect details to HuggingFace, returns image blob URL
// suspectDetails = crimeData.suspect object
// Returns: image URL string (use as <img src="...">)
// ============================================================
async function generateSketch(suspectDetails) {
  try {
    if (!HF_API_KEY) throw new Error("HuggingFace API key is missing. Add it at the top of api.js");
    if (!suspectDetails) throw new Error("suspectDetails is missing.");

    const s = suspectDetails;
    const imagePrompt = `forensic police sketch portrait, ${s.gender || "person"}, approximately ${s.age || "30"} years old, ${s.height || "average height"}, ${s.build || "medium"} build, ${s.skin_tone || "medium"} complexion, ${s.hair || "black"} hair, ${s.eyes || "dark"} eyes, wearing ${s.clothing || "casual clothes"}, ${s.distinctive_marks || "no distinctive marks"}, police forensic sketch art, pencil drawing style, black and white, detailed, neutral background, front facing portrait`;

    // First attempt — Stable Diffusion 2
    let res = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: imagePrompt })
      }
    );

    // Fallback — FLUX if first model fails
    if (!res.ok) {
      console.warn("Stable Diffusion failed, trying FLUX fallback...");
      res = await fetch(
        "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: imagePrompt })
        }
      );
    }

    if (!res.ok) throw new Error(`HuggingFace error: ${res.status} — model may be loading, try again in 30 seconds`);

    const blob = await res.blob();
    const sketchURL = URL.createObjectURL(blob);
    console.log("generateSketch success:", sketchURL);
    return sketchURL;

  } catch (e) {
    console.error("generateSketch failed:", e.message);
    throw e;
  }
}

// ============================================================
// FUNCTION 5 — downloadPDF(crimeData, firText, sketchURL, caseInfo, officerInfo)
// Generates and downloads a clean white PDF report
// caseInfo = { caseId, victimName, crimeType, incidentDate }
// officerInfo = { name, badge, station }
// ============================================================
async function downloadPDF(crimeData, firText, sketchURL, caseInfo, officerInfo) {
  try {
    if (!window.jspdf) throw new Error("jsPDF not loaded. Add jsPDF CDN in index.html head.");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageW = 210;
    const margin = 18;
    const contentW = pageW - margin * 2;
    let y = 20;

    // Helpers
    const newLine = (gap) => { y += gap || 6; };
    const checkPage = (needed) => {
      if (y + needed > 275) { doc.addPage(); y = 20; }
    };
    const sectionHeading = (title, color) => {
      checkPage(14);
      doc.setFillColor(...color);
      doc.rect(margin, y - 5, contentW, 9, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 3, y + 1);
      newLine(10);
      doc.setTextColor(30, 30, 30);
    };
    const fieldRow = (key, value) => {
      checkPage(8);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text(`${key}:`, margin + 3, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(20, 20, 20);
      const wrapped = doc.splitTextToSize(value || "—", contentW - 50);
      doc.text(wrapped, margin + 45, y);
      newLine(wrapped.length > 1 ? wrapped.length * 5 + 2 : 7);
    };

    // White background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Header block
    doc.setFillColor(10, 20, 50);
    doc.rect(0, 0, 210, 28, "F");
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("SMRITI AI — FORENSIC INVESTIGATION REPORT", margin, 12);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 200, 220);
    doc.text(
      `Case: ${caseInfo?.caseId || "N/A"}   |   Officer: ${officerInfo?.name || "N/A"}   |   Station: ${officerInfo?.station || "N/A"}   |   Generated: ${new Date().toLocaleString()}`,
      margin, 21
    );
    y = 38;

    // Incident Summary
    if (crimeData?.incident_summary) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(60, 60, 60);
      const summaryLines = doc.splitTextToSize(`Summary: ${crimeData.incident_summary}`, contentW);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 6;
    }

    // Suspect
    sectionHeading("SUSPECT PROFILE", [0, 100, 160]);
    const s = crimeData?.suspect || {};
    fieldRow("Age", s.age);
    fieldRow("Gender", s.gender);
    fieldRow("Height", s.height);
    fieldRow("Build", s.build);
    fieldRow("Skin Tone", s.skin_tone);
    fieldRow("Hair", s.hair);
    fieldRow("Eyes", s.eyes);
    fieldRow("Clothing", s.clothing);
    fieldRow("Distinctive Marks", s.distinctive_marks);
    newLine(4);

    // Vehicle
    sectionHeading("VEHICLE DETAILS", [160, 100, 0]);
    const v = crimeData?.vehicle || {};
    fieldRow("Type", v.type);
    fieldRow("Color", v.color);
    fieldRow("Make", v.make);
    fieldRow("Number Plate", v.number_plate);
    fieldRow("Condition", v.condition);
    newLine(4);

    // Scene
    sectionHeading("CRIME SCENE", [0, 130, 80]);
    const sc = crimeData?.scene || {};
    fieldRow("Location", sc.location);
    fieldRow("Time", sc.time_of_incident);
    fieldRow("Environment", sc.environment);
    fieldRow("Landmarks", sc.landmarks);
    fieldRow("Weather", sc.weather);
    newLine(4);

    // Sketch
    if (sketchURL) {
      checkPage(85);
      sectionHeading("AI SUSPECT SKETCH", [50, 50, 100]);
      try {
        doc.addImage(sketchURL, "JPEG", margin + (contentW - 70) / 2, y, 70, 70);
        y += 76;
      } catch (imgErr) {
        doc.setFontSize(7);
        doc.setTextColor(150, 0, 0);
        doc.text("(Sketch image could not be embedded)", margin + 3, y);
        newLine(8);
      }
    }

    // FIR on new page
    if (firText) {
      doc.addPage();
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, "F");
      y = 20;
      sectionHeading("FIRST INFORMATION REPORT", [10, 20, 50]);
      doc.setFontSize(7.5);
      doc.setFont("courier", "normal");
      doc.setTextColor(20, 20, 20);
      const lines = doc.splitTextToSize(firText, contentW - 6);
      for (const line of lines) {
        checkPage(6);
        doc.text(line, margin + 3, y);
        newLine(5.5);
      }
    }

    // Footer on every page
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by Smriti AI — Forensic Witness Interview System", margin, 290);
      doc.text(`Page ${i} of ${totalPages}`, pageW - margin - 20, 290);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, 285, pageW - margin, 285);
    }

    doc.save(`SmritiAI_${caseInfo?.caseId || "Report"}_${Date.now()}.pdf`);
    console.log("downloadPDF success");

  } catch (e) {
    console.error("downloadPDF failed:", e.message);
    throw e;
  }
}

// ============================================================
// MERGE INSTRUCTIONS FOR PERSON 1
// ============================================================
//
// Step 1 — Add these two lines in your HTML <head>:
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
//   <script src="api.js"></script>
//
// Step 2 — Make sure both files are in the SAME folder
//
// Step 3 — Replace dummy data with these function calls:
//
//   ON "Analyze Statement" button click:
//     crimeData = await analyzeStatement(witnessStatement);
//     // then populate your result cards with crimeData.suspect, crimeData.vehicle, crimeData.scene
//
//   ON "Generate Sketch" button click:
//     sketchURL = await generateSketch(crimeData.suspect);
//     // then set <img src={sketchURL}>
//
//   ON "Generate FIR" button click:
//     firText = await generateFIR(crimeData, officerInfo, witnessStatement);
//     // then display firText in your FIR box
//
//   ON "Download PDF" button click:
//     await downloadPDF(crimeData, firText, sketchURL, caseInfo, officerInfo);
//
//   officerInfo = { name, badge, station }   ← from Page 1 inputs
//   caseInfo = { caseId, victimName, crimeType, incidentDate }  ← from Page 2 inputs
//
// ============================================================