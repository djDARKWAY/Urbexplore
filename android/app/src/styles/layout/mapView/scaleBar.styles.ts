import { StyleSheet } from "react-native";
import { palette } from "../../palette";

export const scaleBarStyles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 54,
    bottom: 136,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 10,
    elevation: 10,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 9,
    marginLeft: 6,
  },
  verticalTick: {
    width: 2,
    height: 6,
    backgroundColor: palette.text,
    borderRadius: 1,
  },
  bar: {
    height: 3,
    backgroundColor: palette.text,
    borderRadius: 1,
  },
  label: {
    color: palette.text,
    fontSize: 12,
    fontWeight: "bold",
  },
});
