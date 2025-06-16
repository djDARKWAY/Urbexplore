import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/mapStyles";
import LocationDetailsModal from "./LocationDetailsModal";
import { Ionicons } from '@expo/vector-icons';

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
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [interestingPlaces, setInterestingPlaces] = useState<Place[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Obter localização do utilizador
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível aceder à localização.");
        setLoading(false);
        return;
      }

      let lastLoc = await Location.getLastKnownPositionAsync();
      if (lastLoc && lastLoc.coords) {
        setLocation(lastLoc.coords);
      }

      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://192.168.1.95:3001/locations");
        const data = await response.json();
        const places: Place[] = data.locations.map((location: any) => ({
          id: location._id || location.id,
          name: location.name,
          description: location.description,
          coordinate: { latitude: location.lat, longitude: location.lon },
          imageUrl: location.photos && location.photos.length > 0
            ? location.photos[0]
            : "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070",
          difficulty: location.accessibility,
          type: location.type,
          condition: location.condition,
          yearAbandoned: location.yearAbandoned,
          warnings: location.warnings,
        }));
        setInterestingPlaces(places);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
        Alert.alert("Erro", "Não foi possível carregar os locais.");
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const handleMarkerPress = (place: Place) => {
    setSelectedLocation(place);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading || loadingPlaces) {
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
        initialRegion={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 41.1579,
                longitude: -8.6291,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        minZoomLevel={7}
        toolbarEnabled={false}
      >
        {interestingPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
            pinColor="#F44336"
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={mapStyles.currentLocationButton}
        onPress={() => {
          if (location && mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }}
      >
        <Ionicons name="locate" size={32} color="#007AFF" />
      </TouchableOpacity>

      {selectedLocation && (
        <LocationDetailsModal
          visible={modalVisible}
          onClose={handleCloseModal}
          location={selectedLocation}
        />
      )}
    </View>
  );
};

export default MapViewFullScreen;
