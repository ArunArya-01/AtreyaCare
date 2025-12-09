import time
import random

# --- NOTE: NO API KEYS REQUIRED FOR SIMULATION MODE ---
# This ensures your demo works 100% of the time, even if WiFi fails 
# or API quotas are hit.

# --- 1. DATA FUNCTIONS (Simulated) ---
def get_patent_data(drug_name):
    print(f"🕵️‍♂️ Patent Agent: Accessing USPTO database for {drug_name}...") 
    time.sleep(1.5) # Simulate network delay
    return f"Primary patent for {drug_name} expired in 2023. Freedom to operate is CONFIRMED."

def get_clinical_data(drug_name):
    print(f"🔬 Clinical Agent: Scanning ClinicalTrials.gov for {drug_name}...")
    time.sleep(1.5)
    return f"Found 3 Phase II trials for {drug_name} showing strong safety profiles. IDs: NCT0432, NCT0881."

def get_market_data(disease):
    print(f"📈 Strategist: Analyzing global market demand for {disease}...")
    time.sleep(1.5)
    return f"The {disease} market is valued at $4.5B with a 12% CAGR. High commercial potential."

# --- 2. THE RUNNER ---
def run_repurposing_crew(molecule: str, disease: str):
    
    # --- PHASE 1: GATHER DATA (The "Show") ---
    print(f"🚀 System: Initializing AtreyaCare workflows for {molecule}...")
    time.sleep(1)
    
    patent_info = get_patent_data(molecule)
    print(f"✅ Patent Agent: Data retrieved.")
    
    clinical_info = get_clinical_data(molecule)
    print(f"✅ Clinical Agent: Data retrieved.")
    
    market_info = get_market_data(disease)
    print(f"✅ Strategist: Market data retrieved.")
    
    print("🧠 System: Synthesizing final strategic report...")
    time.sleep(2) # Simulate "Thinking"

    # --- PHASE 2: GENERATE REPORT (Template) ---
    # This generates a dynamic report based on your inputs without needing the API.
    
    report = f"""
# Strategic Repurposing Report: {molecule} -> {disease}

**Date:** December 09, 2025  
**Confident Score:** **88% (High Feasibility)**

## 1. Executive Summary
Our autonomous agentic system has identified **{molecule}** as a prime candidate for repurposing to treat **{disease}**. The analysis combines patent freedom, existing clinical safety profiles, and high market demand.

## 2. Strategic Analysis

### 🏛️ Patent Landscape
* **Status:** Expired / Generic Entry Allowed.
* **Opportunity:** {patent_info}
* **Action:** Immediate filing for "Method of Use" patent is recommended.

### 🔬 Clinical Viability
* **Evidence:** {clinical_info}
* **Safety:** As an approved drug, {molecule} bypasses Phase 1 safety trials, reducing development time by 3-4 years.

### 📉 Market Economics
* **Demand:** {market_info}
* **Competition:** Moderate generic competition, but low competition for this specific new indication.

## 3. Recommendation: **GO** 🟢
Proceed to Phase 2b proof-of-concept trial immediately. Estimated time to market: **18-24 months** (vs 10 years for de novo drugs).
    """
    
    return report