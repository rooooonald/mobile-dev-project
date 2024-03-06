import Matter from "matter-js";
import Bullet from "./components/Bullet";
import { Box } from "./components/Box";

let bulletIds = 0;
let enemyIds = 0;
var currentCollisionId;

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;

  const shootBullet = (
    world,
    color,
    pos,
    size,
    bulletVelocity,
    extraOptions
  ) => {
    const bullet = Matter.Bodies.rectangle(
      pos.x,
      pos.y,
      size.width,
      size.height,
      extraOptions
    );

    Matter.Composite.add(world, [bullet]);

    entities[`Bullet${++bulletIds}`] = {
      body: bullet,
      color,
      pos,
      size,
      renderer: <Bullet />,
    };

    Matter.Body.setVelocity(bullet, bulletVelocity);
  };

  const spawnEnemy = (world, color, pos, size, extraOptions) => {
    const enemy = Matter.Bodies.rectangle(
      pos.x,
      pos.y,
      size.width,
      size.height,
      extraOptions
    );

    Matter.Composite.add(world, [enemy]);

    entities[`Enemy${++enemyIds}`] = {
      body: enemy,
      color,
      pos,
      size,
      renderer: <Box />,
    };
  };

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-up") {
        Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -3 });
      }
      if (events[i].type === "move-down") {
        Matter.Body.setVelocity(entities.Player.body, { x: 0, y: 3 });
      }
      if (events[i].type === "move-left") {
        Matter.Body.setVelocity(entities.Player.body, { x: -3, y: 0 });
      }
      if (events[i].type === "move-right") {
        Matter.Body.setVelocity(entities.Player.body, { x: 3, y: 0 });
      }
      if (events[i].type === "stop") {
        Matter.Body.setVelocity(entities.Player.body, { x: 0, y: 0 });
      }
      if (events[i].type === "shoot") {
        let bulletDirection;
        let bulletPosition;
        let shootingPosition = entities.Player.body.position;

        switch (events[i].lastDirection) {
          case "left":
            bulletDirection = { x: -10, y: 0 };
            bulletPosition = {
              x: shootingPosition.x - 20,
              y: shootingPosition.y,
            };
            break;

          case "right":
            bulletDirection = { x: 10, y: 0 };
            bulletPosition = {
              x: shootingPosition.x + 20,
              y: shootingPosition.y,
            };
            break;

          case "up":
            bulletDirection = { x: 0, y: -10 };
            bulletPosition = {
              x: shootingPosition.x,
              y: shootingPosition.y - 20,
            };
            break;

          case "down":
            bulletDirection = { x: 0, y: 10 };
            bulletPosition = {
              x: shootingPosition.x,
              y: shootingPosition.y + 20,
            };
            break;

          default:
            bulletDirection = { x: 0, y: 0 };
            bulletPosition = { x: 0, y: 0 };
        }

        shootBullet(
          engine.world,
          "pink",
          bulletPosition,
          { width: 10, height: 10 },
          bulletDirection,
          {
            label: "Bullet",
            restitution: 0,
            friction: 0,
            frictionAir: 0,
          }
        );
      }
    }
  }

  if (time.current % 3000 < 10) {
    spawnEnemy(
      engine.world,
      "red",
      {
        x: 80 + Math.floor(Math.random() * 200),
        y: 80 + Math.floor(Math.random() * 200),
      },
      { width: 30, height: 30 },
      {
        label: "Enemy",
        isStatic: false,
      }
    );
  }

  if (time.current % 1000 < 10) {
    for (let entityKey in entities) {
      if (entityKey.startsWith("Enemy")) {
        let bulletDirection;
        let bulletPosition;
        const shootingDirection = Math.floor(Math.random() * 8);
        const shootingPosition = entities[entityKey].body.position;

        switch (shootingDirection) {
          case 0:
            bulletDirection = { x: 0, y: -10 };
            bulletPosition = {
              x: shootingPosition.x,
              y: shootingPosition.y - 20,
            };
            break;

          case 1:
            bulletDirection = { x: 10, y: -10 };
            bulletPosition = {
              x: shootingPosition.x + 20,
              y: shootingPosition.y - 20,
            };
            break;

          case 2:
            bulletDirection = { x: 10, y: 0 };
            bulletPosition = {
              x: shootingPosition.x + 20,
              y: shootingPosition.y,
            };
            break;

          case 3:
            bulletDirection = { x: 10, y: 10 };
            bulletPosition = {
              x: shootingPosition.x + 20,
              y: shootingPosition.y + 20,
            };
            break;

          case 4:
            bulletDirection = { x: 0, y: 10 };
            bulletPosition = {
              x: shootingPosition.x,
              y: shootingPosition.y + 20,
            };
            break;

          case 5:
            bulletDirection = { x: -10, y: 10 };
            bulletPosition = {
              x: shootingPosition.x - 20,
              y: shootingPosition.y + 20,
            };
            break;

          case 6:
            bulletDirection = { x: -10, y: 0 };
            bulletPosition = {
              x: shootingPosition.x - 20,
              y: shootingPosition.y,
            };
            break;

          case 7:
            bulletDirection = { x: -10, y: -10 };
            bulletPosition = {
              x: shootingPosition.x - 20,
              y: shootingPosition.y - 20,
            };
            break;

          default:
            bulletDirection = { x: 0, y: 0 };
            bulletPosition = { x: 0, y: 0 };
        }

        shootBullet(
          engine.world,
          "pink",
          bulletPosition,
          { width: 10, height: 10 },
          bulletDirection,
          {
            label: "Bullet",
            restitution: 0,
            friction: 0,
            frictionAir: 0,
          }
        );
      }
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    if (
      (objALabel === "Bullet" && objBLabel === "Enemy") ||
      (objALabel === "Enemy" && objBLabel === "Bullet")
    ) {
      Matter.Body.setPosition(pairs[0].bodyA, { x: -100, y: -100 });
      Matter.Body.setPosition(pairs[0].bodyB, { x: -100, y: -100 });

      Matter.Composite.remove(engine.world, [pairs[0].bodyA, pairs[0].bodyB]);

      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "score" });
        currentCollisionId = pairs[0].id;
      }
    }

    if (
      (objALabel === "Bullet" && objBLabel === "Player") ||
      (objALabel === "Player" && objBLabel === "Bullet")
    ) {
      Matter.Body.setPosition(
        objALabel === "Bullet" ? pairs[0].bodyA : pairs[0].bodyB,
        { x: -100, y: -100 }
      );
      Matter.Composite.remove(
        engine.world,
        objALabel === "Bullet" ? pairs[0].bodyA : pairs[0].bodyB
      );

      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "hit" });
        currentCollisionId = pairs[0].id;
      }
    }

    if (
      (objALabel === "Player" && objBLabel === "Enemy") ||
      (objALabel === "Enemy" && objBLabel === "Player")
    ) {
      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "crash" });
        currentCollisionId = pairs[0].id;

        Matter.Body.setPosition(
          objALabel === "Enemy" ? pairs[0].bodyA : pairs[0].bodyB,
          { x: -100, y: -100 }
        );
        Matter.Composite.remove(
          engine.world,
          objALabel === "Enemy" ? pairs[0].bodyA : pairs[0].bodyB
        );
      }
    }

    if (
      (objALabel === "Bullet" && objBLabel === "Boundary") ||
      (objALabel === "Boundary" && objBLabel === "Bullet")
    ) {
      Matter.Body.setPosition(
        objALabel === "Bullet" ? pairs[0].bodyA : pairs[0].bodyB,
        { x: -100, y: -100 }
      );
      Matter.Composite.remove(
        engine.world,
        objALabel === "Bullet" ? pairs[0].bodyA : pairs[0].bodyB
      );
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
