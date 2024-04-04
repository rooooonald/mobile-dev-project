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
    zIndex: -1,
  },
  button: {
    width: 200,
    height: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
  },
});
