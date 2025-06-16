import { StyleSheet } from "react-native";

export const scaleBarStyles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
    bottom: 65,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  bar: {
    width: 72,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 1000,
    marginRight: 8,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 2,
  },
});
