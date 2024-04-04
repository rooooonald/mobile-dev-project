import React, { useEffect, useRef } from "react";
import { ImageBackground, Animated, StyleSheet } from "react-native";

import CONSTANTS from "../../Constants";

import ExplodingTank from "../ui/ExplodingTank";

import { globalStyles } from "../../styles/global-styles";
import successScreenBg from "../../assets/backgrounds/game-bg.webp";
import alignImg from "../../assets/screen-elements/alien.webp";
import dangerSignImg from "../../assets/screen-elements/danger.webp";

export default function SplashScreen({ onHide }) {
  const opacityPage = useRef(new Animated.Value(1)).current; // This ref object's current property is initialized as the given argument and persists throughout the component lifecycle.
  const opacityDangerSign = useRef(new Animated.Value(0)).current;
  const scalePage = useRef(new Animated.Value(2)).current;
  const scaleAlien = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scalePage, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityDangerSign, {
      toValue: 1,
      delay: 1000,
      duration: 250,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAlien, {
      toValue: 3,
      duration: 1000,
      delay: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacityPage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onHide && onHide(); // Callback to notify that the splash screen has been hidden
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        ...globalStyles.fullScreen,
        zIndex: 101,
        opacity: opacityPage,
        transform: [{ scale: scalePage }],
      }}
    >
      <ImageBackground
        source={successScreenBg}
        resizeMode="cover"
        style={{ ...globalStyles.imageBackground, opacity: 0.85 }}
      />

      <ExplodingTank left={120} top={200} />
      <ExplodingTank left={250} top={150} />
      <ExplodingTank left={170} top={300} />
      <ExplodingTank left={180} top={450} />
      <ExplodingTank left={100} top={550} />
      <ExplodingTank left={325} top={250} />
      <ExplodingTank left={155} top={350} />
      <ExplodingTank left={80} top={400} />

      <Animated.Image
        style={{
          ...styles.dangerSignContainer,
          opacity: opacityDangerSign,
        }}
        source={dangerSignImg}
      />
      <Animated.Image
        style={{
          ...styles.alien,
          transform: [{ scale: scaleAlien }, { rotate: "10deg" }],
          top: 200,
          left: CONSTANTS.WINDOW_WIDTH / 2 - 50,
        }}
        source={alignImg}
      />
      <Animated.Image
        style={{
          ...styles.alien,
          transform: [{ scale: scaleAlien }, { rotate: "-20deg" }],
          top: 400,
          left: CONSTANTS.WINDOW_WIDTH / 2 + 50,
        }}
        source={alignImg}
      />
      <Animated.Image
        style={{
          ...styles.alien,
          transform: [{ scale: scaleAlien }, { rotate: "30deg" }],
          top: 600,
          left: CONSTANTS.WINDOW_WIDTH / 2 - 50,
        }}
        source={alignImg}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dangerSignContainer: {
    position: "absolute",
    top: 200,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "65deg" }],
  },
  alien: {
    width: 50,
    height: 50,
    position: "absolute",
  },
});
