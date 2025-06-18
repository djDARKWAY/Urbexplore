export interface MapTypeModalProps {
  visible: boolean;
  selectedType: "standard" | "dark" | "satellite" | "haunted";
  onSelect: (type: "standard" | "dark" | "satellite" | "haunted") => void;
  onClose: () => void;
}
