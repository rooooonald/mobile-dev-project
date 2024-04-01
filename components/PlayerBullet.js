import { Image, StyleSheet, View } from "react-native";

import playerBulletImg from "../assets/game-elements/playerBullet.png";

const PlayerBullet = (props) => {
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
        position: "absolute",
        transform: [{ rotate: `${props.bulletAngle}deg` }],
      }}
    >
      <Image style={styles.bullet} source={playerBulletImg} />
    </View>
  );
};

export default PlayerBullet;

const styles = StyleSheet.create({
  bullet: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
