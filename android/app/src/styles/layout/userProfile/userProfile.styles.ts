import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  helpButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#333',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabText: {
    color: '#AAA',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#AAA',
  },
  rankingsSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  rankingBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
  },
  badgeText: {
    color: '#FFF',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  progressText: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 5,
  },
  unlockButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  unlockText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default styles;
