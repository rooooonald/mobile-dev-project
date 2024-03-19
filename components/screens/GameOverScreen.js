import React from "react";
import { TouchableOpacity, Text, View, ImageBackground } from "react-native";

import { globalStyles } from "../../styles/global-styles";
import gameOverScreenBg from "../../assets/game-over-bg.png";

export default function GameOverScreen({ score, highestScore, onRestartGame }) {
  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={gameOverScreenBg}
        resizeMode="cover"
        style={globalStyles.imageBackground}
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
        style={{
          backgroundColor: "black",
          paddingHorizontal: 30,
          paddingVertical: 10,
          position: "absolute",
          top: 500,
        }}
        onPress={onRestartGame}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
          RESTART GAME
        </Text>
      </TouchableOpacity>
    </View>
  );
}
