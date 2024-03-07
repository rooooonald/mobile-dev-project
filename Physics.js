import Matter from "matter-js";
import Bullet from "./components/Bullet";
import { configureBullet } from "./lib/configure-bullet";
import { Enemy } from "./components/Enemy";

let bulletIds = 0;
let enemyIds = 0;
var currentCollisionId;

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;

  const shootBullet = (world, color, pos, size, bulletVelocity) => {
    let bulletLabel = `Bullet${++bulletIds}`;
    const bullet = Matter.Bodies.rectangle(
      pos.x,
      pos.y,
      size.width,
      size.height,
      {
        label: bulletLabel,
        restitution: 0,
        friction: 0,
        frictionAir: 0,
      }
    );

    Matter.Composite.add(world, [bullet]);

    entities[bulletLabel] = {
      body: bullet,
      color,
      pos,
      size,
      renderer: <Bullet />,
    };

    Matter.Body.setVelocity(bullet, bulletVelocity);
  };

  const spawnEnemy = (world, color, pos, size, extraOptions) => {
    let enemyLabel = `Enemy${++enemyIds}`;
    const enemy = Matter.Bodies.rectangle(
      pos.x,
      pos.y,
      size.width,
      size.height,
      {
        label: enemyLabel,
        isStatic: false,
      }
    );

    Matter.Composite.add(world, [enemy]);

    entities[enemyLabel] = {
      body: enemy,
      color,
      pos,
      size,
      renderer: <Enemy />,
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
        const { bulletPosition, bulletDirection } = configureBullet(
          entities.Player.body.position,
          "Player",
          events[i].lastDirection
        );

        shootBullet(
          engine.world,
          "pink",
          bulletPosition,
          { width: 10, height: 10 },
          bulletDirection
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
      { width: 30, height: 30 }
    );
  }

  if (time.current % 1000 < 10) {
    for (let entityKey in entities) {
      if (entityKey.startsWith("Enemy")) {
        const { bulletPosition, bulletDirection } = configureBullet(
          entities[entityKey].body.position,
          "Enemy"
        );

        shootBullet(
          engine.world,
          "pink",
          bulletPosition,
          { width: 10, height: 10 },
          bulletDirection
        );
      }
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    if (
      (objALabel.startsWith("Bullet") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("Bullet"))
    ) {
      Matter.Body.setPosition(pairs[0].bodyA, { x: -100, y: -100 });
      Matter.Body.setPosition(pairs[0].bodyB, { x: -100, y: -100 });

      Matter.Composite.remove(engine.world, [pairs[0].bodyA, pairs[0].bodyB]);
      delete entities[objALabel];
      delete entities[objBLabel];

      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "score" });
        currentCollisionId = pairs[0].id;
      }
    }

    if (
      (objALabel.startsWith("Bullet") && objBLabel.startsWith("Player")) ||
      (objALabel.startsWith("Player") && objBLabel.startsWith("Bullet"))
    ) {
      Matter.Body.setPosition(
        objALabel.startsWith("Bullet") ? pairs[0].bodyA : pairs[0].bodyB,
        { x: -100, y: -100 }
      );
      Matter.Composite.remove(
        engine.world,
        objALabel.startsWith("Bullet") ? pairs[0].bodyA : pairs[0].bodyB
      );

      delete entities[objALabel.startsWith("Bullet") ? objALabel : objBLabel];

      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "hit" });
        currentCollisionId = pairs[0].id;
      }
    }

    if (
      (objALabel.startsWith("Player") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("Player"))
    ) {
      if (currentCollisionId !== pairs[0].id) {
        dispatch({ type: "crash" });
        currentCollisionId = pairs[0].id;

        Matter.Body.setPosition(
          objALabel.startsWith("Enemy") ? pairs[0].bodyA : pairs[0].bodyB,
          { x: -100, y: -100 }
        );
        Matter.Composite.remove(
          engine.world,
          objALabel.startsWith("Enemy") ? pairs[0].bodyA : pairs[0].bodyB
        );

        delete entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel];
      }
    }

    if (
      (objALabel.startsWith("Bullet") && objBLabel === "Boundary") ||
      (objALabel === "Boundary" && objBLabel.startsWith("Bullet"))
    ) {
      Matter.Body.setPosition(
        objALabel.startsWith("Bullet") ? pairs[0].bodyA : pairs[0].bodyB,
        { x: -100, y: -100 }
      );
      Matter.Composite.remove(
        engine.world,
        objALabel.startsWith("Bullet") ? pairs[0].bodyA : pairs[0].bodyB
      );

      delete entities[objALabel.startsWith("Bullet") ? objALabel : objBLabel];
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
