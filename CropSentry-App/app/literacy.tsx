import React, { useState } from 'react';
import { Linking, View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for resources
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

export default function LiteracyScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedCategoryData = resourceCategories.find(cat => cat.id === selectedCategory);

  const ResourceCard = ({ type, title, source, duration = null, link }) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => {
        if (link) {
          Linking.openURL(link);
        } else {
          alert('Link not available for this resource.');
        }
      }}
    >
      <View style={styles.resourceIconContainer}>
        <Text style={styles.resourceIcon}>{type === 'article' ? '📄' : '🎬'}</Text>
      </View>
      <View style={styles.resourceContent}>
        <Text style={styles.resourceTitle}>{title}</Text>
        <View style={styles.resourceMeta}>
          <Text style={styles.resourceSource}>{source}</Text>
          {duration && <Text style={styles.resourceDuration}>{duration}</Text>}
        </View>
      </View>
    </TouchableOpacity>
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
        </View>

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
                onPress={() => setSelectedCategory(null)}
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

            <View style={styles.resourcesContainer}>
              <Text style={styles.resourcesTitle}>Available Resources</Text>

              <FlatList
                data={selectedCategoryData?.resources}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ResourceCard
                    type={item.type}
                    title={item.title}
                    source={item.source}
                    duration={item.duration}
                    link={item.link}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8faf7',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#aaa',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#ecf4fc',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c5282',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  backCategoryButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  backCategoryText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  selectedCategoryHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedCategoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedCategoryIcon: {
    fontSize: 30,
  },
  selectedCategoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  selectedCategoryDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  resourcesContainer: {
    flex: 1,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceIcon: {
    fontSize: 20,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  resourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceSource: {
    fontSize: 12,
    color: '#666',
  },
  resourceDuration: {
    fontSize: 12,
    color: '#4CAF50',
  },
});
