import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/detailsModal.styles";

interface LocationDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  location: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    difficulty?: string;
    popularity?: number;
    type?: string;
    condition?: string;
    yearAbandoned?: number;
    warnings?: string[];
  };
}

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  visible,
  onClose,
  location,
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

          <ScrollView style={styles.infoContainer} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{location.name}</Text>
            </View>
            <Text style={styles.description}>{location.description}</Text>
            
            {location.type && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoValue}>{location.type}</Text>
              </View>
            )}
            
            {location.condition && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Condição:</Text>
                <Text style={styles.infoValue}>{location.condition}</Text>
              </View>
            )}
            
            {location.yearAbandoned !== undefined && location.yearAbandoned !== null && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Abandonado em:</Text>
                <Text style={styles.infoValue}>{String(location.yearAbandoned)}</Text>
              </View>
            )}
            
            {location.warnings && location.warnings.length > 0 && (
              <View style={styles.warningsContainer}>
                <Text style={styles.warningsTitle}>Avisos:</Text>
                {location.warnings.map((warning, index) => (
                  <View key={index} style={styles.warningItem}>
                    <Ionicons name="warning" size={16} color="#FFA500" />
                    <Text style={styles.warningText}>{warning}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.fixedActionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="navigate" size={24} color="#fff" />
              <Text style={styles.actionText}>Navegar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark" size={24} color="#fff" />
              <Text style={styles.actionText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social" size={24} color="#fff" />
              <Text style={styles.actionText}>Compartilhar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationDetailsModal;
