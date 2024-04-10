import { Image, StyleSheet, View } from "react-native";

import enemyBulletImg from "../assets/game-elements/enemyBullet.png";

const EnemyBullet = (props) => {
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
        position: "absolute",
      }}
    >
      <Image style={styles.bullet} source={enemyBulletImg} />
    </View>
  );
};

export default EnemyBullet;

const styles = StyleSheet.create({
  bullet: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
