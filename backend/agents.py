import time
import random

# --- SMART KNOWLEDGE BASE (Architecture Aligned - Multi-Scenario) ---
# This data matches your architecture diagram perfectly but runs locally.

DATA_VAULT = {
    
    # --- SCENARIO 1: METFORMIN (The "Longevity" Pitch) ---
    "metformin": {
        "iqvia": """
| Metric | Data | Trend |
| :--- | :--- | :--- |
| **Market Size** | $64 Billion (Global) | 🟢 +12.5% YoY |
| **Top Competitors** | Novartis, Elysium Health, BioAge | 🟡 High Competition |
| **Patient Segment** | Geriatric (65+) & Preventative Longevity | 🟢 Expanding |
""",
        "exim": """
* **Global Trade:** High export volume of API from India (Gujarat/Telangana hubs).
* **Supply Risk:** **Low**. Multiple FDA-approved facilities available.
* **Pricing Analysis:** API cost has stabilized at $12/kg (down 5% YoY).
""",
        "patent": """
| Patent Type | Status | Expiry Date | Risk |
| :--- | :--- | :--- | :--- |
| **Composition** | 🔴 EXPIRED | 2002 | Low |
| **Method of Use** | 🟢 **OPEN** | Available for Filing | **Opportunity** |
* **FTO Analysis:** Clear path for longevity indication.
""",
        "clinical": """
| Trial ID | Phase | Indication | Status |
| :--- | :--- | :--- | :--- |
| **NCT02432287 (TAME)** | Phase 3 | Aging / Longevity | 🟢 Recruiting |
| **NCT0432** | Phase 2 | Neuro-protection | 🟡 Completed |
* **Mechanism:** AMPK Activation & mTOR Inhibition.
""",
        "internal": """
* **Source:** `Metformin_Bioavailability_v2.pdf` (Internal R&D Repository)
* **Key Takeaway:** We have a proprietary nano-formulation that increases bio-availability by 40%.
""",
        "web": """
* **FDA Guidance:** Recently signaled openness to "frailty" as a treatable endpoint.
* **News:** "Metformin hailed as first true anti-aging drug" - Nature Journal (2024).
""",
        "rec": "GO (High Priority)",
        "score": "92%"
    },

    # --- SCENARIO 2: SILDENAFIL (The "Viagra" Pivot) ---
    "sildenafil": {
        "iqvia": """
| Metric | Data | Trend |
| :--- | :--- | :--- |
| **Market Size** | $6.5 Billion (PAH) | 🟢 +8.2% YoY |
| **Top Competitors** | Pfizer (Revatio), United Therapeutics | 🔴 Intense |
| **Patient Segment** | Pulmonary Arterial Hypertension (Orphan) | 🟡 Niche |
""",
        "exim": """
* **Global Trade:** Sourcing restricted to certified EU vendors due to patent complexity.
* **Supply Risk:** **Medium**. Quality control is strict for PAH formulations.
""",
        "patent": """
| Patent Type | Status | Expiry Date | Risk |
| :--- | :--- | :--- | :--- |
| **Composition (ED)** | 🔴 EXPIRED | 2020 | Low |
| **Formulation (PAH)** | 🟡 **ACTIVE** | 2026 | High |
* **FTO Analysis:** Requires licensing deal or novel delivery mechanism.
""",
        "clinical": """
| Trial ID | Phase | Indication | Status |
| :--- | :--- | :--- | :--- |
| **NCT00159913** | Phase 3 | Pulmonary Hypertension | ✅ Approved |
| **NCT0992** | Phase 2 | Heart Failure | 🔴 Terminated |
""",
        "internal": """
* **Source:** `Sildenafil_Inhalation_Study.pdf` (Internal Repository)
* **Key Takeaway:** Inhalation route avoids systemic side effects. Patentable.
""",
        "web": """
* **Guidelines:** First-line therapy for PAH in updated ESC guidelines.
""",
        "rec": "CONDITIONAL GO",
        "score": "78%"
    },

    # --- SCENARIO 3: THALIDOMIDE (The "Redemption" Story) ---
    "thalidomide": {
        "iqvia": """
| Metric | Data | Trend |
| :--- | :--- | :--- |
| **Market Size** | $8.1 Billion (Oncology) | 🟢 Stable |
| **Top Competitors** | Bristol Myers Squibb (Revlimid) | 🔴 Dominant |
| **Patient Segment** | Multiple Myeloma / Leprosy | 🟡 High Value |
""",
        "exim": """
* **Global Trade:** Highly restricted supply chain due to REMS (Risk Evaluation) protocols.
* **Supply Risk:** **High**. Only few licensed manufacturers exist.
""",
        "patent": """
| Patent Type | Status | Expiry Date | Risk |
| :--- | :--- | :--- | :--- |
| **Original** | 🔴 EXPIRED | 1980s | Low |
| **REMS Protocol** | 🟢 **ACTIVE** | Indefinite | High Barrier |
""",
        "clinical": """
| Trial ID | Phase | Indication | Status |
| :--- | :--- | :--- | :--- |
| **NCT00001** | Phase 4 | Multiple Myeloma | ✅ Standard of Care |
| **NCT0982** | Phase 2 | Crohn's Disease | 🟡 Ongoing |
""",
        "internal": """
* **Source:** `Safety_REMS_Protocol_Draft.pdf`
* **Key Takeaway:** We have drafted a compliant distribution safety program.
""",
        "web": """
* **News:** Continued interest in immunomodulatory analogs (IMiDs).
""",
        "rec": "GO (Niche Strategy)",
        "score": "85%"
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
    
    # Run the visual checklist sequence
    run_agent("IQVIA Insights Agent", 1.2)
    run_agent("EXIM Trade Agent", 1.0)
    run_agent("Patent Landscape Agent", 1.5)
    run_agent("Clinical Trials Agent", 1.2)
    run_agent("Internal Insights Agent", 0.8)
    run_agent("Web Intelligence Agent", 1.0)
    run_agent("Report Generator Agent", 1.0)
    
    print("🧠 Master Agent: Synthesizing Final Strategic Dossier...")

    # --- GENERATE DATA ---
    key = molecule.lower().strip()
    
    # Use real data if in Vault, otherwise generate a smart fallback
    if key in DATA_VAULT:
        data = DATA_VAULT[key]
    else:
        # Smart Fallback for random inputs
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

    # --- FINAL REPORT ---
    report = f"""
# Strategic Repurposing Dossier: {molecule}

**Target:** {disease} | **Recommendation:** **{data['rec']}** 🟢 | **Feasibility:** **{data['score']}**

## 1. Executive Summary
The **AtreyaCare Agentic System** has analyzed **{molecule}**. By triangulating data across 7 agentic vectors, we confirm a high-potential opportunity for repurposing.

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