import React from "react";
import { TouchableOpacity, Text, View, ImageBackground } from "react-native";

import { globalStyles } from "../../styles/global-styles";
import successScreenBg from "../../assets/success-bg.jpg";

export default function SuccessScreen({ score, onRestartGame }) {
  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={successScreenBg}
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
        You Win!
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
