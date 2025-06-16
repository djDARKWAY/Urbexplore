import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/mapStyles";
import LocationDetailsModal from "./LocationDetailsModal";
import { Ionicons } from '@expo/vector-icons';

const locationData = require("../../../../assets/locations.json");

const MapViewFullScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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

  const [interestingPlaces, setInterestingPlaces] = useState<Place[]>(
    locationData.map((location: any) => ({
      id: location.id,
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
      warnings: location.warnings
    }))
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível acessar a localização.");
        setLoading(false);
        return;
      }
      let lastLoc = await Location.getLastKnownPositionAsync();
      if (lastLoc && lastLoc.coords) {
        setLocation(lastLoc.coords);
        setLoading(false);
      }
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation(loc.coords);
      setLoading(false);
    })();
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
        initialRegion={location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : {
          latitude: 41.1579,
          longitude: -8.6291,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}        
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        minZoomLevel={7}
        toolbarEnabled={false}      >
        {interestingPlaces.map(place => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title=""
            pinColor="#F44336"
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView><TouchableOpacity
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
    </View>  );
};

export default MapViewFullScreen;
