import { Animated, Easing, Dimensions } from 'react-native';

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
