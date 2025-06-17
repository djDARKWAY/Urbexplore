import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Animated, Easing, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/darkTheme/detailsModal.styles";
import { palette } from "../styles/darkTheme/palette";

interface LocationDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  location: {
    id: string;
    title: string;
    description?: string;
    images?: string[];
    category: string;
    condition?: string;
    yearAbandoned?: number;
    warnings?: string[];
    accessLevel?: string;
    rating?: number;
    createdBy?: string;
    updatedAt?: string;
    lat?: number;
    lon?: number;
  };
}

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  visible,
  onClose,
  location,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  // PanResponder para arrastar o modal
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Só responde a gestos verticais para baixo
        return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        dragY.setOffset(lastOffset.current);
        dragY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        dragY.flattenOffset();
        lastOffset.current = 0;
        // Se arrastou mais de 120px ou soltou com velocidade > 1.5, fecha
        if (gestureState.dy > 120 || gestureState.vy > 1.5) {
          Animated.timing(slideAnim, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            dragY.setValue(0);
            onClose();
          });
        } else {
          // Volta para posição original
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      dragY.setValue(0);
    } else {
      slideAnim.setValue(300);
      dragY.setValue(0);
    }
  }, [visible]);

  // Combina a animação de slide inicial com o drag
  const translateY = Animated.add(slideAnim, dragY);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          <Animated.View style={styles.imageContainer} {...panResponder.panHandlers}>
            <Image
              source={{ uri: location.images && location.images.length > 0 ? location.images[0] : undefined }}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <ScrollView style={styles.infoContainer} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{location.title}</Text>
            </View>
            {location.description && <Text style={styles.description}>{location.description}</Text>}
            
            {/* dETALHES */}
            {location.category && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoValue}>{location.category}</Text>
              </View>
            )}
            {location.condition && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Condição:</Text>
                <Text style={styles.infoValue}>{location.condition}</Text>
              </View>
            )}
            {location.accessLevel && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Acesso:</Text>
                <Text style={styles.infoValue}>{location.accessLevel}</Text>
              </View>
            )}
            {location.yearAbandoned !== undefined && location.yearAbandoned !== null && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Abandonado em:</Text>
                <Text style={styles.infoValue}>{String(location.yearAbandoned)}</Text>
              </View>
            )}

            {/* Avaliação  */}
            {location.rating !== undefined && location.rating !== null && (
              <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {[1,2,3,4,5].map((i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                  name={
                    i <= Math.floor(location.rating ?? 0)
                    ? 'star'
                    : (i - 1 < (location.rating ?? 0) && (location.rating ?? 0) % 1 >= 0.5
                      ? 'star-half'
                      : 'star-outline')
                  }
                  size={32}
                  color={palette.accent}
                  style={{ marginHorizontal: 2 }}
                  />
                  {i === Math.ceil(location.rating ?? 0) && (
                  <Text style={{ color: palette.accent, fontSize: 16, marginLeft: 4 }}>
                    {location.rating?.toFixed(1)}
                  </Text>
                  )}
                </View>
                ))}
              </View>
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

            {/* Adicionado & Atualizado */}
            {(location.createdBy || location.updatedAt) && (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 25,
                width: '100%',
              }}>
                <Text style={{ color: palette.subtleText, fontSize: 13, textAlign: 'left', flex: 2 }} numberOfLines={1} ellipsizeMode="tail">
                  {location.createdBy ? location.createdBy : ''}
                </Text>
                <Text style={{ color: palette.subtleText, fontSize: 13, textAlign: 'right', flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
                  {location.updatedAt ? new Date(location.updatedAt).toLocaleDateString() : ''}
                </Text>
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
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LocationDetailsModal;
