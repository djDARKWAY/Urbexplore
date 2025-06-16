import { StyleSheet } from "react-native";

export const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 65,
    right: 20,
    backgroundColor: "#222",
    width: 70,
    height: 70,
    borderRadius: 35,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
});
