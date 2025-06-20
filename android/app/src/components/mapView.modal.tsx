import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Alert, TouchableOpacity, Text, Modal } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyles } from "../styles/layout/mapView/map.styles";
import LocationDetailsModal from "./locationDetails.modal";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { scaleBarStyles } from "../styles/layout/mapView/scaleBar.styles";
import { getDynamicPalette } from "../utils/themeUtils";
import { googleMapsHaunted, googleMapsDark } from "../styles/layout/appCustomization/googleMapsCustom";
import { useTheme } from "../contexts/ThemeContext";
import CustomMarker from "../contexts/CustomMarker";
import { Location as LocationType } from "../interfaces/Location";
import { mapTabBarStyles } from "../styles/layout/mapView/mapTabBar.styles";
import LoadingScreen from "../contexts/LoadingScreen";
import { useFonts } from 'expo-font';
import MapTypeModal from "./appCustomization.modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterModal from './locationsFilter.modal';
import UserProfile from './userProfile.modal';

const MapViewFullScreen = () => {
  const { backgroundColor } = useTheme();
  const dynamicPalette = getDynamicPalette(backgroundColor);
  
  // Estados principais
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null)
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState<LocationType[]>([])
  const [selected, setSelected] = useState<LocationType | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mapType, setMapType] = useState<'standard' | 'dark' | 'satellite' | 'haunted'>('haunted')
  const [mapTypeModalVisible, setMapTypeModalVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAccessLevels, setSelectedAccessLevels] = useState<string[]>([]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const initialRegion = { latitude: 39.5, longitude: -8.0, latitudeDelta: 5.5, longitudeDelta: 6.5 }
  const [currentRegion, setCurrentRegion] = useState<typeof initialRegion>(initialRegion)
  const [heading, setHeading] = useState(0)
  const mapRef = useRef<MapView>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const insets = useSafeAreaInsets();

  // Mapeia dados da API para o formato esperado
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
  
  // Função para fazer fetch dos dados
  const fetchData = useCallback(async (region = currentRegion, isInitial = false, categories = selectedCategories, conditions = selectedConditions, accessLevels = selectedAccessLevels) => {
    if (!region) return;
    if (isInitial) setInitialLoading(true);
    setError(null);
    try {
      const minLat = region.latitude - region.latitudeDelta / 2;
      const maxLat = region.latitude + region.latitudeDelta / 2;
      const minLon = region.longitude - region.longitudeDelta / 2;
      const maxLon = region.longitude + region.longitudeDelta / 2;

      let url = `http://192.168.1.100:3001/locations?minLat=${minLat}&maxLat=${maxLat}&minLon=${minLon}&maxLon=${maxLon}`;
      if (categories && categories.filter(c => c && c.trim() !== '').length > 0) {
        url += `&categories=${categories.join(',')}`;
      }
      if (conditions && conditions.filter(c => c && c.trim() !== '').length > 0) {
        url += `&conditions=${conditions.join(',')}`;
      }
      if (accessLevels && accessLevels.filter(a => a && a.trim() !== '').length > 0) {
        url += `&accessLevels=${accessLevels.join(',')}`;
      }
      const apiResponse = await fetch(url).then(res => res.json());
      setPlaces(apiResponse.locations.map(mapLocationData));
    } catch (e: any) {
      setError(e.message);
      Alert.alert("Erro", e.message);
    } finally {
      if (isInitial) setInitialLoading(false);
    }
  }, [selectedCategories, selectedConditions, selectedAccessLevels]);

  // Função com debounce para fazer fetch após parar o movimento
  const debouncedFetchData = useCallback((region: typeof initialRegion, categories = selectedCategories, conditions = selectedConditions, accessLevels = selectedAccessLevels) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchData(region, false, categories, conditions, accessLevels);
    }, 100);
  }, [fetchData, selectedCategories, selectedConditions, selectedAccessLevels]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchData(currentRegion, true);
    })();
  }, []);

  // Cleanup do timeout quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Centra o mapa na localização do utilizador
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

  // Roda o mapa para norte
  const goToNorth = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera({ heading: 0 }, { duration: 500 });
    }
  }, []);

  // Atualiza região durante o movimento (sem fazer request)
  const handleRegionChange = useCallback((reg: typeof initialRegion) => {
    setCurrentRegion(reg);
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        setHeading(camera.heading || 0);
      });
    }
  }, []);
  
  // Agenda pesquisa com debounce quando termina o movimento
  const handleRegionChangeComplete = useCallback((reg: typeof initialRegion) => {
    setCurrentRegion(reg);
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        setHeading(camera.heading || 0);
      });
    }
    debouncedFetchData(reg, selectedCategories);
  }, [debouncedFetchData, selectedCategories]);

  // Função memoizada para abrir modal de detalhes
  const handleMarkerPress = useCallback((place: LocationType) => {
    setSelected(place);
    setModalVisible(true);
  }, []);

  // Função para aplicar filtros
  const applyFilters = useCallback(() => {
    setFilterModalVisible(false);
    fetchData(currentRegion, false, selectedCategories, selectedConditions, selectedAccessLevels);
  }, [fetchData, currentRegion, selectedCategories, selectedConditions, selectedAccessLevels]);

  // Função para limpar filtros
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSelectedAccessLevels([]);
    fetchData(currentRegion, false, [], [], []);
  }, [fetchData, currentRegion]);

  // Calcula distância entre dois pontos
  const dist = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  // Valor para escala
  const getScale = (d: number) => {
    const niceValues = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    for (let i = 0; i < niceValues.length; i++) {
      if (d <= niceValues[i]) return niceValues[i];
    }
    return niceValues[niceValues.length - 1];
  };

  // Calcula barra de escala
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

  // Barra de navegação
  const MapTabBar = ({ activeTab = 'map', onProfilePress }: { activeTab: string, onProfilePress: () => void }) => {
    const tabs = [
      { key: 'map', label: 'Mapa', icon: 'map' as keyof typeof Ionicons.glyphMap },
      { key: 'profile', label: 'Perfil', icon: 'person' as keyof typeof Ionicons.glyphMap },
    ];

    return (
      <View style={[mapTabBarStyles.container, { paddingBottom: insets.bottom + 10, backgroundColor: dynamicPalette.background }]}> 
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity 
              key={tab.key} 
              style={mapTabBarStyles.tab} 
              onPress={() => {
                if (tab.key === 'profile') {
                  onProfilePress();
                }
              }}
            >
              <View style={[
                mapTabBarStyles.tabIconWrapper,
                isActive ? mapTabBarStyles.tabIconActive : mapTabBarStyles.tabIconInactive
              ]}>
                <Ionicons
                  name={tab.icon}
                  size={28}
                  color={isActive ? dynamicPalette.primary : dynamicPalette.textSecondary}
                />
              </View>
              <Text style={[
                mapTabBarStyles.tabLabel,
                { color: isActive ? dynamicPalette.primary : dynamicPalette.textSecondary },
                isActive && mapTabBarStyles.tabLabelActive
              ]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Carregamento das fontes dos ícones
  const [fontsLoaded] = useFonts({
    'MaterialCommunityIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    'Entypo': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf'),
    'Ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  // Mostra loading apenas no arranque
  if (initialLoading || !fontsLoaded) {
    return <LoadingScreen />;
  }
  
  // Renderização principal do mapa e controlos
  return (
    <View style={[mapStyles.container, { backgroundColor: dynamicPalette.background }]}> 
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={mapStyles.map}
        initialRegion={initialRegion}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsMyLocationButton={false}
        showsUserLocation={false}
        showsCompass={false}
        minZoomLevel={7}
        maxZoomLevel={21}
        toolbarEnabled={false}
        rotateEnabled={true}
        mapType={mapType === 'satellite' ? 'satellite' : 'standard'}
        customMapStyle={
          mapType === 'dark' ? googleMapsDark :
          mapType === 'haunted' ? googleMapsHaunted :
          []
        }
        zoomEnabled={true}
      >
        {/* Marcadores dos locais */}
        {places.map(place => (
          <Marker
            key={place.id + backgroundColor}
            coordinate={{ latitude: place.lat, longitude: place.lon }}
            onPress={() => handleMarkerPress(place)}
          >
            <CustomMarker backgroundColor={backgroundColor} category={place.category} />
          </Marker>
        ))}
      </MapView>
      
      {/* Botão filtro de localizações */}
      <TouchableOpacity
        style={mapStyles.filterTopButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="#AAAAAA" />
      </TouchableOpacity>
      
      {/* Modal de filtro de localizações */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        onReset={clearFilters}
        selectedCategories={selectedCategories}
        onSelectCategory={(cat) => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
        selectedConditions={selectedConditions}
        onSelectCondition={(cond) => setSelectedConditions((prev) => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond])}
        selectedAccessLevels={selectedAccessLevels}
        onSelectAccessLevel={(level) => setSelectedAccessLevels((prev) => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level])}
      />

      {/* Botão de personalização do mapa */}
      <TouchableOpacity
        style={[mapStyles.button, mapStyles.filterButton]}
        onPress={() => setMapTypeModalVisible(true)}
      >
        <Ionicons name="map" size={24} color="#AAAAAA" />
      </TouchableOpacity>

      {/* Modal de personalização do mapa */}
      <MapTypeModal
        visible={mapTypeModalVisible}
        selectedType={mapType}
        onSelect={(type) => setMapType(type)}
        onClose={() => setMapTypeModalVisible(false)}
      />
      
      {/* Botão localização utilizador */}
      <TouchableOpacity
        style={[mapStyles.button, mapStyles.currentLocationButton]}
        onPress={goToUserLocation}
      >
        <Ionicons name="locate" size={32} color="#AAAAAA" />
      </TouchableOpacity>

      {/* Botão bússola*/}
      {heading !== 0 && (
        <TouchableOpacity
          style={[mapStyles.compassButton]}
          onPress={goToNorth}
        >
          <Entypo name="compass" size={26} color="#AAAAAA" style={{ transform: [{ rotate: `${135 - heading}deg` }] }} />
        </TouchableOpacity>
      )}

      {/* Barra de escala dinâmica */}
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

      {/* Modal de detalhes */}
      {selected && (
        <LocationDetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          location={selected}
        />
      )}

      {/* Barra de navegação */}
      <MapTabBar activeTab="map" onProfilePress={() => setProfileModalVisible(true)} />

      {/* UserProfile Modal */}
      <Modal
        visible={profileModalVisible}
        animationType="slide"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <UserProfile />
        <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
          <Text style={{ textAlign: 'center', margin: 10, color: 'blue' }}>Fechar</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default MapViewFullScreen;