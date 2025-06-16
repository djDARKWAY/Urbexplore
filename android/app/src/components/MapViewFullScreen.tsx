import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/map.styles";
import LocationDetailsModal from "./LocationDetailsModal";
import { Ionicons } from '@expo/vector-icons';
import { scaleBarStyles } from "../styles/scaleBar.styles";

interface Place {
  id: string;
  name: string;
  description: string;
  coordinate: { latitude: number; longitude: number };
  imageUrl: string;
  difficulty?: string;
  type?: string;
  condition?: string;
  yearAbandoned?: number;
  warnings?: string[];
  accessibility?: string;
}

const MapViewFullScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const initialRegion = {
    latitude: 39.5, // Centro de Portugal
    longitude: -8.0,
    latitudeDelta: 5.5, // Abrange todo o país
    longitudeDelta: 6.5,
  };
  const [region, setRegion] = useState<any>(initialRegion);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") throw new Error("Permissão negada");
        let lastLoc = await Location.getLastKnownPositionAsync();
        let loc = lastLoc?.coords || (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })).coords;
        setLocation(loc);
        const response = await fetch("http://192.168.1.95:3001/locations");
        const data = await response.json();
        setPlaces(data.locations.map((l: any) => ({
          id: l._id || l.id,
          name: l.name,
          description: l.description,
          coordinate: { latitude: l.lat, longitude: l.lon },
          imageUrl: l.photos?.[0] || "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070",
          difficulty: l.accessibility,
          type: l.type,
          condition: l.condition,
          yearAbandoned: l.yearAbandoned,
          warnings: l.warnings,
        })));
      } catch (e: any) {
        Alert.alert("Erro", e.message || "Não foi possível carregar dados.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const goToUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const dist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const scaleBar = (reg: any, w = 72) => {
    if (!reg) return { label: '', width: 0 };
    const { latitude, longitude, longitudeDelta } = reg;
    const degPerPx = longitudeDelta / 400;
    const lngDelta = degPerPx * w;
    const d = dist(latitude, longitude, latitude, longitude + lngDelta);
    let val = d, unit = 'm';
    if (d > 1000) { val = Math.round(d/100)/10; unit = 'km'; }
    else { val = Math.round(d/10)*10; }
    return { label: `${val} ${unit}`, width: w };
  };

  if (loading) {
    return (
      <View style={mapStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={mapStyles.container}>
      <MapView
        ref={mapRef}
        style={mapStyles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        minZoomLevel={7}
        toolbarEnabled={false}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            pinColor="#F44336"
            onPress={() => { setSelected(place); setModalVisible(true); }}
          />
        ))}
      </MapView>
      <TouchableOpacity style={mapStyles.currentLocationButton} onPress={goToUserLocation}>
        <Ionicons name="locate" size={32} color="#007AFF" />
      </TouchableOpacity>
      {region && (() => {
        const s = scaleBar(region, 72);
        return (
          <View style={scaleBarStyles.container}>
            <View style={[scaleBarStyles.bar, { width: s.width }]} />
            <View>
              <Text style={scaleBarStyles.label}>{s.label}</Text>
            </View>
          </View>
        );
      })()}
      {selected && (
        <LocationDetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          location={selected}
        />
      )}
    </View>
  );
};

export default MapViewFullScreen;
