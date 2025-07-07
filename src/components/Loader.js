import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loader = () => {
  const imageOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loopAnimation();
  }, [imageOpacity]);

  const loopAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => loopAnimation());
  };

  return (
    <LinearGradient colors={['#D09725', '#77591E']} style={styles.container}>
      <Animated.Image
        source={require('../assets/images/loader.png')}
        style={{ opacity: imageOpacity }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
