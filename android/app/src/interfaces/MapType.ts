export interface MapTypeModalProps {
  visible: boolean;
  selectedType: "standard" | "dark" | "satellite";
  onSelect: (type: "standard" | "dark" | "satellite") => void;
  onClose: () => void;
}
