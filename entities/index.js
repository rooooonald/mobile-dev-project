import Matter from "matter-js";

import CONSTANTS from "../Constants";
import Boundary from "../components/Boundary";
import Player from "../components/Player";

const { WINDOW_WIDTH, WINDOW_HEIGHT } = CONSTANTS;

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
      { x: WINDOW_WIDTH / 2, y: 190 },
      { width: 20, height: 20 },
      { isStatic: false, label: "Player" }
    ),

    // Boundaries
    BoundaryTop: Boundary(
      world,
      "transparent",
      { x: WINDOW_WIDTH / 2, y: 0 },
      { height: WINDOW_HEIGHT * 0.1, width: WINDOW_WIDTH },
      { label: "BoundaryTop" }
    ),

    BoundaryLeft: Boundary(
      world,
      "transparent",
      { x: 0, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: WINDOW_WIDTH * 0.1 },
      { label: "BoundaryLeft" }
    ),

    BoundaryRight: Boundary(
      world,
      "transparent",
      { x: WINDOW_WIDTH, y: WINDOW_HEIGHT / 2 },
      { height: WINDOW_HEIGHT, width: WINDOW_WIDTH * 0.1 },
      { label: "BoundaryRight" }
    ),

    BoundaryCenter: Boundary(
      world,
      "transparent",
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT * 0.6 },
      { height: 20, width: WINDOW_WIDTH },
      { label: "BoundaryCenter" }
    ),
  };
};
