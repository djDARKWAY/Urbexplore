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
  mapBox: {
    width: 74,
    height: 74,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 2,
  },
});

export const getMapBoxStyle = (selected: boolean, borderColor: string) => ({
  ...mapStyleTabStyles.mapBox,
  borderColor: selected ? borderColor : "#444",
  opacity: selected ? 1 : 0.7,
});

export const getMapBoxTextStyle = (color: string) => ({
  color,
  fontWeight: "bold" as const,
});

export default mapStyleTabStyles;
