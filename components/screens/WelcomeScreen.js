import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";

import { globalStyles } from "../../styles/global-styles";
import welcomeScreenBg from "../../assets/backgrounds/welcome-bg.webp";
import logo from "../../assets/logo.png";

export default function WelcomeScreen({ onStartGame }) {
  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={welcomeScreenBg}
        resizeMode="cover"
        style={globalStyles.imageBackground}
      />
      <Image
        source={logo}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          top: 200,
        }}
      />
      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={onStartGame}
      >
        <Text style={globalStyles.buttonText}>START GAME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    top: 500,
  },
});
