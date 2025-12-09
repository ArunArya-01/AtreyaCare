from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import sys
from agents import run_repurposing_crew

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/analyze")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    data = await websocket.receive_json()
    molecule = data.get("molecule")
    disease = data.get("disease")
    
    await websocket.send_json({"type": "log", "message": f"🚀 Initializing Connection for {molecule}..."})

    # Get the main event loop so we can talk to it from the worker thread
    loop = asyncio.get_running_loop()

    # --- THE FIX: THREAD-SAFE LOGGING ---
    class ThreadSafeStream:
        def write(self, message):
            if message.strip():
                # Force the message onto the Main Loop safely
                loop.call_soon_threadsafe(
                    asyncio.create_task,
                    websocket.send_json({"type": "log", "message": message.strip()})
                )
        def flush(self): pass

    # Redirect stdout to our new thread-safe streamer
    original_stdout = sys.stdout
    sys.stdout = ThreadSafeStream()

    try:
        # Run the heavy AI blocking task in a separate thread
        result = await asyncio.to_thread(run_repurposing_crew, molecule, disease)
        
        # Send final result
        await websocket.send_json({"type": "result", "data": str(result)})
    except Exception as e:
        await websocket.send_json({"type": "error", "message": f"Server Error: {str(e)}"})
    finally:
        sys.stdout = original_stdout  # Clean up