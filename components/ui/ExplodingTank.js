import { View } from "react-native";

import SpriteSheet from "rn-sprite-sheet";

export const ExplodingTank = ({ left, top }) => {
  let tank = null;
  let startAnimate = () => {
    tank.play({
      type: "explode",
      fps: 24,
      loop: true,
    });
  };
  return (
    <View
      style={{
        left,
        top,
        position: "absolute",
      }}
    >
      <SpriteSheet
        ref={(ref) => (tank = ref)}
        source={require("../../assets/game-elements/tank.png")}
        columns={5}
        rows={2}
        height={50}
        onLoad={() => startAnimate()}
        imageStyle={{ marginTop: 0 }}
        animations={{
          explode: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        }}
      />
    </View>
  );
};

export default ExplodingTank;
