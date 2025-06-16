import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/mapStyles";
import LocationDetailsModal from "./LocationDetailsModal";

const MapViewFullScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  interface Place {
    id: number;
    name: string;
    description: string;
    coordinate: { latitude: number; longitude: number };
    imageUrl: string;
    difficulty?: string;
    visited?: boolean;
  }

  const [interestingPlaces, setInterestingPlaces] = useState<Place[]>([
    {
      id: 1,
      name: "Castelo Abandonado",
      description: "Um castelo histórico abandonado do século XVIII, com ruínas bem preservadas e estruturas fascinantes para explorar. O local tem uma rica história e está rodeado por jardins encobertos pela vegetação.",
      coordinate: { latitude: 41.1589, longitude: -8.6300 },
      imageUrl: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=2070",
      difficulty: "Medium",
      visited: false
    },
    {
      id: 2,
      name: "Fábrica Antiga",
      description: "Uma fábrica industrial abandonada dos anos 50 com maquinaria intacta e grandes espaços para explorar. A arquitetura industrial mantém características únicas da época.",
      coordinate: { latitude: 41.1550, longitude: -8.6280 },
      imageUrl: "https://images.unsplash.com/photo-1518769293-6a9dc113fb8c?q=80&w=2069",
      difficulty: "Hard",
      visited: true
    }
  ]);

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
        minZoomLevel={7}
      >
        {interestingPlaces.map(place => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>
      
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
