import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import CONSTANTS from "../../Constants";
import ControlButton from "../ui/buttons/ControlButton";

const { WINDOW_WIDTH, WINDOW_HEIGHT } = CONSTANTS;

export default function ControlPanel({ gameEngine }) {
  const [lastDirection, setLastDirection] = useState();

  return (
    <View style={styles.controls}>
      <View style={styles.controlDirection}>
        <View style={styles.row}>
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
              setLastDirection(0);
            }}
            text="Up"
            action="direction"
          />
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
              setLastDirection(2);
            }}
            text="Right"
            action="direction"
          />
        </View>
        <View style={styles.row}>
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
              setLastDirection(6);
            }}
            text="Left"
            action="direction"
          />
          <ControlButton
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
              setLastDirection(4);
            }}
            text="Down"
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
    position: "absolute",
    bottom: WINDOW_HEIGHT * 0.1,
    flexDirection: "row",
    gap: -40,
  },
  controlDirection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    transform: "rotate(45deg)",
  },
  controlShoot: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(45deg)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
