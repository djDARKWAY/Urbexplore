import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Animated, PanResponder, Linking, Platform, Share, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import locationDetails from "../styles/layout/locationDetails/locationDetails.styles";
import { useTheme } from "../contexts/ThemeContext";
import { getDynamicPalette } from "../utils/themeUtils";
import { palette } from "../styles/palette";
import { animateModalIn, animateModalOut, animateModalGestureOut, SCREEN_HEIGHT } from '../styles/animations/slideAnimation';
import { LocationDetailsModalProps } from "../interfaces/DetailsProps";
import ImageViewer from 'react-native-image-zoom-viewer';

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({ visible, onClose, location, }) => {
  const { backgroundColor } = useTheme();
  const dynamicPalette = getDynamicPalette(backgroundColor);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0); // Novo estado para controlar a imagem exibida
  const [nextImageIndex, setNextImageIndex] = useState<number | null>(null); // Novo estado para o índice da próxima imagem
  const [fullscreen, setFullscreen] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const imageHeight = Math.round(windowWidth * 9 / 16); // 16:9 ratio
  const [imageSlideAnim] = useState(new Animated.Value(0));
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const closeWithAnimation = useCallback(() => {
    animateModalOut(slideAnim, dragY, () => {
      dragY.setValue(0);
      onClose();
    });
  }, [slideAnim, dragY, onClose]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
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
        if (gestureState.dy > 120 || gestureState.vy > 1.5) {
          animateModalGestureOut(slideAnim, dragY, () => {
            dragY.setValue(0);
            onClose();
          });
        } else {
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
      animateModalIn(slideAnim, dragY).start();
      setDisplayedImageIndex(0);
    } else {
      slideAnim.setValue(SCREEN_HEIGHT);
      dragY.setValue(0);
    }
    setCurrentImageIndex(0);
  }, [visible, slideAnim, dragY]);

  useEffect(() => {
    if (visible && location.images && location.images.length > 0) {
      location.images.forEach((img) => {
        if (img) {
          Image.prefetch(img);
        }
      });
    }
  }, [visible, location.images]);

  const translateY = Animated.add(slideAnim, dragY);

  const openMap = useCallback((lat?: number, lon?: number) => {
    if (lat && lon) {
      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${lat},${lon}`,
        android: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
      });
      Linking.openURL(url!);
    }
  }, []);

  const shareLocation = useCallback(() => {
    let message = `Embarca na aventura urbana e descobre *${location.title}* com o Urbexplore!`;
    if (location.lat && location.lon) {
      message += `\nhttps://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`;
    }
    Share.share({ message });
  }, [location]);

  const renderStars = (rating: number | undefined | null, totalRate: number | undefined | null) => (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = i <= Math.floor(rating ?? 0);
          const isHalf = !isFull && i - 1 < (rating ?? 0) && (rating ?? 0) % 1 >= 0.5;
          return (
            <Ionicons
              key={i}
              name={isFull ? 'star' : isHalf ? 'star-half' : 'star-outline'}
              size={28}
              color={palette.text}
              style={{ marginHorizontal: 2 }}
            />
          );
        })}
        <Text style={{ color: palette.mutedText, fontSize: 16, marginLeft: 8 }}>
          {rating !== undefined && rating !== null
            ? `${rating.toFixed(1)}${totalRate !== undefined && totalRate !== null ? ` (${totalRate})` : ''}`
            : ''}
        </Text>
      </View>
    </View>
  );

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const goToNextImage = () => {
    if (location.images && currentImageIndex < location.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[locationDetails.modalContainer, { backgroundColor: palette.transparentBackground }]}> 
        <Animated.View
          style={[locationDetails.modalContent, { backgroundColor: dynamicPalette.background, transform: [{ translateY }] }]}
        >
            {/* Imagem com setas */}
            <Animated.View style={locationDetails.imageContainer} {...panResponder.panHandlers}>
            {location.images?.length ? (
              <View style={{ width: windowWidth, height: imageHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                {location.images.length > 1 && (
                  <>
                    {currentImageIndex > 0 && (
                      <TouchableOpacity onPress={goToPrevImage} style={{ position: 'absolute', left: 10, top: '50%', zIndex: 2, transform: [{ translateY: -22 }] }}>
                        <Ionicons name="chevron-back" size={28} color="#fff" style={{ backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 22, padding: 8 }} />
                      </TouchableOpacity>
                    )}
                    {currentImageIndex < location.images.length - 1 && (
                      <TouchableOpacity onPress={goToNextImage} style={{ position: 'absolute', right: 10, top: '50%', zIndex: 2, transform: [{ translateY: -22 }] }}>
                        <Ionicons name="chevron-forward" size={28} color="#fff" style={{ backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 22, padding: 8 }} />
                      </TouchableOpacity>
                    )}
                  </>
                )}
                <TouchableOpacity activeOpacity={0.9} onPress={() => setFullscreen(true)}>
                  <Image
                    source={{ uri: location.images[currentImageIndex] }}
                    style={{ width: windowWidth, height: imageHeight, resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity style={locationDetails.closeButton} onPress={closeWithAnimation}>
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
            </Animated.View>

          <ScrollView style={locationDetails.infoContainer} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={locationDetails.headerContainer}>
              <Text style={locationDetails.title}>{location.title}</Text>
            </View>
            {location.description && <Text style={locationDetails.description}>{location.description}</Text>}
            
            {location.category && (
              <View style={locationDetails.infoRow}>
                <Text style={locationDetails.infoLabel}>Tipo:</Text>
                <Text style={locationDetails.infoValue}>{location.category}</Text>
              </View>
            )}
            {location.condition && (
              <View style={locationDetails.infoRow}>
                <Text style={locationDetails.infoLabel}>Condição:</Text>
                <Text style={locationDetails.infoValue}>{location.condition}</Text>
              </View>
            )}
            {location.accessLevel && (
              <View style={locationDetails.infoRow}>
                <Text style={locationDetails.infoLabel}>Acesso:</Text>
                <Text style={locationDetails.infoValue}>{location.accessLevel}</Text>
              </View>
            )}
            {location.yearAbandoned !== undefined && location.yearAbandoned !== null && (
              <View style={locationDetails.infoRow}>
                <Text style={locationDetails.infoLabel}>Abandonado em:</Text>
                <Text style={locationDetails.infoValue}>{String(location.yearAbandoned)}</Text>
              </View>
            )}

            {location.rating !== undefined && location.rating !== null && renderStars(location.rating, location.totalRate)}

            {location.warnings && location.warnings.length > 0 && (
              <View style={locationDetails.warningsContainer}>
                <Text style={locationDetails.warningsTitle}>Avisos:</Text>
                {location.warnings.map((warning, index) => (
                  <View key={index} style={locationDetails.warningItem}>
                    <Ionicons name="warning" size={16} color="#FFA500" />
                    <Text style={locationDetails.warningText}>{warning}</Text>
                  </View>
                ))}
              </View>
            )}

            {(location.createdBy || location.updatedAt) && (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 25,
                width: '100%',
              }}>
                <Text style={{ color: palette.subtleText, fontSize: 13, textAlign: 'left', flex: 2 }} numberOfLines={1} ellipsizeMode="tail">
                  {location.createdBy ? String(location.createdBy) : ''}
                </Text>
                <Text style={{ color: palette.subtleText, fontSize: 13, textAlign: 'right', flex: 1 }} numberOfLines={1} ellipsizeMode="tail">
                  {location.updatedAt ? new Date(location.updatedAt).toLocaleDateString() : ''}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={locationDetails.fixedActionContainer}>
            <TouchableOpacity style={locationDetails.actionButton} onPress={() => openMap(location.lat, location.lon)}>
              <Ionicons name="navigate" size={24} color="#fff" />
              <Text style={locationDetails.actionText}>Navegar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={locationDetails.actionButton} onPress={shareLocation}>
              <Ionicons name="share-social" size={24} color="#fff" />
              <Text style={locationDetails.actionText}>Compartilhar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Fullscreen Modal */}
      <Modal
        visible={fullscreen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullscreen(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.97)' }}>
          <ImageViewer
            imageUrls={(location.images || []).map((img) => ({ url: img }))}
            index={currentImageIndex}
            onSwipeDown={() => setFullscreen(false)}
            enableSwipeDown={true}
            onCancel={() => setFullscreen(false)}
            saveToLocalByLongPress={false}
            renderIndicator={(currentIndex, allSize) => (
              <View style={{ position: 'absolute', top: 40, alignSelf: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{currentIndex} / {allSize}</Text>
              </View>
            )}
            renderHeader={() => (
              <TouchableOpacity style={[locationDetails.closeButton, { top: 40, right: 20, zIndex: 10 }]} onPress={() => setFullscreen(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </Modal>
  );
};

export default LocationDetailsModal;
