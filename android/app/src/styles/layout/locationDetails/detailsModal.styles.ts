import { StyleSheet } from "react-native";
import { palette } from "../../palette";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: palette.overlay,
  },
  modalContent: {
    height: "80%",
    backgroundColor: palette.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: palette.closeButton,
    borderRadius: 24,
    padding: 4,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: palette.text,
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: palette.description,
    marginBottom: 24,
    textAlign: "justify",
  },
  fixedActionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.background,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: palette.text,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.mutedText,
  },
  infoValue: {
    fontSize: 16,
    color: palette.text,
  },
  warningsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  warningsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: palette.warning,
    marginBottom: 8,
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: palette.warningBg,
    padding: 10,
    borderRadius: 6,
  },
  warningText: {
    marginLeft: 8,
    color: palette.description,
    flex: 1,
  },
});

export default styles;
