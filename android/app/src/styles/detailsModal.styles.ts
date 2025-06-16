import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    height: "80%",
    backgroundColor: "#0F1923",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  imageContainer: {
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
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
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
    marginBottom: 5,
  },
  easyBadge: {
    backgroundColor: "#4CAF50",
  },
  mediumBadge: {
    backgroundColor: "#FF9800",
  },
  hardBadge: {
    backgroundColor: "#F44336",
  },
  visitedBadge: {
    backgroundColor: "#2196F3",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#e0e0e0",
    marginBottom: 24,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#2E3A46",
  },
  fixedActionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0F1923",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#2E3A46",
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2E3A46",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b0b0b0",
  },
  infoValue: {
    fontSize: 16,
    color: "#ffffff",
  },
  warningsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  warningsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 8,
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(255, 165, 0, 0.1)",
    padding: 10,
    borderRadius: 6,
  },
  warningText: {
    marginLeft: 8,
    color: "#e0e0e0",
    flex: 1,
  },
});

export default styles;
