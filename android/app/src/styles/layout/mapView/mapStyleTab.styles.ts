import { StyleSheet } from "react-native";

const mapStyleTabStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 24,
  },
  option: {
    alignItems: "center",
    flex: 1,
  },
  optionLeft: {
    marginRight: 4,
  },
  optionCenter: {
    marginHorizontal: 4,
  },
  optionRight: {
    marginLeft: 4,
  },
  label: {
    color: "#fff",
  },
});

export const getMapBoxStyle = (selected: boolean, color: string) => ({
  width: 90,
  height: 90,
  borderRadius: 18,
  borderWidth: selected ? 3 : 1,
  borderColor: selected ? "#4CE0B3" : "#444",
  backgroundColor: color,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  marginBottom: 8,
});

export const getMapBoxTextStyle = (color: string) => ({
  color,
  fontWeight: "bold" as const,
});

export default mapStyleTabStyles;
