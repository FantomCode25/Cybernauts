import { useState } from "react";
import { useRouter } from "expo-router";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  StyleSheet,
  SafeAreaView,
  StatusBar 
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CaptureScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      detectDisease(uri); // Auto-trigger detection
    }
  };

  const detectDisease = async (uri: string) => {
    setLoading(true);
    setResult(null);

    try {
      // Create form data
      const formData = new FormData();
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append('file', blob, 'image.jpg');

      // Send to backend
      const prediction = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await prediction.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data.prediction);
      
      // Navigate to Report page with results
      router.push({
        pathname: "/report",
        params: {
          result: data.prediction,
          confidence: data.confidence,
          imageUri: uri
        }
      });

    } catch (error) {
      console.error('Error detecting disease:', error);
      setResult('Error detecting disease');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf7" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Capture Plant Image</Text>
          <Text style={styles.subtitle}>Take a clear photo of the affected leaf or plant part</Text>
        </View>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>📷</Text>
              <Text style={styles.placeholderCaption}>No image selected</Text>
            </View>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Analyzing plant...</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.cameraButton}
            activeOpacity={0.8} 
            onPress={pickImage}
          >
            <Text style={styles.cameraButtonText}>📷 Open Camera</Text>
          </TouchableOpacity>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Detected:</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>📸 Capture Tips:</Text>
          <Text style={styles.tipsText}>• Make sure the affected area is in focus</Text>
          <Text style={styles.tipsText}>• Use natural lighting when possible</Text>
          <Text style={styles.tipsText}>• Include both healthy and affected areas for comparison</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8faf7",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.7,
  },
  placeholderCaption: {
    fontSize: 16,
    color: "#777",
  },
  cameraButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  resultContainer: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
    marginRight: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tipsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  tipsText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    lineHeight: 20,
  },
});