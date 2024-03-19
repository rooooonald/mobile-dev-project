import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#301e0b",
  },
  gameContainer: {
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
  fullScreen: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 100,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
