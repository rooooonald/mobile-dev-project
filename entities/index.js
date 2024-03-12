import Matter from "matter-js";
import Constants from "../Constants";

import Boundary from "../components/Boundary";
import Player from "../components/Player";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },

    // Player
    Player: Player(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH / 2, y: 190 },
      { width: 20, height: 20 },
      { isStatic: false, label: "Player" }
    ),

    // Boundaries
    BoundaryTop: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),

    BoundaryLeft: Boundary(
      world,
      "red",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    BoundaryRight: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    BoundaryCenter: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_WIDTH },
      { height: 20, width: Constants.WINDOW_WIDTH }
    ),

    BoundaryBottom: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),
  };
};
