import React from "react";
import { TouchableOpacity, Text, View, ImageBackground } from "react-native";

import { globalStyles } from "../../styles/global-styles";
import gameOverScreenBg from "../../assets/game-over-bg.png";
import SpriteSheet from "rn-sprite-sheet";
import CONSTANTS from "../../Constants";

export default function GameOverScreen({ score, highestScore, onRestartGame }) {
  
  let startAnimate = (type) => {
    gameover.play({
      type: type,
      fps: 10,
      loop: true,
    });
  }

  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={gameOverScreenBg}
        resizeMode="cover"
        style={globalStyles.imageBackground}
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
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 20,
          position: "absolute",
          top: 350,
        }}
      >
        HIGHEST SCORE: {highestScore}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          paddingHorizontal: 30,
          paddingVertical: 10,
          position: "absolute",
          top: 500,
        }}
        onPress={onRestartGame}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
          RESTART GAME
        </Text>
      </TouchableOpacity>      
      
      <View
        style={{
          position: 'absolute',
          top: CONSTANTS.WINDOW_HEIGHT / 2, 
          left: CONSTANTS.WINDOW_WIDTH / 2, 
        }}>
        <SpriteSheet
          ref={(ref) => (gameover = ref)}
          source={require('../../assets/game-elements/GameOverScreen.png')}
          columns={6}
          rows={22} 
          //width={50} // Width of each sprite
          height={50}
          onLoad={() => startAnimate('appear')}
          animations={{ 
            appear: (() => {
              const animationFrames = [];
              for (let i = 0; i <= 21; i++) {
                if (i % 2 === 0) {
                  animationFrames.push(i);
                }
              }
              return animationFrames;
            })()
          }}
        />      
      </View>

    </View>
  );
}
