import React from "react";
import { Image } from "react-native";

import heartImg from "../../assets/ui/heart.png";

export default function Heart() {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
      }}
      source={heartImg}
    />
  );
}
