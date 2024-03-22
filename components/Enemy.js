import { View } from "react-native";

export const Enemy = (props) => {
  const width = props.radius * 2;
  const height = props.radius * 2;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        width,
        height,
        borderRadius: props.radius,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
        position: "absolute",
      }}
    ></View>
  );
};

// export default (world, color, pos, size, extraOptions) => {
//   const enemy = Matter.Bodies.circle(pos.x, pos.y, size.width, size.height, {
//     label: extraOptions.label,
//     friction: 0,
//     frictionAir: 0,
//     restitution: 0,
//     isStatic: extraOptions.isStatic || false,
//   });
//   Matter.World.add(world, enemy);
//   return { body: enemy, color, pos, size, extraOptions, renderer: <Enemy /> };
// };
