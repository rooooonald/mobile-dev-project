import { View } from "react-native";
import Matter from "matter-js";

import SpriteSheet from "rn-sprite-sheet";
import { useEffect } from "react";

export const Player = (props) => {
  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  let tank = null;

  let initiateTank = () => {
    tank.play({
      type: props.animOptions.animType,
      loop: true,
    });
  };

  useEffect(() => {
    tank.play({
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
        transform: `rotate(${props.body.angle}rad)`,
      }}
    >
      <SpriteSheet
        ref={(ref) => (tank = ref)}
        source={require("../assets/game-elements/tank.png")}
        columns={5}
        rows={2}
        height={height}
        onLoad={() => initiateTank()}
        imageStyle={{ marginTop: 0 }}
        animations={{
          explode: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          moving: [0],
        }}
      />
    </View>
  );
};

export default (world, color, pos, size, extraOptions, animOptions) => {
  const player = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label,
      friction: 0,
      frictionAir: 0,
      restitution: 0,
      isStatic: extraOptions.isStatic || false,
      angularVelocity: 0,
    },
    animOptions
  );
  Matter.World.add(world, player);
  return {
    body: player,
    color,
    pos,
    size,
    extraOptions,
    animOptions,
    renderer: <Player />,
  };
};
