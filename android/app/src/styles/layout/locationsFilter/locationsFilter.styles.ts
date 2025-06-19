import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingTop: 10,
    paddingBottom: 80,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#eee",
    borderRadius: 16,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
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
    color: "#222",
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
    backgroundColor: "#fff",
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
    color: "#222",
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
});

export default styles;
