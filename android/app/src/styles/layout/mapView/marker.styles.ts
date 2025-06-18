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
  switch (category) {
    case "Sanatório":
      return "hospital";
    case "Mina":
      return "hard-hat";
    case "Estrada":
      return "road-variant";
    case "Moradia":
      return "home";
    case "Palácio":
      return "castle";
    case "Edifício":
      return "office-building";
  }
};
