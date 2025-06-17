import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/layout/mapView/mapModal.styles";
import mapStyleTabStyles, { getMapBoxStyle, getMapBoxTextStyle } from "../styles/layout/mapView/mapStyleTab.styles";
import colorPaletteTabStyles, { getColorCircleStyle } from "../styles/layout/appCustomization/colorPaletteTab.styles";
import { useTheme } from "../contexts/ThemeContext";

interface MapTypeModalProps {
  visible: boolean;
  selectedType: "standard" | "dark" | "satellite";
  onSelect: (type: "standard" | "dark" | "satellite") => void;
  onClose: () => void;
}

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

  const palette = ["#14171b", "#050608", "#221013", "#16263a", "#0e3d2e", "#27163a", "#3a1627", "#3a2e16", "#263a16", "#3a2716"];

  const paletteRows = [palette.slice(0, 5), palette.slice(5, 10)];

  const getModalBackground = () => {
    return { backgroundColor };
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, getModalBackground()]}> 
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
              <TouchableOpacity
                style={[mapStyleTabStyles.option, mapStyleTabStyles.optionLeft]}
                onPress={() => {
                  onSelect("standard");
                  onClose();
                }}
              >
                <View
                  style={getMapBoxStyle(selectedType === "standard", "#e5e5e5")}
                >
                  <Text style={getMapBoxTextStyle("#222")}>Claro</Text>
                </View>
                <Text style={mapStyleTabStyles.label}>Claro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[mapStyleTabStyles.option, mapStyleTabStyles.optionCenter]}
                onPress={() => {
                  onSelect("dark");
                  onClose();
                }}
              >
                <View
                  style={getMapBoxStyle(selectedType === "dark", "#222")}
                >
                  <Text style={getMapBoxTextStyle("#fff")}>Escuro</Text>
                </View>
                <Text style={mapStyleTabStyles.label}>Escuro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[mapStyleTabStyles.option, mapStyleTabStyles.optionRight]}
                onPress={() => {
                  onSelect("satellite");
                  onClose();
                }}
              >
                <View
                  style={getMapBoxStyle(selectedType === "satellite", "#b0b0b0")}
                >
                  <Ionicons name="globe-outline" size={32} color="#222" />
                  <Text style={[getMapBoxTextStyle("#222"), { marginTop: 4 }]}>Satélite</Text>
                </View>
                <Text style={mapStyleTabStyles.label}>Satélite</Text>
              </TouchableOpacity>
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
