import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get("GEMINI_API_KEY")

if not key:
    print("ERROR: GEMINI_API_KEY is missing.")
    raise SystemExit(1)

models = [
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-flash-lite-latest",
    "gemini-3-flash-preview",
]

payload = {
    "contents": [{
        "parts": [{
            "text": "Hey waht is RAG in AI?"
        }]
    }]
}

for model in models:
    print(f"\nTesting model: {model}")

    url = (
        "https://generativelanguage.googleapis.com/"
        f"v1beta/models/{model}:generateContent"
    )

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": key
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            result = json.loads(response.read().decode("utf-8"))

        answer = result["candidates"][0]["content"]["parts"][0]["text"]

        print("\nSUCCESS! Gemini API is working.")
        print("Working model:", model)
        print("Response:", answer)
        break

    except urllib.error.HTTPError as e:
        print("HTTP ERROR:", e.code)
        try:
            error_data = json.loads(e.read().decode("utf-8"))
            print("Reason:", error_data.get("error", {}).get("message", "Unknown error"))
        except Exception:
            print("Could not read error details.")

    except Exception as e:
        print("ERROR:", type(e).__name__, str(e))

else:
    print("\nNo model succeeded.")
    print("Check the errors above and try again later if models are overloaded. OK")
