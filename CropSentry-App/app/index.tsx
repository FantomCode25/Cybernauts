import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  StatusBar, 
  ScrollView 
} from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf7" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>CropSentry</Text>
        </View>
        
        {/* Welcome Section */}
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subHeaderText}>
          Your smart companion for plant disease detection
        </Text>

        {/* Feature Card */}
        <View style={styles.cardContainer}>
          <View style={styles.featureCard}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🌿</Text>
              </View>
              <Text style={styles.cardTitle}>Healthy Plants,</Text>
              <Text style={styles.cardSubtitle}>Healthy Life</Text>
              <Text style={styles.cardDescription}>
                Detect diseases early and protect your crops efficiently
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.buttonSection}>
          <Link href="/capture" asChild>
            <Pressable style={styles.primaryButton}>
              <View style={styles.buttonContent}>
                <View style={styles.buttonIconContainer}>
                  <Text style={styles.buttonIcon}>📷</Text>
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonText}>Capture Plant Image</Text>
                  <Text style={styles.buttonSubtext}>Identify diseases instantly</Text>
                </View>
              </View>
            </Pressable>
          </Link>

          <Link href="/literacy" asChild>
            <Pressable style={styles.secondaryButton}>
              <View style={styles.buttonContent}>
                <View style={styles.buttonIconContainer}>
                  <Text style={styles.buttonIcon}>📚</Text>
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonText}>Plant Health Literacy</Text>
                  <Text style={styles.buttonSubtext}>Learn prevention techniques</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>

        {/* Daily Tip Card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💧</Text>
          <Text style={styles.tipTitle}>Daily Tip</Text>
          <Text style={styles.tipText}>
            Water your plants early in the morning for best results and to prevent fungal diseases!
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>50</Text>
              <Text style={styles.statLabel}>Plants Analyzed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>30</Text>
              <Text style={styles.statLabel}>Reports Generated</Text>
            </View>
          </View>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>CropSentry v1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e0f2e9',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  secondaryButton: {
    backgroundColor: '#8bc34a',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  buttonIcon: {
    fontSize: 18,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  tipCard: {
    marginHorizontal: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#66bb6a',
  },
  tipIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});