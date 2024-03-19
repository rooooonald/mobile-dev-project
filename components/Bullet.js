import { View } from "react-native";

const Bullet = (props) => {
  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
        position: "absolute",
        display: props.visibility,
      }}
    ></View>
  );
};

export default Bullet;
