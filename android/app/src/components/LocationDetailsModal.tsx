import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  location: {
    name: string;
    description: string;
    imageUrl: string;
    difficulty?: string;
    popularity?: number;
    visited?: boolean;
  };
}

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({ 
  visible, 
  onClose, 
  location 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: location.imageUrl }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{location.name}</Text>
              
              <View style={styles.badgesContainer}>
                {location.difficulty && (
                  <View style={[styles.badge, 
                    location.difficulty === 'Easy' ? styles.easyBadge : 
                    location.difficulty === 'Medium' ? styles.mediumBadge : 
                    styles.hardBadge]}>
                    <Text style={styles.badgeText}>{location.difficulty}</Text>
                  </View>
                )}
                
                {location.visited && (
                  <View style={styles.visitedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#fff" />
                    <Text style={styles.badgeText}>Visitado</Text>
                  </View>
                )}
              </View>
            </View>
            
            <Text style={styles.description}>{location.description}</Text>
            
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="navigate" size={24} color="#fff" />
                <Text style={styles.actionText}>Navegar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark" size={24} color="#fff" />
                <Text style={styles.actionText}>Salvar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social" size={24} color="#fff" />
                <Text style={styles.actionText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    height: '80%',
    backgroundColor: '#0F1923',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
    marginBottom: 5,
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  mediumBadge: {
    backgroundColor: '#FF9800',
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  visitedBadge: {
    backgroundColor: '#2196F3',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#e0e0e0',
    marginBottom: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2E3A46',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
  },
});

export default LocationDetailsModal;
