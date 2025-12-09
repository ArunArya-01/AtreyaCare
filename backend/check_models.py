import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GOOGLE_API_KEY")
if not key:
    print("❌ Error: No API Key found in .env")
else:
    genai.configure(api_key=key)
    print("🔍 Checking available models for your key...")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"✅ FOUND: {m.name}")
    except Exception as e:
        print(f"❌ Error listing models: {e}")