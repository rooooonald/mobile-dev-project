import Matter from "matter-js";

import CONSTANTS from "../Constants";
import Boundary from "../components/Boundary";
import Player from "../components/Player";

const { WINDOW_WIDTH } = CONSTANTS;

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

    BoundaryLeft: Boundary(
      world,
      "#301e0b",
      { x: 15, y: 250 },
      { height: 500, width: 30 },
      { label: "BoundaryLeft" }
    ),

    BoundaryRight: Boundary(
      world,
      "#301e0b",
      { x: WINDOW_WIDTH - 15, y: 250 },
      { height: 500, width: 30 },
      { label: "BoundaryRight" }
    ),

    BoundaryTop: Boundary(
      world,
      "#301e0b",
      { x: WINDOW_WIDTH / 2, y: 40 },
      { height: 80, width: WINDOW_WIDTH },
      { label: "BoundaryTop" }
    ),

    BoundaryCenter: Boundary(
      world,
      "#301e0b",
      { x: WINDOW_WIDTH / 2, y: 540 },
      { height: 80, width: WINDOW_WIDTH },
      { label: "BoundaryCenter" }
    ),
  };
};
