import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";

import { StatusBar } from "expo-status-bar";

import welcomeScreenBg from "./assets/welcome-screen-bg.png";
import gameOverScreenBg from "./assets/game-over-bg.png";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [lastDirection, setLastDirection] = useState();
  const [score, setScore] = useState(0);
  const [lifeCount, setLifeCount] = useState(3);

  useEffect(() => {
    if (lifeCount <= 0) {
      setIsGameOver(true);
      setIsRunning(false);
      gameEngine.swap(entities()); // Remove all the previous added entities like bullets
    }
  }, [lifeCount]);

  useEffect(() => {
    if (!isGameOver) {
      setLifeCount(3);
      setScore(0);
    }
  }, [isGameOver]);

  const isWelcome = !isRunning && !isGameOver;

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={isRunning}
        onEvent={(e) => {
          switch (e.type) {
            case "score":
              setScore((prev) => prev + 1);
              break;
            case "crash":
            case "hit":
              setLifeCount((prev) => prev - 1);
              break;
            case "game_over":
              setIsRunning(false);
              break;
          }
        }}
        style={styles.gameContainer}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {isWelcome && (
        <View style={styles.welcomeScreen}>
          <ImageBackground
            source={welcomeScreenBg}
            resizeMode="cover"
            style={styles.screenBg}
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
            THE TANK
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
              position: "absolute",
              top: 500,
            }}
            onPress={() => {
              setIsRunning(true);
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isGameOver && (
        <View style={styles.gameOverScreen}>
          <ImageBackground
            source={gameOverScreenBg}
            resizeMode="cover"
            style={styles.screenBg}
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
            GAME OVER
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
            onPress={() => {
              setIsGameOver(false);
              setIsRunning(true);
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
              RESTART GAME
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
              setLastDirection(0);
            }}
          >
            <Text style={styles.buttonText}>Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
              setLastDirection(6);
            }}
          >
            <Text style={styles.buttonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.stopButton]}
            onPress={() => {
              gameEngine.dispatch({ type: "shoot", lastDirection });
            }}
          >
            <Text style={[styles.buttonText]}>Shoot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
              setLastDirection(2);
            }}
          >
            <Text style={styles.buttonText}>Right</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
              setLastDirection(4);
            }}
          >
            <Text style={styles.buttonText}>Down</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.lifeCount}>Life: {lifeCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  welcomeScreen: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 100,
  },
  gameOverScreen: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 100,
  },
  screenBg: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.55,
  },
  controls: {
    position: "absolute",
    bottom: 100,
    flexDirection: "column",
    gap: 10,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  controlButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20B2AA",
    borderRadius: "50%",
  },
  stopButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
  },
  playerInfo: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
