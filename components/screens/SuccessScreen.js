import React, { useEffect, useRef, useState } from "react";
import SpriteSheet from "rn-sprite-sheet";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Animated,
  StyleSheet,
} from "react-native";

import { globalStyles } from "../../styles/global-styles";
import successScreenBg from "../../assets/backgrounds/success-bg.webp";

let startAnimate = (type) => {
  successGuy.play({
    type: type,
    fps: 8,
    loop: true,
  });
};

export default function SuccessScreen({ onRestartGame }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={successScreenBg}
        resizeMode="cover"
        style={[globalStyles.imageBackground, { opacity: 0.5 }]}
      />

      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 45,
          position: "absolute",
          top: 200,
        }}
      >
        YOU WIN
      </Text>

      <Animated.View
        style={{
          position: "absolute",
          opacity,
        }}
      >
        <SpriteSheet
          ref={(ref) => (successGuy = ref)}
          source={require("../../assets/screen-elements/success-guy.png")}
          columns={11}
          rows={1}
          height={50}
          onLoad={() => startAnimate("appear")}
          animations={{
            appear: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          }}
        />
      </Animated.View>

      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={onRestartGame}
      >
        <Text style={globalStyles.buttonText}>RESTART GAME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    top: 450,
  },
});
