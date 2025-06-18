import React, { useState, useMemo } from "react";
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/layout/mapView/mapModal.styles";
import mapStyleTabStyles, { getMapBoxStyle } from "../styles/layout/appCustomization/mapStyleTab.styles"
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

  const palette = ["#14171b", "#050608", "#351017", "#14233a", "#0e3e30", "#21143d", "#3d1220", "#473516", "#294c14", "#473016"];

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
            <View style={mapStyleTabStyles.container}>
              {[{ type: "standard", label: "Claro", img: require("../../../../assets/appCustomization/mapsL.png"), color: "#e5e5e5" },
                { type: "dark", label: "Escuro", img: require("../../../../assets/appCustomization/mapsD.png"), color: "#222222" },
                { type: "satellite", label: "Satélite", img: require("../../../../assets/appCustomization/mapsS.png"), color: "#b0b0b0" }].map(opt => (
                <TouchableOpacity
                  key={opt.type}
                  style={[
                    mapStyleTabStyles.option,
                    opt.type === "standard" ? mapStyleTabStyles.optionLeft : opt.type === "satellite" ? mapStyleTabStyles.optionRight : mapStyleTabStyles.optionCenter
                  ]}
                  onPress={() => {
                    onSelect(opt.type as any);
                    onClose();
                  }}
                >
                  <View
                    style={getMapBoxStyle(selectedType === opt.type, opt.color)}
                  >
                    <Image
                      source={opt.img}
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={mapStyleTabStyles.label}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
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
