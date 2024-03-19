import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

import { globalStyles } from "../../styles/global-styles";
import welcomeScreenBg from "../../assets/welcome-screen-bg.png";

export default function WelcomeScreen({ onStartGame }) {
  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={welcomeScreenBg}
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
        TANK ATTACK
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          paddingHorizontal: 30,
          paddingVertical: 10,
          position: "absolute",
          top: 500,
        }}
        onPress={onStartGame}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
          START GAME
        </Text>
      </TouchableOpacity>
    </View>
  );
}
