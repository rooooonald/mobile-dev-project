import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";

export default function ControlButton({ onPress, text, action }) {
  let size =
    action === "direction"
      ? { width: 60, height: 60 }
      : { width: 100, height: 100 };

  return (
    <TouchableOpacity style={[styles.button, size]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20B2AA",
  },
  buttonText: {
    color: "white",
  },
});
