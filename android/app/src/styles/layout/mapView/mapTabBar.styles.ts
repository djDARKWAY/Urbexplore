import { StyleSheet } from 'react-native';

export const mapTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#151c21',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
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
    color: '#fff',
  },
  tabIconActive: {
    backgroundColor: '#0d4d46',
    color: '#fff',
  },
  tabIconInactive: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
});
