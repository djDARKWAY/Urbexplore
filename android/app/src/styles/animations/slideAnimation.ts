import { Animated, Easing, Dimensions } from 'react-native';
import { useRef, useEffect } from "react";

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export function animateModalIn(slideAnim: Animated.Value, dragY: Animated.Value) {
  slideAnim.setValue(SCREEN_HEIGHT);
  dragY.setValue(0);
  return Animated.timing(slideAnim, {
    toValue: 0,
    duration: 350,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });
}

export function animateModalOut(slideAnim: Animated.Value, dragY: Animated.Value, onEnd?: () => void) {
  Animated.parallel([
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(dragY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    })
  ]).start(() => {
    dragY.setValue(0);
    if (onEnd) onEnd();
  });
}

export function animateModalGestureOut(slideAnim: Animated.Value, dragY: Animated.Value, onEnd?: () => void) {
  animateModalOut(slideAnim, dragY, onEnd);
}

export function useSlideAnimation(visible: boolean, duration = 350, initialValue = SCREEN_HEIGHT) {
  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(initialValue);
    }
  }, [visible, duration, initialValue, slideAnim]);

  return slideAnim;
}
