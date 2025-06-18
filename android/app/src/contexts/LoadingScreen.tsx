import React, { useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { loadingScreenStyles } from "../styles/layout/mapView/loadingScreen.style";
import { palette } from "../styles/palette";
import { useLoadingAnimations } from "../styles/animations/loadingAnimations";
import { AnimatedBackground } from "../styles/animations/animatedBackground";

const loadingShorts = [
  "A carregar...",
  "A preparar...",
  "A explorar...",
  "A descobrir...",
  "A desenhar...",
  "A verificar...",
  "A aquecer...",
  "A procurar...",
  "A abrir portões...",
];

const loadingJokes = [
  "Prometemos que não é por causa do Wi-Fi do vizinho!",
  "E a fazer figas!",
  "Até o elevador ficou sem paciência!",
  "O programador foi buscar um pastel de nata",
  "A ligar os satélites... quase lá!",
  "A convencer os servidores a colaborarem.",
  "A procurar o botão secreto de velocidade.",
  "A pedir ajuda ao Google Maps.",
  "A desenhar mapas com lápis e papel...",
  "A perguntar ao GPS: “Já chegámos?”",
  "A desenhar rotas com uma caneta bic!",
];

const LoadingScreen = () => {
  const { scaleAnim, opacityAnim, rotate, orbit } = useLoadingAnimations();
  const [shortIndex] = useState(() => Math.floor(Math.random() * loadingShorts.length));
  const [jokeIndex, setJokeIndex] = useState(0);

  React.useEffect(() => {
    const jokeInterval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % loadingJokes.length);
    }, 2500);
    return () => clearInterval(jokeInterval);
  }, []);

  return (
    <View style={loadingScreenStyles.container}>
      <View style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
      }}>
        <AnimatedBackground />
      </View>
      <View style={[loadingScreenStyles.card, { zIndex: 1 }]}> 
        <View style={loadingScreenStyles.loadingCircleWrapper}>
          <Animated.View
            style={[
              loadingScreenStyles.loadingCircle,
              {
                transform: [{ scale: scaleAnim }, { rotate }],
                opacity: opacityAnim,
              },
            ]}
          >
            <View style={loadingScreenStyles.loadingDot} />
            <Animated.View
              style={{
                position: 'absolute',
                left: 30,
                top: 0,
                transform: [
                  { rotate: orbit },
                  { translateX: 10 },
                ],
              }}
            >
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: palette.loadingText }} />
            </Animated.View>
          </Animated.View>
        </View>
        <Text style={[loadingScreenStyles.text, { color: palette.loadingText }]}> 
          {loadingShorts[shortIndex]}
        </Text>
        <Text style={[loadingScreenStyles.subtext, { color: palette.loadingSecondaryText }]}> 
          {loadingJokes[jokeIndex]}
        </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
