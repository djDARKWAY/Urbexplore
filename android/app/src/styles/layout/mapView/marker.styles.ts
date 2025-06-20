import { StyleSheet } from "react-native";
import { getDynamicPalette } from "../../../utils/themeUtils";

export const markerStylesFn = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      width: 32,
      height: 32,
      backgroundColor: getDynamicPalette(backgroundColor).background,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: "white",
      fontSize: 19,
    },
  });

export const getMarkerIcon = (category: string) => {
  const categoryIconMap: Record<string, string> = {
    "Sanatório": "hospital",
    "Mina": "hard-hat",
    "Portagem": "road-variant",
    "Moradia": "home",
    "Palácio": "castle",
    "Edifício": "office-building",
    "Industrial": "factory",
    "Religião": "church",
    "Hotel": "bed",
    "Quinta": "barn",
    "Atrações": "ferris-wheel",
  };

  return categoryIconMap[category];
};
