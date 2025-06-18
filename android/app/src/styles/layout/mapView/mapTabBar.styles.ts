import { StyleSheet } from 'react-native';

export const mapTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#23181b',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#2d181a',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabIconWrapper: {
    borderRadius: 16,
    padding: 8,
  },
  tabIcon: {
    color: '#FFFFFF',
  },
  tabIconActive: {
    backgroundColor: '#333',
    color: '#FFFFFF',
  },
  tabIconInactive: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
});
