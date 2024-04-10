import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import Heart from "../ui/Heart";

export default function PlayerInfo({ score, lifeCount }) {
  let healthBar;
  switch (lifeCount) {
    case 1:
      healthBar = <Heart />;
      break;
    case 2:
      healthBar = (
        <>
          <Heart />
          <Heart />
        </>
      );
      break;
    case 3:
      healthBar = (
        <>
          <Heart />
          <Heart />
          <Heart />
        </>
      );
      break;
  }

  return (
    <View style={styles.playerInfo}>
      <View style={styles.health}>
        <Text style={styles.text}>HP</Text>
        <View style={styles.healthBar}>{healthBar}</View>
      </View>
      <View style={styles.score}>
        <Text style={styles.text}>SCORE</Text>
        <Text style={{ ...styles.text, fontSize: 24 }}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    width: "75%",
    height: 75,
    position: "absolute",
    top: Platform.OS === "ios" ? 475 : 425,
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
  score: {
    flex: 1,
    alignItems: "flex-end",
    gap: 10,
  },
  text: {
    color: "white",
  },
});
