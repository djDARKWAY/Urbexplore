import { StyleSheet } from "react-native";
import { palette } from "../palette";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: palette.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "45%",
    paddingBottom: 0,
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
    padding: 8,
  },
  title: {
    color: palette.text,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 23,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
  },
  tabLeft: {
    marginRight: 12,
  },
  activeTabBorder: {
    borderBottomColor: palette.accent,
  },
  inactiveTabBorder: {
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: palette.accent,
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: palette.text,
    fontWeight: "normal",
  },
  mapStyleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 24,
  },
  previewContainer: {
    alignItems: "center",
    flex: 1,
  },
  previewContainerLeft: {
    marginRight: 8,
  },
  previewContainerRight: {
    marginLeft: 8,
  },
  previewBox: {
    width: 100,
    height: 100,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  previewBoxSelected: {
    borderWidth: 3,
    borderColor: palette.accent,
  },
  previewBoxUnselected: {
    borderColor: palette.border,
  },
  lightPreviewBox: {
    backgroundColor: "#e5e5e5",
  },
  darkPreviewBox: {
    backgroundColor: palette.background,
  },
  previewLabel: {
    color: palette.text,
  },
  lightPreviewText: {
    color: "#222",
    fontWeight: "bold",
  },
  darkPreviewText: {
    color: palette.text,
    fontWeight: "bold",
  },
  colorPaletteContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  colorPaletteText: {
    color: palette.text,
    fontSize: 16,
  },
});

export default styles;
