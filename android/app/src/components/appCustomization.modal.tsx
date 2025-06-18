import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/layout/mapView/mapModal.styles";
import mapStyleTabStyles from "../styles/layout/appCustomization/mapStyleTab.styles"
import colorPaletteTabStyles, { getColorCircleStyle } from "../styles/layout/appCustomization/colorPaletteTab.styles";
import { useTheme } from "../contexts/ThemeContext";
import { MapTypeModalProps } from "../interfaces/MapType";

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

  const palette = ["#121519","#040507","#320e15","#122035","#0d392b","#1f1238","#390f1d","#413013","#254610","#412b13"];
  const paletteRows = [palette.slice(0, 5), palette.slice(5, 10)];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor }]}> 
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
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
          {activeTab === "mapStyle" ? (
            <View style={{ flex: 1 }}>
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
                      style={{ width: '48%', marginBottom: 22, alignItems: 'center' }}
                      onPress={() => {
                        onSelect(opt.type as any);
                        onClose();
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
                          borderColor: selectedType === opt.type ? '#4fc3f7' : 'transparent',
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
            </View>
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
      </View>
    </Modal>
  );
};

export default MapTypeModal;
