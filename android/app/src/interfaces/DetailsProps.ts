export interface LocationDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  location: {
    id: string;
    title: string;
    description?: string;
    images?: string[];
    category: string;
    condition?: string;
    yearAbandoned?: number;
    warnings?: string[];
    accessLevel?: string;
    rating?: number;
    totalRate?: number;
    createdBy?: string;
    updatedAt?: string;
    lat?: number;
    lon?: number;
  };
}
