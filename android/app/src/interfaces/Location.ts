export interface Location {
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
  createdBy?: string;
  updatedAt?: string;
  lat: number;
  lon: number;
  totalRate?: number;
}
