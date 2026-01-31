from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from google import genai
import PIL.Image
import io
import os
import json  
from fastapi.middleware.cors import CORSMiddleware

# 1. Load Environment
load_dotenv("APIkey.env", override="true")

app = FastAPI()

# 2. CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://healthdecoded.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize the Modern Client
api_key = os.getenv("GEMINI_API_KEY")
print(f"🔑 Loaded API Key: {api_key[:10]}... (Length: {len(api_key) if api_key else 0})")
client = genai.Client(api_key=api_key)

@app.post("/analyze")
def analyze_document(
    file: UploadFile = File(...),
    mode: str = "report",
    lang: str = "English"
):
    try:
        print(f"📥 Received request: mode={mode}, lang={lang}")
        
        # Read file synchronously (FastAPI runs this in a threadpool)
        content = file.file.read()
        print(f"✅ File read: {len(content)} bytes")
        
        img = PIL.Image.open(io.BytesIO(content))
        print("🖼️ Image processed")
        
        # 4. Define Prompts with Language Support
        language_instruction = f"STRICT RULE: All explanations and summaries must be written in {lang}."

        if mode == "report":
            prompt = (
                f"Role: Specialized Medical Data Interpreter & ELI5 Explainer.\n"
                f"Task: Analyze the medical report image. Extract data and simplify it for a non-medical user.\n"
                f"Strict Output: VALID JSON ONLY. No markdown, no conversation.\n"
                f"{language_instruction}\n"
                f"JSON Schema:\n"
                "{"
                '  "summary": "string (Exactly 2 sentences: What this report is and the overall result)",'
                '  "findings": ['
                '    {'
                '      "parameter": "string (Test Name)",'
                '      "value": "string (Value + Unit)",'
                '      "status": "string (Enum: \'Normal\', \'High\', \'Low\')",'
                '      "explanation": "string (Simple, calming explanation of what this parameter means)"'
                '    }'
                '  ],'
                '  "safety_note": "string (Standard medical disclaimer)",'
                '  "sensitivity_flag": boolean (true if critical/bad news),'
                '  "gentle_reminder": "string (A specific, calm health tip or symptom check based on findings)",'
                '  "questions_for_doctor": ["string (Question 1)", "string (Question 2)", "string (Question 3)"]'
                "}"
            )
        else:
            prompt = (
                f"ACT AS: Professional Medical Billing Auditor. "
                f"TASK: Audit bill for errors and suggest generic alternatives. Make it simple. Generate accurate Bill Trust Score. "
                f"STRICT RULE: Output ONLY valid JSON. No markdown tags, no conversational text. "
                f"{language_instruction}\n"
                f"JSON STRUCTURE: {{"
                f"\"bill_trust_score\": number, "
                f"\"audit_findings\": [{{\"item\": \"name\", \"cost\": number, \"issue_detected\": \"string\", \"suggested_action\": \"string\"}}], "
                f"\"savings_opportunity\": {{\"detected\": boolean, \"generic_alternatives\": [{{\"branded\": \"string\", \"generic\": \"string\", \"estimated_savings\": \"string\"}}]}},"
                f"\"safety_note\": \"string (Financial disclaimer: This is an automated audit, verify with hospital)\", "
                f"\"gentle_reminder\": \"string (A helpful tip about paying bills on time or asking for itemized receipts)\", "
                f"\"questions_for_bill_department\": [\"string (Q1)\", \"string (Q2)\", \"string (Q3)\"]"
                f"}}"
            )

        # 5. Generate Content using the Client
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt, img]
        )
        
        try:
            # Clean the response text (remove ```json ... ``` if the AI adds it)
            raw_text = response.text.strip()
            
            # Robust cleaning: find the first { and last }
            first_brace = raw_text.find("{")
            last_brace = raw_text.rfind("}")
            
            if first_brace != -1 and last_brace != -1:
                raw_text = raw_text[first_brace:last_brace+1]
            elif raw_text.startswith("```json"):
                raw_text = raw_text.replace("```json", "").replace("```", "").strip()
            
            structured_data = json.loads(raw_text)
            return {"analysis": structured_data}
            
        except json.JSONDecodeError as je:
            print(f"JSON Error: {je}")
            return {"analysis": response.text, "error": "AI response was not valid JSON"}

    except Exception as e:
        print("🔥 ERROR:", e)
        return {"error": str(e)}
    
@app.get("/health")
async def health_check():
    return {"status": "online", "team": "Syntax Killers"}