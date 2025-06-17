import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapViewFullScreen from './android/app/src/components/MapViewFullScreen';
import { ThemeProvider } from './android/app/src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <MapViewFullScreen />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
