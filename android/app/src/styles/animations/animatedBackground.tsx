import React, { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { palette } from "../palette";

const { width, height } = Dimensions.get("window");
const CIRCLE_COUNT = 8;
const COLORS = [
  palette.loadingCircle,
  palette.loadingDot,
  palette.accent,
  palette.badgeEasy,
  palette.badgeMedium,
  palette.badgeHard,
  palette.loadingText,
  palette.loadingSecondaryText,
];

export const AnimatedBackground = () => {
  const anims = Array.from({ length: CIRCLE_COUNT }, () => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    anims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 900 + i * 60,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 900 + i * 60,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <>
      {anims.map((anim, i) => {
        const size = 60 + i * 18;
        const spread = 145;
        const left = (width / 2) - size / 2 + Math.sin((i / CIRCLE_COUNT) * Math.PI * 2) * spread;
        const top = (height / 2) - size / 2 + Math.cos((i / CIRCLE_COUNT) * Math.PI * 2) * spread;
        return (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              left,
              top,
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: COLORS[i % COLORS.length],
              opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.13, 0.23] }),
              transform: [
                { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.93, 1.13] }) },
              ],
              zIndex: -1,
            }}
          />
        );
      })}
    </>
  );
};
