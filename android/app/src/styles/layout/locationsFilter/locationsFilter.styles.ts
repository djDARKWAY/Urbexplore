import { StyleSheet } from "react-native";
import { palette } from "../../palette";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.69)",
  },
  modalContent: {
    backgroundColor: "#090909",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 80,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: palette.closeButton,
    borderRadius: 24,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    alignSelf: "flex-start",
    color: "#fff",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#898989",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  categoryButton: {
    height: 36,
    backgroundColor: "#eee",
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
  },
  categoryButtonSelected: {
    backgroundColor: "#222",
  },
  categoryButtonText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 13,
  },
  categoryButtonTextSelected: {
    color: "#fff",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "#090909",
  },
  clearButton: {
    backgroundColor: "#eee",
    paddingVertical: 16,
    borderRadius: 16,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  applyButton: {
    backgroundColor: "#222",
    paddingVertical: 16,
    borderRadius: 16,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  categoryContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
});

export default styles;
