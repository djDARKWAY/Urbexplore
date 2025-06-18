import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/layout/mapView/map.styles";
import LocationDetailsModal from "./locationDetails.modal";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { scaleBarStyles } from "../styles/layout/mapView/scaleBar.styles";
import { getDynamicPalette } from "../utils/themeUtils";
import MapTypeModal from "./appCustomization.modal";
import { googleMapsCustom } from "../styles/layout/appCustomization/googleMapsCustom";
import { useTheme } from "../contexts/ThemeContext";
import CustomMarker from "../contexts/CustomMarker";
import { Location as LocationType } from "../interfaces/Location";
import { compassStyles } from "../styles/layout/mapView/compass.style";

const MapViewFullScreen = () => {
  const { backgroundColor } = useTheme();
  const dynamicPalette = getDynamicPalette(backgroundColor);
  
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<LocationType[]>([]);
  const [selected, setSelected] = useState<LocationType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'dark' | 'satellite'>('standard');
  const [mapTypeModalVisible, setMapTypeModalVisible] = useState(false);
  const initialRegion = { latitude: 39.5, longitude: -8.0, latitudeDelta: 5.5, longitudeDelta: 6.5 };
  const [currentRegion, setCurrentRegion] = useState<typeof initialRegion>(initialRegion);
  const [heading, setHeading] = useState(0);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    setCurrentRegion(initialRegion);
    fetchData();
  }, []);

  const mapLocationData = (l: any): LocationType => ({
    id: l._id || l.id || '',
    title: l.title || '-',
    description: l.description || '-',
    images: l.images && l.images.length > 0
      ? l.images
      : ['https://placehold.co/600x400/1e1e1e/FFFFFF/png?text=Sem+Imagem&font=Poppins&fontsize=28&outline=true'],
    category: l.category || '-',
    condition: l.condition || '-',
    yearAbandoned: l.yearAbandoned ?? null,
    warnings: l.warnings && l.warnings.length > 0 ? l.warnings : [],
    accessLevel: l.accessLevel || '-',
    rating: l.rating ?? 0,
    createdBy: l.createdBy || '-',
    updatedAt: l.updatedAt || '-',
    lat: l.lat ?? 0,
    lon: l.lon ?? 0,
    totalRate: l.totalRate ?? 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let loc = null;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let lastLoc = await Location.getLastKnownPositionAsync();
        loc = lastLoc?.coords || (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })).coords;
        setLocation(loc);
      }
      const response = await fetch("http://192.168.1.79:3001/locations");
      const data = await response.json();
      setPlaces(data.locations.map(mapLocationData));
    } catch (e: any) {
      setError(e.message);
      Alert.alert("Erro", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToUserLocation = useCallback(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const goToNorth = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera({ heading: 0 }, { duration: 500 });
    }
  }, []);

  const handleRegionChange = useCallback((reg: typeof initialRegion) => {
    setCurrentRegion(reg);
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        setHeading(camera.heading || 0);
      });
    }
  }, []);

  const dist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const getScale = (d: number) => {
    const niceValues = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    for (let i = 0; i < niceValues.length; i++) {
      if (d <= niceValues[i]) return niceValues[i];
    }
    return niceValues[niceValues.length - 1];
  };

  const scaleBar = useCallback((reg: typeof initialRegion, maxWidthPx = 100) => {
    if (!reg) return { label: '', width: 0 };
    const { latitude, longitude, longitudeDelta } = reg;
    const degPerPx = longitudeDelta / 400;
    const lngDelta = degPerPx * maxWidthPx;
    const d = dist(latitude, longitude, latitude, longitude + lngDelta);
    const nice = getScale(d);
    const width = Math.round((nice / d) * maxWidthPx);
    let val = nice, unit = 'm';
    if (val >= 1000) {
      val = val / 1000;
      unit = 'km';
    }
    return { label: `${val} ${unit}`, width };
  }, []);

  if (loading) {
    return (
      <View style={[mapStyles.container, { backgroundColor: dynamicPalette.background }]}> 
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
    <View style={[mapStyles.container, { backgroundColor: dynamicPalette.background }]}> 
      <MapView
        ref={mapRef}
        style={mapStyles.map}
        initialRegion={initialRegion}
        onRegionChange={handleRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        minZoomLevel={7}
        maxZoomLevel={21}
        toolbarEnabled={false}
        rotateEnabled={true}
        mapType={mapType === 'satellite' ? 'satellite' : 'standard'}
        customMapStyle={mapType === 'dark' ? googleMapsCustom : []}
      >
        {places.map(place => (
          <Marker
            key={place.id + backgroundColor}
            coordinate={{ latitude: place.lat, longitude: place.lon }}
            onPress={() => { setSelected(place); setModalVisible(true); }}
          >
            <CustomMarker backgroundColor={backgroundColor} category={place.category} />
          </Marker>
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
      {heading !== 0 && (
        <TouchableOpacity
          style={[mapStyles.compassButton]}
          onPress={goToNorth}
        >
          <Entypo name="compass" size={22} color="#AAAAAA" style={{ transform: [{ rotate: `${-45 - heading}deg` }] }} />
        </TouchableOpacity>
      )}
      {currentRegion && (() => {
        let maxWidth = 50;
        const s = scaleBar(currentRegion, maxWidth);
        if (s.label.includes('km')) {
          const val = parseFloat(s.label);
          if (val >= 100) {
            maxWidth = 90;
          } else if (val >= 50) {
            maxWidth = 70;
          }
        }
        const sFinal = scaleBar(currentRegion, maxWidth);
        return (
          <View style={scaleBarStyles.container}>
            <View style={scaleBarStyles.barContainer}>
              <View style={scaleBarStyles.verticalTick} />
              <View style={[scaleBarStyles.bar, { width: sFinal.width }]} />
              <View style={scaleBarStyles.verticalTick} />
            </View>
            <Text style={[scaleBarStyles.label, { marginLeft: 8 }]}>{sFinal.label}</Text>
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
}

export default MapViewFullScreen;
