CropSentry is an intelligent, mobile-first application designed to help farmers and gardeners detect plant diseases and pests using machine learning. The app leverages high-resolution images of plants to identify potential issues, providing valuable insights to improve crop health and yields.

Features
1. Disease and Pest Detection
The app uses Machine Learning model (MobileNetV2) to classify and identify diseases and pests in plants by analyzing high-resolution images.

Real-time Image Processing: Users can upload pictures of their crops, and the app will process and identify the disease/pest with high accuracy.

Provides detailed information on the detected disease/pest, including possible causes and solutions.

2. Mobile-First Design
The app is optimized for mobile devices, ensuring a smooth user experience even in field conditions where access to computers may be limited.

Available on Expo Go, ensuring quick development and testing on mobile devices.

3. User Profiles
Users can create personal profiles, storing their uploaded images and disease/pest detection history.

Track progress over time by revisiting past diagnoses and checking previous reports.

4. Educational Resources
The app provides a Literacy section with helpful information on various plant diseases and pests, giving users access to resources for better plant care.

"Read More" functionality to access in-depth guides and advice on plant health.

5. Seamless User Interaction
Capture Screen: Users can take a photo of a plant directly within the app for immediate disease detection.

Prediction Results: After processing the image, the app provides prediction results, displaying the most likely disease or pest, along with its confidence score.

6. User-Friendly Interface
The app features an intuitive design with bottom navigation for easy access to key features like Home, Capture, Profile, and Literacy.

7. Machine Learning Model
Built using TensorFlow Lite to deploy the model on mobile devices for efficient and fast inference.

The model is trained on a variety of crop diseases and pests, allowing it to recognize a wide range of plant issues.

Technologies Used
Frontend: React Native with Expo

Backend: FastAPI (for model inference and API endpoints)

Machine Learning: TensorFlow Lite (for model inference on mobile)
