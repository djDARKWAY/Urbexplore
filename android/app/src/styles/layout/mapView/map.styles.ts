import { StyleSheet } from "react-native";
import { palette } from "../../palette";

const buttonBase = {
  position: "absolute" as const,
  backgroundColor: palette.background,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 4,
  borderWidth: 1,
  borderColor: palette.border,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  map: {
    flex: 1,
  },
  button: buttonBase,
  currentLocationButton: {
    ...buttonBase,
    bottom: 60,
    right: 15,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  filterButton: {
    ...buttonBase,
    bottom: 140,
    right: 22,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  compassButton: {
    ...buttonBase,
    bottom: 205,
    right: 31,
    width: 38,
    height: 38,
    borderRadius: 19,
  },
});
