import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/darkTheme/mapModal.styles";

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
  const [activeTab, setActiveTab] = useState<"mapStyle" | "colorPalette">(
    "mapStyle"
  );
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}> 
          {/* Botão de fechar */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {/* Título */}
          <Text style={styles.title}>
            Personalização
          </Text>
          {/* Tabs */}
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
          {/* Tab Content */}
          {activeTab === "mapStyle" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 12,
                marginTop: 24,
              }}
            >
              {/* Preview Standard */}
              <TouchableOpacity
                style={{ alignItems: "center", flex: 1, marginRight: 4 }}
                onPress={() => {
                  onSelect("standard");
                  onClose();
                }}
              >
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 18,
                    borderWidth: selectedType === "standard" ? 3 : 1,
                    borderColor:
                      selectedType === "standard" ? "#4CE0B3" : "#444",
                    backgroundColor: "#e5e5e5",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#222", fontWeight: "bold" }}>
                    Claro
                  </Text>
                </View>
                <Text style={{ color: "#fff" }}>Claro</Text>
              </TouchableOpacity>
              {/* Preview Dark */}
              <TouchableOpacity
                style={{ alignItems: "center", flex: 1, marginHorizontal: 4 }}
                onPress={() => {
                  onSelect("dark");
                  onClose();
                }}
              >
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 18,
                    borderWidth: selectedType === "dark" ? 3 : 1,
                    borderColor: selectedType === "dark" ? "#4CE0B3" : "#444",
                    backgroundColor: "#222",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Escuro
                  </Text>
                </View>
                <Text style={{ color: "#fff" }}>Escuro</Text>
              </TouchableOpacity>
              {/* Preview Satellite */}
              <TouchableOpacity
                style={{ alignItems: "center", flex: 1, marginLeft: 4 }}
                onPress={() => {
                  onSelect("satellite");
                  onClose();
                }}
              >
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 18,
                    borderWidth: selectedType === "satellite" ? 3 : 1,
                    borderColor: selectedType === "satellite" ? "#4CE0B3" : "#444",
                    backgroundColor: "#b0b0b0",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons name="globe-outline" size={32} color="#222" />
                  <Text style={{ color: "#222", fontWeight: "bold", marginTop: 4 }}>
                    Satélite
                  </Text>
                </View>
                <Text style={{ color: "#fff" }}>Satélite</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Seleção de cores em breve...
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MapTypeModal;
