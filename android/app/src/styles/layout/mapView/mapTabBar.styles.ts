import { StyleSheet } from 'react-native';

export const mapTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#151c21',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabIconWrapper: {
    borderRadius: 16,
    padding: 6,
    marginBottom: 2,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
  tabIconActive: {
    backgroundColor: '#0d4d46',
  },
  tabIconInactive: {
    backgroundColor: 'transparent',
  },
});
