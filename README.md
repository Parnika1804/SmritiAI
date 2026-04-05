# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
# 🧠 Smriti AI — Forensic Witness Interview System

> AI-powered forensic tool for Indian police that converts witness testimony into court-admissible FIRs, blockchain-stamped for tamper-proof integrity.

---

## 🚔 What Is Smriti AI?

**Smriti AI** is a single-page forensic interview system built for Indian law enforcement. A police officer records or types a witness statement in any language — Hindi, Punjabi, English — and the system automatically:

- Translates the statement to English
- Extracts structured crime data (suspect, vehicle, scene)
- Generates a suspect sketch using AI
- Produces a court-admissible FIR using RAG (Retrieval-Augmented Generation)
- Stamps the FIR hash on the **Ethereum Sepolia blockchain** for tamper-proof integrity

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎙️ Multilingual Voice Input | Speak in Hindi, Punjabi, or English — auto-transcribed via Web Speech API |
| 🌐 Auto Translation | Gemini translates any language to English before analysis |
| 🔍 Crime Data Extraction | Gemini extracts suspect description, vehicle details, and scene info from testimony |
| 🖼️ AI Suspect Sketch | HuggingFace generates a 2D forensic sketch from suspect description |
| 📄 RAG-Powered FIR Generation | Pinecone retrieves the most similar real FIR template; Gemini fills it with case data |
| 🔐 Blockchain Integrity | FIR SHA-256 hash stored on Sepolia testnet smart contract — tamper-evident forever |
| ✅ FIR Verification | One-click verify checks if FIR has been altered since stamping |
| 🗺️ Crime Scene Sketch | 2D SVG scene diagram + animated canvas reconstruction from complaint text |
| 📥 PDF Export | Download the generated FIR as a PDF |

---

## 🗂️ File Structure

```
SmritiAI/
├── index.html          # Main app — all pages, UI, and core logic
├── api.js              # Gemini API calls (analyzeStatement, generateFIR, callGemini)
├── rag.js              # RAG pipeline — Pinecone embed, retrieve, generateRAGFIR
├── fir-samples.js      # 10 real Indian FIR templates for Pinecone vector DB
├── test-rag.html       # Pinecone upload + RAG test panel (run once before demo)
├── test-sketch.html    # Crime scene 2D sketch + animation generator
└── multilingual-test.html  # Voice/text multilingual input test
```

---

## 🧱 Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS, single file, no framework
- **AI** — Google Gemini 1.5 Flash (analysis, translation, FIR generation)
- **Embeddings** — Gemini `text-embedding-004` (768-dim vectors)
- **Vector DB** — Pinecone (cosine similarity, FIR template retrieval)
- **Sketch Gen** — HuggingFace Inference API (Stable Diffusion)
- **Blockchain** — Solidity smart contract on Ethereum Sepolia testnet
- **Contract Address** — `0x73c8AE079520E552Ae3c8701FD1acc31E70F4632`
- **Wallet** — MetaMask (ethers.js v6)
- **PDF** — jsPDF

---

## ⚙️ Setup & Usage

### 1. Clone the repo
```bash
git clone https://github.com/Parnika1804/SmritiAI.git
cd SmritiAI
```

### 2. Add your API keys

**In `api.js`:**
```javascript
const GEMINI_API_KEY = "your-gemini-api-key";
```

**In `rag.js`:**
```javascript
const PINECONE_API_KEY = "your-pinecone-api-key";
const PINECONE_HOST    = "https://your-index.svc.xxxx.pinecone.io";
```

### 3. Set up Pinecone (run once)
- Go to [pinecone.io](https://pinecone.io), create a free index
- Name: `fir-templates`, Dimensions: `768`, Metric: `cosine`
- Open `test-rag.html` in Chrome
- Click **"Upload All 10 FIR Samples"** — wait ~30 seconds
- Done. Pinecone is ready forever after this.

### 4. Install MetaMask
- Install [MetaMask](https://metamask.io) Chrome extension
- Switch network to **Sepolia Testnet**
- Get free test ETH from [sepoliafaucet.com](https://sepoliafaucet.com)

### 5. Open the app
```
Open index.html in Chrome
```
No server needed. Runs entirely in the browser.

---

## 🔄 How It Works — Flow

```
Witness speaks/types in any language
        ↓
Gemini translates to English
        ↓
Gemini extracts: suspect + vehicle + scene data
        ↓
HuggingFace generates suspect sketch
        ↓
Pinecone retrieves most similar FIR template (RAG)
        ↓
Gemini generates court-admissible FIR using template
        ↓
SHA-256 hash of FIR → stored on Sepolia blockchain
        ↓
Officer downloads PDF + blockchain receipt
```

---

## 🔐 Smart Contract

Deployed on **Ethereum Sepolia Testnet**

```
Address: 0x73c8AE079520E552Ae3c8701FD1acc31E70F4632
```

**Functions:**
```solidity
function storeFIR(string caseId, string hash) public
function verifyFIR(string caseId, string hash) public view returns (bool)
```

Every generated FIR is hashed with SHA-256 and stored on-chain. The **Verify Integrity** button re-hashes the current FIR and checks it against the blockchain — any tampering is instantly detected.

---

## 🧪 Test Files

| File | Purpose |
|---|---|
| `test-rag.html` | Upload FIR samples to Pinecone, test retrieval, test full RAG pipeline |
| `test-sketch.html` | Enter any complaint → get 2D crime scene sketch or animation |
| `multilingual-test.html` | Test voice input in Hindi/Punjabi/English with Gemini translation |

---

## 🚀 Demo Checklist

- [ ] MetaMask installed and on Sepolia network
- [ ] Gemini API key in `api.js`
- [ ] Pinecone keys in `rag.js`
- [ ] FIR samples uploaded via `test-rag.html` (once)
- [ ] Open `index.html` in Chrome

---

## 👩‍💻 Built By

**Parnika** — built under extreme time pressure for a hackathon 🔥

---

## 📄 License

MIT
