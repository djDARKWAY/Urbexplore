import { StyleSheet } from "react-native";
import { palette } from "../../palette";

export const scaleBarStyles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
    bottom: 65,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${palette.background}BB`,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  bar: {
    width: 72,
    height: 5,
    backgroundColor: palette.text,
    borderRadius: 1000,
    marginRight: 8,
  },
  label: {
    color: palette.text,
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 2,
  },
});
