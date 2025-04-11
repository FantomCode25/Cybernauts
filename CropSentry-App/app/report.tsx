import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ReportScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [diseaseInfo, setDiseaseInfo] = useState({
    name: '',
    causes: [],
    treatments: [],
    prevention: []
  });
  
  // Extract params from router
  const result = params.result as string || 'Unknown Issue';
  const imageUri = params.imageUri as string;
  
  useEffect(() => {
    // Simulate fetching disease information based on result
    // In a real app, this could be an API call or database lookup
    if (result === 'Leaf Blight') {
      setDiseaseInfo({
        name: 'Leaf Blight',
        causes: [
          'Fungal infection (Alternaria)',
          'Warm, humid conditions',
          'Poor air circulation'
        ],
        treatments: [
          'Remove infected leaves',
          'Apply fungicide as directed',
          'Improve plant spacing'
        ],
        prevention: [
          'Rotate crops annually',
          'Water at base instead of leaves',
          'Use resistant varieties when available'
        ]
      });
    }
  }, [result]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Plant Health Report</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultHeaderText}>Diagnosis Result</Text>
            </View>
            <View style={styles.resultContent}>
              <View style={styles.resultIconContainer}>
                <Text style={styles.resultIcon}>🔍</Text>
              </View>
              <View style={styles.resultTextContainer}>
                <Text style={styles.diagnosisLabel}>Detected Issue:</Text>
                <Text style={styles.diagnosisValue}>{result}</Text>
                <Text style={styles.confidenceText}>Confidence: High</Text>
              </View>
            </View>
          </View>

          {imageUri && (
            <View style={styles.imageCard}>
              <Text style={styles.sectionTitle}>Analyzed Image</Text>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: imageUri }} 
                  style={styles.image} 
                  resizeMode="contain"
                />
              </View>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>About {diseaseInfo.name}</Text>
            <Text style={styles.infoText}>
              {diseaseInfo.name} is a common plant disease that affects various crops and can cause 
              significant damage if left untreated. Early detection and treatment are essential.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Possible Causes</Text>
            {diseaseInfo.causes.map((cause, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listText}>{cause}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Recommended Treatment</Text>
            {diseaseInfo.treatments.map((treatment, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listText}>{treatment}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Prevention Tips</Text>
            {diseaseInfo.prevention.map((tip, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listText}>{tip}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Capture</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8faf7',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resultHeader: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  resultHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resultIcon: {
    fontSize: 24,
  },
  resultTextContainer: {
    flex: 1,
  },
  diagnosisLabel: {
    fontSize: 14,
    color: '#666',
  },
  diagnosisValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    width: 15,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
