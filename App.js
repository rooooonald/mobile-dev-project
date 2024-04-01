import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";

import WelcomeScreen from "./components/screens/WelcomeScreen";
import GameOverScreen from "./components/screens/GameOverScreen";
import SuccessScreen from "./components/screens/SuccessScreen";
import ControlPanel from "./components/ControlPanel";
import PlayerInfo from "./components/PlayerInfo";

import { globalStyles } from "./styles/global-styles";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [lifeCount, setLifeCount] = useState(3);
  const [lastDirection, setLastDirection] = useState(0);

  useEffect(() => {
    if (lifeCount <= 0) {
      const timer = setTimeout(gameEndedHandler, 300);

      return () => clearTimeout(timer);
    }
  }, [lifeCount]);

  useEffect(() => {
    if (score >= 1) {
      setIsSuccess(true);
      gameEndedHandler();
    }
  }, [score]);

  const gameEndedHandler = () => {
    setIsRunning(false);
    setIsGameOver(true);
    score > highestScore && setHighestScore(score);
    gameEngine.swap(entities()); // Remove all the previous added entities like bullets
  };

  const gameRestartHandler = () => {
    setIsRunning(true);
    setIsGameOver(false);
    setIsSuccess(false);
    setLastDirection(0);
    setLifeCount(3);
    setScore(0);
  };

  const isWelcome = !isRunning && !isGameOver && !isSuccess;

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

      {isGameOver && !isSuccess && (
        <GameOverScreen
          score={score}
          highestScore={highestScore}
          onRestartGame={gameRestartHandler}
        />
      )}

      {isGameOver && isSuccess && (
        <SuccessScreen onRestartGame={gameRestartHandler} />
      )}

      <PlayerInfo score={score} lifeCount={lifeCount} />
      <ControlPanel
        gameEngine={gameEngine}
        lastDirection={lastDirection}
        setLastDirection={setLastDirection}
      />
    </SafeAreaView>
  );
}
