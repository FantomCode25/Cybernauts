import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to CropSentry!</Text>

      <Text style={styles.subHeader}>Your plant disease detection companion.</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Capture Plant Image"
          onPress={() => console.log('Navigate to Capture screen')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Report"
          onPress={() => console.log('Navigate to Report screen')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Plant Health Literacy"
          onPress={() => console.log('Navigate to Literacy screen')}
        />
      </View>

      {/* Additional Content Section */}
      <Text style={styles.tipText}>Plant Tip: Water your plants early in the morning for best results!</Text>

      {/* Example of a user stats section */}
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
  buttonContainer: { marginVertical: 10 },
  tipText: { fontSize: 16, marginTop: 20, fontStyle: 'italic' },
  statsContainer: { marginTop: 30 },
  statsText: { fontSize: 16 },
});
