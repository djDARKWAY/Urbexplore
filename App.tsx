import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapViewFullScreen from './android/app/src/components/mapView.modal';
import { ThemeProvider } from './android/app/src/contexts/ThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <MapViewFullScreen />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
