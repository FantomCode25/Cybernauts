import React, { useState, useEffect } from 'react';
import { Linking, View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// OpenAI API configuration
const OPENAI_API_KEY = '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'; // Replace with your actual API key
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Mock data for resources (all categories preserved)
const resourceCategories = [
  {
    id: 'soil',
    title: 'Soil Health',
    icon: '🌱',
    description: 'Learn about soil nutrients, pH levels, and maintenance',
    resources: [
      { id: 's1', type: 'article', title: 'Understanding Soil pH and Plant Growth', source: 'cropnutrition.com', link: "https://www.cropnutrition.com/nutrient-management/soil-ph/" },
      { id: 's2', type: 'video', title: 'Soil Test For Agriculture at Home', duration: '13:39', source: 'Discover Agriculture', link: "https://www.youtube.com/watch?v=hZVhswYdVeY" },
      { id: 's3', type: 'article', title: 'Benefits of Soil Organic Matter', source: 'cropnutrition.com', link: "https://www.cropnutrition.com/resource-library/five-benefits-of-soil-organic-matter/" },
      { id: 's4', type: 'video', title: 'Composting Techniques for Farmers', duration: '3:30', source: 'Organic Mandya', link: "https://www.youtube.com/watch?v=JT0if45XyB0" },
    ]
  },
  {
    id: 'water',
    title: 'Water Management',
    icon: '💧',
    description: 'Efficient irrigation techniques and water conservation',
    resources: [
      { id: 'w1', type: 'video', title: 'Basic Drip Irrigation Setup', duration: '12:42', source: 'The Kenyan Farmer', link: "https://www.youtube.com/watch?v=DEOqCzg1ELI" },
      { id: 'w2', type: 'article', title: 'Detecting Water Stress in Crops', source: 'Tamil Nadu Agricultural University', link: "https://agritech.tnau.ac.in/agriculture/agri_drought_effect_on_crops.html" },
      { id: 'w3', type: 'article', title: 'Rainwater Harvesting for Small Farms', source: 'SSWM Farming', link: "https://sswm.info/sites/default/files/reference_attachments/IBRAIMO%20%26%20MUNGUAMBE%202007%20Rainwater%20Harvesting%20Technologies%20for%20Small%20Scale%20Rainfed%20Agriculture%20in%20Arid%20and%20Semi-arid%20Areas.pdf" },
    ]
  },
  {
    id: 'pest',
    title: 'Pest Management',
    icon: '🐛',
    description: 'Identify and control common pests and diseases',
    resources: [
      { id: 'p1', type: 'article', title: 'IPM: Integrated Pest Management Basics', source: 'epa', link: "https://www.epa.gov/safepestcontrol/integrated-pest-management-ipm-principles" },
      { id: 'p4', type: 'video', title: 'Making Natural Pesticides', duration: '15:29', source: 'Kijani Farmstead', link: "https://www.youtube.com/watch?v=ylPcHRSB8W0" },
    ]
  },
  {
    id: 'practices',
    title: 'Healthy Practices',
    icon: '✅',
    description: 'Best practices for sustainable and productive farming',
    resources: [
      { id: 'hp1', type: 'video', title: 'Crop Rotation: Made Simple', duration: '22:45', source: 'UpBeet Farmer', link: "https://www.youtube.com/watch?v=Q5bQXYN6tgY" },
      { id: 'hp3', type: 'video', title: 'Mulching Methods', duration: '26:59', source: 'No-Till Growers', link: "https://www.youtube.com/watch?v=SoF7Z6sWiEY" },
      { id: 'hp4', type: 'article', title: 'Intercropping: Maximize Your Space', source: 'Kay Bee Bio', link: "https://kaybeebio.com/blog/intercropping-in-indian-farming-benefits-and-examples/" },
    ]
  },
  {
    id: 'seasonal',
    title: 'Seasonal Tips',
    icon: '🗓️',
    description: 'Season-specific advice for your region and crops',
    resources: [
      { id: 'st1', type: 'article', title: 'Monsoon Crop Harvesting', source: 'JCBL Agri Solutions', link: "https://jcblagri.in/blogs/monsoon-crop-harvesting-and-post-harvest-conservation" },
      { id: 'st2', type: 'article', title: 'Winter Protection for Sensitive Crops', source: 'Krishi Jagran', link: "https://krishijagran.com/crop-care/experts-guide-on-how-to-protect-crops-during-winter/#:~:text=Mulching%3A%20Apply%20a%20layer%20of,your%20crops%20from%20freezing%20temperatures." },
      { id: 'st3', type: 'article', title: 'Summer Vegetables: What to Plant Now', source: 'Krishi Jagran', link: "https://krishijagran.com/agripedia/best-vegetables-to-grow-in-summer-season/" },
    ]
  }
];

// Language options
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' }
];

// Web scraper function to get content from URLs
const fetchPageContent = async (url) => {
  try {
    // For YouTube URLs, extract video ID and use a different approach
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Return video title and description for YouTube content
      return `This is a video resource. Please click 'View Resource' to watch the video and learn about the topic.`;
    }

    const response = await fetch(url);
    const html = await response.text();
    
    // Extract text content from HTML
    // Remove scripts and style tags first
    const cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    // Remove HTML tags and clean up text
    const textContent = cleanHtml
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
    
    // Return a reasonable amount of text (first 2000 characters)
    return textContent.substring(0, 2000);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return 'Unable to fetch content. Please click "View Resource" to access the original article.';
  }
};

export default function LiteracyScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [summary, setSummary] = useState('');
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi'); // Default to Hindi
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [cachedSummaries, setCachedSummaries] = useState({});

  const selectedCategoryData = resourceCategories.find(cat => cat.id === selectedCategory);

  // Load cached summaries from AsyncStorage
  useEffect(() => {
    const loadCachedSummaries = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('cachedSummaries');
        if (cachedData) {
          setCachedSummaries(JSON.parse(cachedData));
        }
      } catch (error) {
        console.error('Error loading cached summaries:', error);
      }
    };
    
    loadCachedSummaries();
  }, []);

  // Save summaries to cache whenever it updates
  useEffect(() => {
    if (Object.keys(cachedSummaries).length > 0) {
      const saveCachedSummaries = async () => {
        try {
          await AsyncStorage.setItem('cachedSummaries', JSON.stringify(cachedSummaries));
        } catch (error) {
          console.error('Error saving cached summaries:', error);
        }
      };
      saveCachedSummaries();
    }
  }, [cachedSummaries]);

  // Fetch and analyze content using OpenAI API
  const fetchContentSummary = async (resourceTitle, resourceLink, resourceType) => {
    // Check if we have a cached summary
    const cacheKey = `${resourceLink}_en`;
    if (cachedSummaries[cacheKey]) {
      setSummary(cachedSummaries[cacheKey]);
      return cachedSummaries[cacheKey];
    }

    setIsLoading(true);
    try {
      // Get the content based on resource type
      const isVideo = resourceType === 'video';
      const contentForSummary = await fetchPageContent(resourceLink);

      // If content couldn't be fetched, provide a meaningful message
      if (!contentForSummary) {
        throw new Error('Could not fetch content');
      }

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an agricultural expert creating practical summaries for farmers. Focus on actionable advice, step-by-step techniques, and important precautions. Use simple language and clear explanations.'
            },
            {
              role: 'user',
              content: isVideo 
                ? `Summarize this agricultural video titled "${resourceTitle}" about ${selectedCategoryData?.title.toLowerCase()}. Based on the title and category, provide:
                   1. Expected main techniques and practices
                   2. Step-by-step implementation guide
                   3. Common mistakes to avoid
                   4. Expected benefits for farmers
                   Make it practical and easy to understand.`
                : `Summarize this agricultural article titled "${resourceTitle}". Content: ${contentForSummary}
                   Please provide:
                   1. Key techniques and methods
                   2. Step-by-step implementation
                   3. Important precautions
                   4. Expected benefits
                   Use simple language for farmers.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const newSummary = data.choices[0].message.content.trim();
      
      // Update cache with the new summary
      setCachedSummaries(prev => ({
        ...prev,
        [cacheKey]: newSummary
      }));
      
      setSummary(newSummary);
      return newSummary;
    } catch (error) {
      console.error('Error generating summary:', error);
      const errorMessage = isVideo 
        ? 'Could not generate video summary. Please watch the video directly for information.'
        : 'Could not generate article summary. Please view the original article for information.';
      setSummary(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  // Translate summary using OpenAI API
  const translateSummary = async (textToTranslate, targetLanguage) => {
    if (!textToTranslate) return;
    
    // Check if we have a cached translation
    const cacheKey = `${selectedResource?.link}_${targetLanguage}`;
    if (cachedSummaries[cacheKey]) {
      setTranslatedSummary(cachedSummaries[cacheKey]);
      return;
    }

    // If the target language is English, just return the original text
    if (targetLanguage === 'en') {
      setTranslatedSummary('');
      return;
    }
    
    setIsLoading(true);
    try {
      const languageName = languages.find(l => l.code === targetLanguage)?.name.split(' ')[0] || 'Hindi';
      
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert agricultural translator. Translate content into ${languageName} using simple, clear language that farmers can easily understand. Maintain agricultural terminology accuracy while keeping the language accessible.`
            },
            {
              role: 'user',
              content: `Translate this agricultural text into ${languageName}. Keep technical terms accurate but use simple language:\n\n${textToTranslate}`
            }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        throw new Error(`Translation API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const translation = data.choices[0].message.content.trim();
      
      // Update cache
      setCachedSummaries(prev => ({
        ...prev,
        [cacheKey]: translation
      }));
      
      setTranslatedSummary(translation);
    } catch (error) {
      console.error('Error translating summary:', error);
      setTranslatedSummary('Unable to translate at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedResource) {
      const getSummaryAndTranslate = async () => {
        const englishSummary = await fetchContentSummary(
          selectedResource.title, 
          selectedResource.link,
          selectedResource.type
        );
        if (selectedLanguage !== 'en') {
          translateSummary(englishSummary, selectedLanguage);
        } else {
          setTranslatedSummary('');  // Clear translated summary if language is English
        }
      };
      
      getSummaryAndTranslate();
    }
  }, [selectedResource]);

  // Update translation when language changes
  useEffect(() => {
    if (summary && selectedLanguage !== 'en') {
      translateSummary(summary, selectedLanguage);
    } else if (selectedLanguage === 'en') {
      setTranslatedSummary('');  // Clear translated summary if language is English
    }
  }, [selectedLanguage]);

  // Modified ResourceCard component to separate clicking on card (opens link) from AI button (shows summary)
  const ResourceCard = ({ item }) => (
    <View
      style={[
        styles.resourceCard,
        selectedResource?.id === item.id && styles.selectedResourceCard
      ]}
    >
      <TouchableOpacity
        style={styles.resourceMainArea}
        onPress={() => Linking.openURL(item.link)}
      >
        <View style={styles.resourceIconContainer}>
          <Text style={styles.resourceIcon}>{item.type === 'article' ? '📄' : '🎬'}</Text>
        </View>
        <View style={styles.resourceContent}>
          <Text style={styles.resourceTitle}>{item.title}</Text>
          <View style={styles.resourceMeta}>
            <Text style={styles.resourceSource}>{item.source}</Text>
            {item.duration && <Text style={styles.resourceDuration}>{item.duration}</Text>}
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => setSelectedResource(item)}
      >
        <Text style={styles.aiButtonText}>AI Summary</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf7" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plant Health Literacy</Text>
          
          <TouchableOpacity 
            style={styles.languageButton} 
            onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Text style={styles.languageButtonText}>
              {languages.find(l => l.code === selectedLanguage)?.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {showLanguageSelector && (
          <View style={styles.languageSelector}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  selectedLanguage === language.code && styles.selectedLanguageOption
                ]}
                onPress={() => {
                  setSelectedLanguage(language.code);
                  setShowLanguageSelector(false);
                }}
              >
                <Text>
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!selectedCategory ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.subtitle}>
              Learn best practices to keep your crops healthy and productive
            </Text>

            <Text style={styles.sectionTitle}>Knowledge Categories</Text>

            {resourceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryIconContainer}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryCount}>
                      {category.resources.length} {category.resources.length === 1 ? 'resource' : 'resources'}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>→</Text>
                </View>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Need more help?</Text>
              <Text style={styles.infoText}>
                Contact your local agricultural extension office for personalized advice 
                specific to your region and crops.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.categoryHeader}>
              <TouchableOpacity
                style={styles.backCategoryButton}
                onPress={() => {
                  setSelectedCategory(null);
                  setSelectedResource(null);
                  setSummary('');
                  setTranslatedSummary('');
                }}
              >
                <Text style={styles.backCategoryText}>← All Categories</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.selectedCategoryHeader}>
              <View style={styles.selectedCategoryIconContainer}>
                <Text style={styles.selectedCategoryIcon}>{selectedCategoryData?.icon}</Text>
              </View>
              <Text style={styles.selectedCategoryTitle}>{selectedCategoryData?.title}</Text>
              <Text style={styles.selectedCategoryDescription}>
                {selectedCategoryData?.description}
              </Text>
            </View>

            {/* Main change: Wrap everything in a ScrollView */}
            <ScrollView style={styles.resourcesContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.resourceListHeader}>
                <Text style={styles.resourcesTitle}>Available Resources</Text>
                {selectedResource && (
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => {
                      if (selectedResource?.link) {
                        Linking.openURL(selectedResource.link);
                      }
                    }}
                  >
                    <Text style={styles.viewButtonText}>View Resource</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Changed from FlatList to mapping through resources */}
              <View style={styles.resourcesList}>
                {selectedCategoryData?.resources.map(item => (
                  <ResourceCard key={item.id} item={item} />
                ))}
              </View>

              {selectedResource && (
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryTitle}>
                    {selectedLanguage === 'en' ? 'Summary:' : 'सारांश (Summary):'}
                  </Text>
                  
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#4CAF50" />
                      <Text style={styles.loadingText}>
                        {selectedLanguage === 'en' 
                          ? 'Fetching content and creating summary...' 
                          : 'सामग्री प्राप्त कर रहे हैं और सारांश बना रहे हैं...'}
                      </Text>
                    </View>
                  ) : (
                    <>
                      {selectedLanguage === 'en' ? (
                        <Text style={styles.summaryText}>{summary}</Text>
                      ) : (
                        <Text style={styles.summaryText}>{translatedSummary}</Text>
                      )}
                    </>
                  )}
                </View>
              )}
              
              {/* Add padding at the bottom to ensure content is scrollable */}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f8faf7' 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16, 
    justifyContent: 'space-between' 
  },
  backButton: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  backButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2e7d32', 
    flex: 1, 
    paddingLeft: 12 
  },
  languageButton: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    backgroundColor: '#e8f5e9', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  languageButtonText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#2e7d32' 
  },
  languageSelector: { 
    position: 'absolute', 
    top: 60, 
    right: 20, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 8, 
    zIndex: 10, 
    elevation: 5 
  },
  languageOption: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 6 
  },
  selectedLanguageOption: { 
    backgroundColor: '#e8f5e9' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    lineHeight: 22, 
    marginBottom: 24 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#333' 
  },
  categoryCard: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 14, 
    elevation: 2 
  },
  categoryHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  categoryIconContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#e8f5e9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  categoryIcon: { 
    fontSize: 20 
  },
  categoryInfo: { 
    flex: 1 
  },
  categoryTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
  categoryCount: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 2 
  },
  chevron: { 
    fontSize: 18, 
    color: '#aaa' 
  },
  categoryDescription: { 
    fontSize: 14, 
    color: '#666', 
    lineHeight: 20 
  },
  infoCard: { 
    backgroundColor: '#ecf4fc', 
    borderRadius: 12, 
    padding: 16, 
    marginTop: 10, 
    marginBottom: 30, 
    borderLeftWidth: 4, 
    borderLeftColor: '#4a90e2' 
  },
  infoTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2c5282', 
    marginBottom: 8 
  },
  infoText: { 
    fontSize: 14, 
    color: '#4a5568', 
    lineHeight: 20 
  },
  backCategoryButton: { 
    paddingVertical: 8, 
    marginBottom: 16 
  },
  backCategoryText: { 
    fontSize: 14, 
    color: '#4CAF50', 
    fontWeight: '500' 
  },
  selectedCategoryHeader: { 
    alignItems: 'center', 
    paddingVertical: 16, 
    marginBottom: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0' 
  },
  selectedCategoryIconContainer: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#e8f5e9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  selectedCategoryIcon: { 
    fontSize: 30 
  },
  selectedCategoryTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8 
  },
  selectedCategoryDescription: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center', 
    paddingHorizontal: 20, 
    lineHeight: 20 
  },
  resourcesContainer: { 
    flex: 1 
  },
  resourceListHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  resourcesTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  viewButton: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    backgroundColor: '#4CAF50', 
    borderRadius: 16 
  },
  viewButtonText: { 
    fontSize: 14, 
    color: '#fff', fontWeight: '500' },
  resourceCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resourceMainArea: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  selectedResourceCard: { backgroundColor: '#f0f7ff', borderWidth: 1, borderColor: '#4CAF50' },
  resourceIconContainer: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#f0f7ff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  resourceIcon: { fontSize: 20 },
  resourceContent: { flex: 1 },
  resourceTitle: { fontSize: 15, fontWeight: '500', color: '#333', marginBottom: 4 },
  resourceMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  resourceSource: { fontSize: 12, color: '#666' },
  resourceDuration: { fontSize: 12, color: '#4CAF50' },
  summaryContainer: { marginTop: 20, backgroundColor: '#fff', borderRadius: 12, padding: 16, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
  summaryText: { fontSize: 14, color: '#555', lineHeight: 20 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  loadingText: { marginLeft: 10, fontSize: 14, color: '#666' },
  aiButton: { backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginLeft: 8 },
  aiButtonText: { color: '#fff', fontWeight: '500', fontSize: 12 }
});