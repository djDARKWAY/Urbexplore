import { StyleSheet } from "react-native";

const colorPaletteTabStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export const getColorCircleStyle = (selected: boolean, color: string) => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: color,
  marginHorizontal: 9,
  borderWidth: selected ? 3 : 1,
  borderColor: selected ? '#4CE0B3' : '#888',
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
});

export default colorPaletteTabStyles;
