import { useEffect } from "react";
import { View } from "react-native";

import SpriteSheet from "rn-sprite-sheet";

export const Enemy = (props) => {
  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  let enemy = null;

  let initiateEnemy = () => {
    enemy.play({
      type: props.animOptions.animType,
      loop: true,
    });
  };

  useEffect(() => {
    enemy.play({
      type: props.animOptions.animType,
      loop: false,
      fps: 24,
    });
  }, [props.animOptions.animType]);

  return (
    <View
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        position: "absolute",
      }}
    >
      <SpriteSheet
        ref={(ref) => (enemy = ref)}
        source={require("../assets/game-elements/enemy.png")}
        columns={5}
        rows={2}
        height={height}
        onLoad={() => initiateEnemy()}
        imageStyle={{ marginTop: 0 }}
        animations={{
          explode: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          moving: [0],
        }}
      />
    </View>
  );
};
