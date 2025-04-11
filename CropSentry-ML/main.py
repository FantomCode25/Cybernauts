from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf  # If using tflite_runtime, change accordingly
import io

app = FastAPI()

# Welcome route
@app.get("/")
def read_root():
    return {"message": "Welcome to CropSentry!"}

# Image processing endpoint
@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    # Read and preprocess the image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((160, 160))  # Resize to match model input requirements
    image = image.convert("RGB")  # Ensure RGB format
    image_array = np.array(image, dtype=np.float32)
    image_array = image_array / 255.0  # Normalize
    image_array = np.expand_dims(image_array, axis=0)

    # Set input tensor
    interpreter.set_tensor(input_details[0]['index'], image_array.astype(np.float32))

    # Run inference
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    predicted_class = class_names[np.argmax(output_data)]

    return {"prediction": predicted_class, "confidence": float(np.max(output_data))}

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path="model.tflite")  # Adjust path if needed
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Define class names based on your model training
class_names = [
    "Pepper_bell__Bacterial_spot",
    "Pepper_bell__healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato_Tomato_YellowLeaf_Curl_Virus",
    "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy"
]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        image = image.resize((160, 160))
        img_array = np.array(image, dtype=np.float32)
        img_array = img_array / 255.0  # Normalize!
        img_array = np.expand_dims(img_array, axis=0)

        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])

        predicted_index = int(np.argmax(output_data))
        predicted_class = class_names[predicted_index]
        confidence = float(np.max(output_data))

        return {
            "prediction": predicted_class,
            "confidence": confidence,
            "raw_output": output_data.tolist()
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})