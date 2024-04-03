import React from "react";
import { TouchableOpacity, Text, View, ImageBackground, TouchableWithoutFeedback } from "react-native";

import { globalStyles } from "../../styles/global-styles";
import successScreenBg from "../../assets/success-bg.jpg";
import SpriteSheet from "rn-sprite-sheet";
import CONSTANTS from "../../Constants";

export default function SuccessScreen({ onRestartGame }) {

  let startAnimate = (type) => {
    //let winGuy = null;
    winGuy.play({
      type: type,
      fps: 10,
      loop: true,
    });
    medal.play({
      type:type,
      fps:10,
      loop: true,
    });
  }

  return (
    <View style={globalStyles.fullScreen}>
      <ImageBackground
        source={successScreenBg}
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
        You Win!
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
          top: CONSTANTS.WINDOW_HEIGHT / 2 + 200, 
          left: CONSTANTS.WINDOW_WIDTH / 2 - 160, 
        }}>
        <SpriteSheet
          ref={(ref) => (winGuy = ref)}
          source={require('../../assets/game-elements/winGuy.png')}
          columns={11}
          rows={1} 
          //width={50} // Width of each sprite
          height={150}
          frameHeight={150}
          frameWidth={40} 
          offsetX={0}
          onLoad={() => startAnimate('appear')}
          animations={{ 
            appear: [2, 3, 4, 5, 6, 7, 8, 9, 10], 
          }}
        />      
      </View>

      <View
        style={{
          position: 'absolute',
          top: CONSTANTS.WINDOW_HEIGHT / 2 + 200, 
          left: CONSTANTS.WINDOW_WIDTH / 2 , 
        }}>
        <SpriteSheet
          ref={(ref) => (medal = ref)}
          source={require('../../assets/game-elements/achievements.png')}
          columns={8}
          rows={9} 
          //width={50} // Width of each sprite
          height={150}
          frameHeight={150}
          frameWidth={40} 
          offsetX={0}
          onLoad={() => startAnimate('appear')}
          animations={{ 
            appear: [0, 1, 2, 3], 
          }}
        />      
      </View>    

    </View>
  );
}
