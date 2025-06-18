import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { markerStylesFn, getMarkerIcon } from "../styles/layout/mapView/marker.styles";

interface CustomMarkerProps {
  backgroundColor: string;
  category: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = React.memo(({ backgroundColor, category }) => {
  const styles = markerStylesFn(backgroundColor);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={getMarkerIcon(category)} style={styles.icon} />
    </View>
  );
});

export default CustomMarker;
