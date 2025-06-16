import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapViewFullScreen from './android/app/src/components/MapViewFullScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MapViewFullScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
