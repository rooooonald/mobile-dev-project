import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";

import GameOverScreen from "./components/screens/GameOverScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import ControlPanel from "./components/ControlPanel";
import PlayerInfo from "./components/PlayerInfo";

import { globalStyles } from "./styles/global-styles";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lifeCount, setLifeCount] = useState(3);

  useEffect(() => {
    if (lifeCount <= 0) {
      setIsGameOver(true);
      setIsRunning(false);
      score > highestScore && setHighestScore(score);
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
    <SafeAreaView style={globalStyles.container}>
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
        style={globalStyles.gameContainer}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {isWelcome && <WelcomeScreen onStartGame={() => setIsRunning(true)} />}

      {isGameOver && (
        <GameOverScreen
          score={score}
          highestScore={highestScore}
          onRestartGame={() => {
            setIsGameOver(false);
            setIsRunning(true);
          }}
        />
      )}

      <PlayerInfo score={score} lifeCount={lifeCount} />
      <ControlPanel gameEngine={gameEngine} />
    </SafeAreaView>
  );
}
