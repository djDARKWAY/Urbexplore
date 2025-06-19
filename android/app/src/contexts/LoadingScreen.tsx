import React, { useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { loadingScreenStyles } from "../styles/layout/mapView/loadingScreen.style";
import { palette } from "../styles/palette";
import { useLoadingAnimations } from "../styles/animations/loadingAnimations";
import { AnimatedBackground } from "../styles/animations/animatedBackground";
import { loadingJokes } from "./texts/loadingJokes";
import { loadingShorts } from "./texts/loadingShorts";

const LoadingScreen = () => {
  const { scaleAnim, opacityAnim, rotate, orbit } = useLoadingAnimations();
  const [shortIndex] = useState(() => Math.floor(Math.random() * loadingShorts.length));
  const [jokeIndex, setJokeIndex] = useState(0);

  React.useEffect(() => {
    const jokeInterval = setInterval(() => {
      setJokeIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * loadingJokes.length);
        } while (next === prev && loadingJokes.length > 1);
        return next;
      });
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
