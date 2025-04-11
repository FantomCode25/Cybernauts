import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to CropSentry!</Text>
      <Text style={styles.subHeader}>Your plant disease detection companion.</Text>

      <View style={styles.buttonContainer}>
        <Link href="/capture" asChild>
          <Button title="Capture Plant Image" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/report" asChild>
          <Button title="View Report" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/literacy" asChild>
          <Button title="Plant Health Literacy" />
        </Link>
      </View>

      <Text style={styles.tipText}>Plant Tip: Water your plants early in the morning for best results!</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Plants Analyzed: 50</Text>
        <Text style={styles.statsText}>Reports Generated: 30</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold' },
  subHeader: { fontSize: 18, marginVertical: 10 },
  buttonContainer: { marginVertical: 10, width: '80%' },
  tipText: { fontSize: 16, marginTop: 20, fontStyle: 'italic', textAlign: 'center' },
  statsContainer: { marginTop: 30 },
  statsText: { fontSize: 16 },
});
