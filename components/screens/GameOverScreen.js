import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { globalStyles } from "../../styles/global-styles";
import gameOverScreenBg from "../../assets/backgrounds/game-over-bg.webp";

export default function GameOverScreen({ score, highestScore, onRestartGame }) {
  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={gameOverScreenBg}
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
        GAME OVER
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 20,
          position: "absolute",
          top: 300,
        }}
      >
        YOUR SCORE: {score}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 20,
          position: "absolute",
          top: 350,
        }}
      >
        HIGHEST SCORE: {highestScore}
      </Text>
      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={onRestartGame}
      >
        <Text style={globalStyles.buttonText}>RESTART</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    top: 500,
  },
});
