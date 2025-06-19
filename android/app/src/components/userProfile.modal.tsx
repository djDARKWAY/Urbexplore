import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/layout/userProfile/userProfile.styles';

const userProfile = () => {
  return (
    <View style={styles.container}>
      {/* Header with Settings */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="question-answer" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://placehold.co/400x400/' }} 
            style={styles.profileImage} 
          />
        </View>
        <Text style={styles.username}>DARKWAY</Text>
        <Text style={styles.subtitle}>@dj.da.estg</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Achievements</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>POIs Discovered</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3km</Text>
          <Text style={styles.statLabel}>Total Distance</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Max Streak</Text>
        </View>
      </View>

      {/* Rankings */}
      <View style={styles.rankingsSection}>
        <Text style={styles.sectionTitle}>Best All-Time Rankings</Text>
        <View style={styles.rankingBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏆 Explorers</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🎯 Achievers</Text>
          </View>
        </View>
      </View>

      {/* World Progress */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>World Exploration</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill}></View>
        </View>
        <Text style={styles.progressText}>0.000027961% explored</Text>
      </View>
    </View>
  );
};

export default userProfile;