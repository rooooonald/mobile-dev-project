import Matter from "matter-js";
import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";

import leftBoundaryImg from "../assets/boundaries/left.png";
import rightBoundaryImg from "../assets/boundaries/right.png";
import TopBoundaryImg from "../assets/boundaries/top.png";
import BottomBoundaryImg from "../assets/boundaries/bottom.png";
import { globalStyles } from "../styles/global-styles";

const Boundary = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  let borderImg, bgOffset;
  switch (props.label) {
    case "BoundaryLeft":
      borderImg = leftBoundaryImg;
      bgOffset = "translateX(10px)";
      break;
    case "BoundaryRight":
      borderImg = rightBoundaryImg;
      bgOffset = "translateX(-10px)";
      break;
    case "BoundaryTop":
      borderImg = TopBoundaryImg;
      bgOffset = "translateY(15px)";
      break;
    case "BoundaryCenter":
      borderImg = BottomBoundaryImg;
      bgOffset = "translateY(-10px)";
      break;
  }

  return (
    <View
      style={{
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color,
        zIndex: 50,
      }}
    >
      <ImageBackground
        source={borderImg}
        resizeMode="stretch"
        style={[globalStyles.imageBackground, { transform: bgOffset }]}
      />
    </View>
  );
};

export default (world, color, pos, size, extraOptions) => {
  const boundary = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      ...extraOptions,
      isStatic: true,
      restitution: 0,
    }
  );
  Matter.World.add(world, boundary);
  return {
    body: boundary,
    color,
    pos,
    size,
    label: extraOptions.label,
    renderer: <Boundary />,
  };
};
