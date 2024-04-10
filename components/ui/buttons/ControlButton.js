import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

import buttonArrowImg from "../../../assets/ui/buttonArrow.png";
import buttonShotImg from "../../../assets/ui/buttonShot.png";

export default function ControlButton({ onPress, direction, action }) {
  const isDirectionBtn = action === "direction";

  let size = isDirectionBtn
    ? { width: 75, height: 75 }
    : { width: 100, height: 100 };
  return (
    <TouchableOpacity style={[styles.button, size]} onPress={onPress}>
      <Image
        style={[
          styles.buttonImg,
          isDirectionBtn ? styles[direction] : styles.shoot,
        ]}
        source={isDirectionBtn ? buttonArrowImg : buttonShotImg}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonImg: {
    width: "100%",
    height: "100%",
  },
  left: {
    transform: [{ rotate: "225deg" }],
  },
  right: {
    transform: [{ rotate: "45deg" }],
  },
  up: {
    transform: [{ rotate: "315deg" }],
  },
  down: {
    transform: [{ rotate: "135deg" }],
  },
  shoot: {
    transform: [{ rotate: "315deg" }],
  },
});
