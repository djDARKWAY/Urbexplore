import { StyleSheet } from "react-native";
import { palette } from "./palette";

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    backgroundColor: palette.background,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: palette.border,
    justifyContent: "center",
    alignItems: "center",
  },
  currentLocationButton: {
    bottom: 65,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  filterButton: {
    bottom: 145,
    right: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});