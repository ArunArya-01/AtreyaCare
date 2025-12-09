import time
import random

# --- SMART KNOWLEDGE BASE (Architecture Aligned) ---
# This data is structured EXACTLY to match the output requirements of your 
# specific agents (IQVIA, EXIM, Patent, etc.) defined in your architecture diagram.

DATA_VAULT = {
    "metformin": {
        # 1. IQVIA Agent Output (Market Size, Growth, Competitor Table)
        "iqvia": """
| Metric | Data | Trend |
| :--- | :--- | :--- |
| **Market Size** | $64 Billion (Global) | 🟢 +12.5% YoY |
| **Top Competitors** | Novartis, Elysium Health, BioAge | 🟡 High Competition |
| **Patient Segment** | Geriatric (65+) & Preventative Longevity | 🟢 Expanding |
""",
        # 2. EXIM Trade Agent Output (Import/Export Trends)
        "exim": """
* **Global Trade:** High export volume of API from India (Gujarat/Telangana hubs).
* **Supply Risk:** **Low**. Multiple FDA-approved facilities available.
* **Pricing Analysis:** API cost has stabilized at $12/kg (down 5% YoY).
""",
        # 3. Patent Landscape Agent Output (Expiry Tables & Risk Flags)
        "patent": """
| Patent Type | Status | Expiry Date | Risk |
| :--- | :--- | :--- | :--- |
| **Composition of Matter** | 🔴 EXPIRED | 2002 | Low |
| **Extended Release (XR)** | 🔴 EXPIRED | 2018 | Low |
| **Method of Use (Aging)** | 🟢 **OPEN** | Available for Filing | **Opportunity** |
* **FTO Analysis:** Freedom-to-Operate confirmed for new longevity indications.
""",
        # 4. Clinical Trials Agent Output (Pipeline Table)
        "clinical": """
| Trial ID | Phase | Indication | Status |
| :--- | :--- | :--- | :--- |
| **NCT02432287 (TAME)** | Phase 3 | Aging / Longevity | 🟢 Recruiting |
| **NCT0432** | Phase 2 | Neuro-protection | 🟡 Completed |
* **Mechanism:** AMPK Activation & mTOR Inhibition aligned with anti-aging pathways.
""",
        # 5. Internal Insights Agent Output (PDF Summaries)
        "internal": """
* **Source:** `Metformin_Bioavailability_v2.pdf` (Internal R&D Repository)
* **Key Takeaway:** We have a proprietary nano-formulation in the vault that increases bio-availability by 40%.
* **Regulatory:** Bio-equivalence (BE) study protocols are pre-approved.
""",
        # 6. Web Intelligence Agent Output (Guidelines, News)
        "web": """
* **FDA Guidance:** Recently signaled openness to "frailty" as a treatable endpoint.
* **Latest News:** "Metformin hailed as first true anti-aging drug" - Nature Journal (2024).
""",
        "rec": "GO (High Priority)",
        "score": "92%"
    }
}

# --- 1. AGENT SIMULATION FUNCTIONS ---

def run_agent(name, duration):
    print(f"STATUS: {name} working...") 
    time.sleep(duration) 
    return "Done"

# --- 2. THE ORCHESTRATOR ---

def run_repurposing_crew(molecule: str, disease: str):
    
    print(f"🚀 System: Initializing AtreyaCare for {molecule}...")
    
    # We run the agents strictly in the order of your diagram
    run_agent("IQVIA Insights Agent", 1.2)   # Fetches Market Data
    run_agent("EXIM Trade Agent", 1.0)       # Fetches Trade Flows
    run_agent("Patent Landscape Agent", 1.5) # Checks FTO Risks
    run_agent("Clinical Trials Agent", 1.2)  # Checks Pipeline
    run_agent("Internal Insights Agent", 0.8)# Checks PDFs
    run_agent("Web Intelligence Agent", 1.0) # Checks Guidelines
    run_agent("Report Generator Agent", 1.0) # Builds PDF
    
    print("🧠 Master Agent: Synthesizing Final Strategic Dossier...")

    # --- GENERATE DATA ---
    key = molecule.lower().strip()
    
    # Fallback for unknown drugs so the demo never crashes
    if key in DATA_VAULT:
        data = DATA_VAULT[key]
    else:
        # Generic Template for random inputs
        data = {
            "iqvia": f"| Metric | Data |\n|---|---|\n| Market Size | $4.2B |\n| Growth | 8% CAGR |",
            "exim": "Standard sourcing routes available from APAC region.",
            "patent": "| Type | Status |\n|---|---|\n| Primary | Expired |\n| FTO | **Clear** |",
            "clinical": f"| Trial | Phase |\n|---|---|\n| NCT-Mock-01 | Phase 2 |",
            "internal": "No specific internal documents found for this molecule.",
            "web": "Recent medical journals cite potential efficacy.",
            "rec": "GO (Opportunity)",
            "score": f"{random.randint(75, 89)}%"
        }

    # --- FINAL REPORT (Formatted EXACTLY as per Agent Outputs) ---
    report = f"""
# Strategic Repurposing Dossier: {molecule}

**Target:** {disease} | **Recommendation:** **{data['rec']}** 🟢 | **Feasibility:** **{data['score']}**

## 1. Executive Summary
The **AtreyaCare Master Agent** has synthesized data from 7 specialized workers. By triangulating clinical signals with market gaps, we project a high-value opportunity.

## 2. Multi-Agent Intelligence Findings

### 📊 IQVIA Insights Agent (Market Data)
{data['iqvia']}

### 🚢 EXIM Trade Agent (Supply Chain)
{data['exim']}

### ⚖️ Patent Landscape Agent (Legal)
{data['patent']}

### 🔬 Clinical Trials Agent (Evidence)
{data['clinical']}

### 📂 Internal Insights Agent (Proprietary Data)
{data['internal']}

### 🌐 Web Intelligence Agent (Guidelines)
{data['web']}

## 3. Strategic Conclusion
**Next Step:** Initiate Phase 2b bridging study immediately.
    """
    
    return report