import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/layout/mapView/mapModal.styles";
import mapStyleTabStyles from "../styles/layout/appCustomization/mapStyleTab.styles"
import colorPaletteTabStyles, { getColorCircleStyle } from "../styles/layout/appCustomization/colorPaletteTab.styles";
import { useTheme } from "../contexts/ThemeContext";
import { MapTypeModalProps } from "../interfaces/MapType";
import { useSlideAnimation, animateModalOut, SCREEN_HEIGHT } from "../styles/animations/slideAnimation";

const palette = ["#121519","#040507","#2a0c12","#0e1a2a","#0a2e22","#180d2b","#2e0c17","#33270f","#1d370c","#33210f"];
const paletteRows = [palette.slice(0, 5), palette.slice(5, 10)];
const defaultColor = palette[2];

const MapTypeModal: React.FC<MapTypeModalProps> = ({
  visible,
  selectedType,
  onSelect,
  onClose,
}) => {
  const { backgroundColor, setBackgroundColor } = useTheme();
  const [activeTab, setActiveTab] = useState<"mapStyle" | "colorPalette">(
    "mapStyle"
  );
  // Slide animation
  const slideAnim = useSlideAnimation(visible);
  const dragY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [internalVisible, setInternalVisible] = useState(visible);
  const closeRequested = useRef(false);

  useEffect(() => {
    if (!backgroundColor || !palette.includes(backgroundColor)) {
      setBackgroundColor(defaultColor);
    }
  }, []);

  // Fade in/out overlay e animação de entrada/saída
  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      closeRequested.current = false;
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (!visible && internalVisible) {
      closeRequested.current = true;
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        animateModalOut(slideAnim, dragY, () => {
          setInternalVisible(false);
          closeRequested.current = false;
        });
      });
    }
  }, [visible]);

  // Handler único para fechar modal com fade + slide
  const handleClose = () => {
    if (!closeRequested.current) {
      closeRequested.current = true;
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        animateModalOut(slideAnim, dragY, () => {
          setInternalVisible(false);
          closeRequested.current = false;
          onClose();
        });
      });
    }
  };

  // Only render Modal when internalVisible is true
  if (!internalVisible) return null;

  return (
    <Modal
      visible={internalVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim, backgroundColor: 'rgba(10,10,10,0.69)' }]}> 
        <Animated.View style={[styles.modalContainer, { backgroundColor: backgroundColor, transform: [{ translateY: slideAnim }] }]}> 
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>
            Personalização
          </Text>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                styles.tabLeft,
                activeTab === "mapStyle" ? styles.activeTabBorder : styles.inactiveTabBorder
              ]}
              onPress={() => setActiveTab("mapStyle")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "mapStyle" ? styles.activeTabText : styles.inactiveTabText
                ]}
              >
                Estilo de mapa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "colorPalette" ? styles.activeTabBorder : styles.inactiveTabBorder
              ]}
              onPress={() => setActiveTab("colorPalette")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "colorPalette" ? styles.activeTabText : styles.inactiveTabText
                ]}
              >
                Palete de cores
              </Text>
            </TouchableOpacity>
          </View>
          {/* Container do conteúdo com fundo cinza escuro */}
          <View style={{ flex: 1, backgroundColor: '#090909', paddingTop: 8 }}>
            {activeTab === "mapStyle" ? (
              <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {[
                    { type: "haunted", label: "Haunted", img: require("../../../../assets/appCustomization/maps2.png"), color: "#232326" },
                    { type: "standard", label: "Claro", img: require("../../../../assets/appCustomization/maps3.png"), color: "#e5e5e5" },
                    { type: "dark", label: "Escuro", img: require("../../../../assets/appCustomization/maps1.png"), color: "#222222" },
                    { type: "satellite", label: "Satélite", img: require("../../../../assets/appCustomization/maps4.png"), color: "#b0b0b0" }
                  ].map(opt => (
                    <TouchableOpacity
                      key={opt.type}
                      style={{ width: '48%', marginBottom: 10, alignItems: 'center' }}
                      onPress={() => {
                        onSelect(opt.type as any);
                        handleClose();
                      }}
                      activeOpacity={0.85}
                    >                 
                    <View
                        style={{
                          width: '100%',
                          aspectRatio: 1.3,
                          borderRadius: 16,
                          overflow: 'hidden',
                          borderWidth: selectedType === opt.type ? 3 : 0,
                          borderColor: selectedType === opt.type ? backgroundColor : 'transparent',
                          opacity: selectedType === opt.type ? 1 : 0.7,
                        }}
                      >
                        <Image
                          source={opt.img}
                          style={{ width: '100%', height: '100%', borderRadius: 16 }}
                          resizeMode="cover"
                        />
                      </View>
                      <Text style={[mapStyleTabStyles.label, { marginTop: 8, fontSize: 16, textAlign: 'center' }]}>{opt.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View style={{ flex: 1 }}>
                {paletteRows.map((row, rowIndex) => (
                  <View key={rowIndex} style={colorPaletteTabStyles.row}>
                    {row.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={getColorCircleStyle(backgroundColor === color, color)}
                        onPress={() => {
                          setBackgroundColor(color);
                        }}
                      >
                        {backgroundColor === color && (
                          <Ionicons name="checkmark" size={24} color="#fff" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
                <Text style={colorPaletteTabStyles.infoText}>
                  Seleciona uma cor para personalizar a interface
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default MapTypeModal;
