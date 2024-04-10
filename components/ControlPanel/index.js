import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import ControlButton from "../ui/buttons/ControlButton";

export default function ControlPanel({
  gameEngine,
  lastDirection,
  setLastDirection,
}) {
  return (
    <View style={styles.controls}>
      <View style={styles.controlDirection}>
        <View style={styles.row}>
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
              setLastDirection(0);
            }}
            direction="up"
            action="direction"
          />
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
              setLastDirection(2);
            }}
            direction="right"
            action="direction"
          />
        </View>
        <View style={styles.row}>
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
              setLastDirection(6);
            }}
            direction="left"
            action="direction"
          />
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
              setLastDirection(4);
            }}
            direction="down"
            action="direction"
          />
        </View>
      </View>
      <View style={styles.controlShoot}>
        <ControlButton
          onPress={() => {
            gameEngine.dispatch({ type: "shoot", lastDirection });
          }}
          text="Shoot"
          action="shoot"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    width: "100%",
    height: "50%",
    padding: 30,
    position: "absolute",
    top: Platform.OS === "ios" ? 620 : 560,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    backgroundColor: "#301e0b",
  },
  controlDirection: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    gap: -10,
    transform: "rotate(45deg)",
  },
  controlShoot: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(45deg)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: -10,
  },
});
