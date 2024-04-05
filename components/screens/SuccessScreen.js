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

import CONSTANTS from "../../Constants";

import { globalStyles } from "../../styles/global-styles";
import successScreenBg from "../../assets/backgrounds/success-bg.webp";

export default function SuccessScreen({ onRestartGame }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      delay: 500,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  let successGuy = null;
  let medal = null;

  let startAnimateGuy = (type) => {
    successGuy.play({
      type: type,
      fps: 8,
      loop: true,
    });
  };

  let startAnimateMedal = (type) => {
    medal.play({
      type: type,
      fps: 10,
      loop: true,
    });
  };

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
          top: CONSTANTS.WINDOW_HEIGHT / 4,
        }}
      >
        YOU WIN
      </Text>

      <Animated.View
        style={{
          position: "absolute",
          top: CONSTANTS.WINDOW_HEIGHT / 3,
          left: CONSTANTS.WINDOW_WIDTH / 2 - 125,
          opacity,
        }}
      >
        <SpriteSheet
          ref={(ref) => (successGuy = ref)}
          source={require("../../assets/screen-elements/success-guy.png")}
          columns={11}
          rows={1}
          height={150}
          onLoad={() => startAnimateGuy("appear")}
          animations={{
            appear: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: CONSTANTS.WINDOW_HEIGHT / 3,
          left: CONSTANTS.WINDOW_WIDTH / 2,
          opacity,
        }}
      >
        <SpriteSheet
          ref={(ref) => (medal = ref)}
          source={require("../../assets/screen-elements/achievements.png")}
          columns={8}
          rows={9}
          height={150}
          onLoad={() => startAnimateMedal("appear")}
          animations={{
            appear: [0, 1, 2, 3],
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
    top: (CONSTANTS.WINDOW_HEIGHT / 3) * 2,
  },
});
