import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useEffect, useState } from "react";
import Physics from "./Physics";
export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [score, setScore] = useState(0);
  const [lifeCount, setLifeCount] = useState(3);

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}
        onEvent={(e) => {
          switch (e.type) {
            case "score":
              setScore((prev) => prev + 1);
              break;
            case "crash":
            case "hit":
              setLifeCount((prev) => prev - 1);
              break;
          }
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
              setLastDirection(0);
            }}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
              setLastDirection(6);
            }}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Left</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.stop]}
            onPress={() => {
              gameEngine.dispatch({ type: "shoot", lastDirection });
            }}
          >
            <View style={styles.control}>
              <Text style={[styles.centerText]}>Shoot</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
              setLastDirection(2);
            }}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Right</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
              setLastDirection(4);
            }}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Down</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.lifeCount}>Life: {lifeCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  // add additional styles here
  controls: {
    position: "absolute",
    top: 500,
    flexDirection: "column",
    gap: 10,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20B2AA",
  },
  stop: {
    backgroundColor: "red",
  },
  centerText: {
    color: "white",
  },
  score: {
    position: "absolute",
    top: 700,
    opacity: 0.3,
  },

  lifeCount: {
    position: "absolute",
    top: 800,
    opacity: 0.3,
  },
});
