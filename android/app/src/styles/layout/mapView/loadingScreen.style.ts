import { StyleSheet } from 'react-native';
import { palette } from '../../palette';

export const loadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: palette.loadingCard,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 280,
    maxWidth: 320,
    minHeight: 260,
    width: 300,
  },
  loadingCircleWrapper: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.loadingCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.loadingDot,
  },
  text: {
    color: palette.loadingText,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtext: {
    color: palette.loadingText,
    fontSize: 16,
    textAlign: 'center',
  },
});
