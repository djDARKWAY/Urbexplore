import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/darkTheme/map.styles";
import LocationDetailsModal from "./LocationDetailsModal";
import { Ionicons } from '@expo/vector-icons';
import { scaleBarStyles } from "../styles/darkTheme/scaleBar.styles";
import MapTypeModal from "./MapTypeModal";
import { googleMapsDarkStyle } from "../styles/darkTheme/googleMapsDarkStyle";

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
  const [error, setError] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'dark'>('dark');
  const [mapTypeModalVisible, setMapTypeModalVisible] = useState(false);
  const initialRegion = {
    latitude: 39.5,
    longitude: -8.0,
    latitudeDelta: 5.5,
    longitudeDelta: 6.5,
  };
  const [region, setRegion] = useState<any>(initialRegion);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
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
        imageUrl: l.photos?.[0],
        difficulty: l.difficulty,
        type: l.type,
        condition: l.condition,
        yearAbandoned: l.yearAbandoned,
        warnings: l.warnings,
        accessibility: l.accessibility,
      })));
    } catch (e: any) {
      setError(e.message);
      Alert.alert("Erro", e.message);
    } finally {
      setLoading(false);
    }
  };

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
        {error && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
            <TouchableOpacity onPress={fetchData} style={{ backgroundColor: '#333', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: '#fff' }}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}
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
      showsUserLocation={true}
      showsMyLocationButton={false}
      showsCompass={false}
      minZoomLevel={7}
      maxZoomLevel={21}
      toolbarEnabled={false}
      mapType={mapType === 'standard' ? 'standard' : 'standard'}
      customMapStyle={mapType === 'dark' ? googleMapsDarkStyle : []}
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
      <TouchableOpacity
      style={[mapStyles.button, mapStyles.filterButton]}
      onPress={() => setMapTypeModalVisible(true)}
      >
      <Ionicons name="map" size={24} color="#AAAAAA" />
      </TouchableOpacity>
      <TouchableOpacity
      style={[mapStyles.button, mapStyles.currentLocationButton]}
      onPress={goToUserLocation}
      >
      <Ionicons name="locate" size={32} color="#AAAAAA" />
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
      <MapTypeModal
        visible={mapTypeModalVisible}
        selectedType={mapType}
        onSelect={(type) => { setMapType(type); setMapTypeModalVisible(false); }}
        onClose={() => setMapTypeModalVisible(false)}
      />
    </View>
  );
}

export default MapViewFullScreen;
