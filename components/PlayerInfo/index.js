import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CONSTANTS from "../../Constants";
const { WINDOW_WIDTH, WINDOW_HEIGHT } = CONSTANTS;

export default function PlayerInfo({ score, lifeCount }) {
  let healthBar;
  switch (lifeCount) {
    case 1:
      healthBar = <View style={styles.heart} />;
      break;
    case 2:
      healthBar = (
        <>
          <View style={styles.heart} />
          <View style={styles.heart} />
        </>
      );
      break;
    case 3:
      healthBar = (
        <>
          <View style={styles.heart} />
          <View style={styles.heart} />
          <View style={styles.heart} />
        </>
      );
      break;
  }

  return (
    <View style={styles.playerInfo}>
      <View style={styles.health}>
        <Text>Life</Text>
        <View style={styles.healthBar}>{healthBar}</View>
      </View>
      <View style={styles.score}>
        <Text>Score</Text>
        <Text style={{ fontSize: 24 }}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    width: "80%",
    height: 75,
    position: "absolute",
    top: WINDOW_HEIGHT * 0.65 - 75,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  health: {
    flex: 1,
    alignItems: "flex-start",
    gap: 10,
  },
  healthBar: {
    flexDirection: "row",
    gap: 5,
  },
  heart: {
    width: 30,
    height: 30,
    backgroundColor: "salmon",
    borderRadius: 15,
  },
  score: {
    flex: 1,
    alignItems: "flex-end",
    gap: 10,
  },
});
