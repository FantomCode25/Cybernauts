import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// OpenAI API configuration 
const OPENAI_API_KEY = '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'; // ⚠️ Store this securely in production
const API_URL = 'https://api.openai.com/v1/chat/completions';

export default function ReportScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [diseaseInfo, setDiseaseInfo] = useState({
    name: '',
    about: '',
    causes: [] as string[],
    treatments: [] as string[],
    prevention: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Extract params from router
  const result = params.result as string || 'Unknown Issue';
  const imageUri = params.imageUri as string;
  const confidence = params.confidence as string || '0.00';
  const confidenceValue = parseFloat(confidence);
  
  // Format confidence level
  const getConfidenceLevel = () => {
    if (confidenceValue > 0.9) return 'Very High';
    if (confidenceValue > 0.7) return 'High';
    if (confidenceValue > 0.5) return 'Medium';
    return 'Low';
  };
  
  // Format confidence percentage
  const confidencePercentage = `${(confidenceValue * 100).toFixed(1)}%`;
  
  const fetchDiseaseInfo = async (diseaseName) => {
    try {
      setLoading(true);
      
      const prompt = `Please provide information about the plant disease or condition "${diseaseName}" in JSON format. Include the following fields:
      1. about: A brief paragraph explaining what this disease/condition is
      2. causes: An array of strings listing the possible causes (limit to 3-5 major causes)
      3. treatments: An array of strings with recommended treatments (limit to 3-5 key treatments)
      4. prevention: An array of strings with prevention tips (limit to 3-5 key prevention methods)
      
      If this is identified as a healthy plant, adjust the information accordingly.
      Return ONLY valid JSON without any explanations or markdown.`;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      const parsedInfo = JSON.parse(content);
      
      setDiseaseInfo({
        name: diseaseName,
        about: parsedInfo.about || '',
        causes: parsedInfo.causes || [],
        treatments: parsedInfo.treatments || [],
        prevention: parsedInfo.prevention || []
      });
      
      setError('');
    } catch (err) {
      console.error('Error fetching disease information:', err);
      setError('Failed to load disease information. Please try again.');
      
      // Set fallback information
      setDiseaseInfo({
        name: diseaseName,
        about: `Information about ${diseaseName} is currently unavailable.`,
        causes: [],
        treatments: [],
        prevention: ['Consult with a local agricultural extension for specific guidance.']
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDiseaseInfo(result);
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
                <Text style={styles.confidenceText}>
                  Confidence: {getConfidenceLevel()} ({confidencePercentage})
                </Text>
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

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Loading disease information...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <>
              <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>About {diseaseInfo.name}</Text>
                <Text style={styles.infoText}>{diseaseInfo.about}</Text>
              </View>

              {diseaseInfo.causes.length > 0 && (
                <View style={styles.infoCard}>
                  <Text style={styles.sectionTitle}>Possible Causes</Text>
                  {diseaseInfo.causes.map((cause, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.listText}>{cause}</Text>
                    </View>
                  ))}
                </View>
              )}

              {diseaseInfo.treatments.length > 0 && (
                <View style={styles.infoCard}>
                  <Text style={styles.sectionTitle}>Recommended Treatment</Text>
                  {diseaseInfo.treatments.map((treatment, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.listText}>{treatment}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Prevention Tips</Text>
                {diseaseInfo.prevention.map((tip, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

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
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffebee',
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  }
});