import Matter, { Sleeping } from "matter-js";

import Bullet from "./components/Bullet";
import { Enemy } from "./components/Enemy";

import { configureBullet } from "./lib/configure-bullet";
import CONSTANTS from "./Constants";

let bulletIds = 0;
let enemyIds = 0;
let currentCollisionId = [];

const Physics = (entities, { dispatch, events, time }) => {
  let engine = entities.physics.engine;

  entities.Player.body.inverseInertia = 0; // Setting inverseInertia to zero effectively means that the body has infinite resistance to rotation

  const shootBullet = (
    world,
    size,
    bulletPosition,
    bulletVelocity,
    bulletAngle,
    from
  ) => {
    let bulletLabel = `Bullet${from}${++bulletIds}`;
    const bullet = Matter.Bodies.rectangle(
      bulletPosition.x,
      bulletPosition.y,
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
      bulletPosition,
      size,
      bulletAngle,
      renderer: <Bullet />,
    };

    Matter.Body.setVelocity(bullet, bulletVelocity);
  };

  const spawnEnemy = (world, color, pos, size) => {
    let enemyLabel = `Enemy${++enemyIds}`;
    const enemy = Matter.Bodies.rectangle(
      pos.x,
      pos.y,
      size.width,
      size.height,
      {
        label: enemyLabel,
        restitution: 0,
        friction: 0,
        frictionAir: 0,
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
    Matter.Body.setVelocity(entities[enemyLabel].body, {
      x: Math.random(),
      y: Math.random(),
    });
  };

  let timer;
  const playerHit = () => {
    Sleeping.set(entities.Player.body, true);

    if (timer) {
      clearTimeout(timer);
    }
    entities.Player.animOptions.animType = "explode";

    timer = setTimeout(() => {
      entities.Player.animOptions.animType = "moving";
      Sleeping.set(entities.Player.body, false);
    }, 500);
  };

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-up") {
        Matter.Body.setAngle(entities.Player.body, 0);
        Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -3 });
      }
      if (events[i].type === "move-down") {
        Matter.Body.setAngle(entities.Player.body, Math.PI);
        Matter.Body.setVelocity(entities.Player.body, { x: 0, y: 3 });
      }
      if (events[i].type === "move-left") {
        Matter.Body.setAngle(entities.Player.body, (3 * Math.PI) / 2);
        Matter.Body.setVelocity(entities.Player.body, { x: -3, y: 0 });
      }
      if (events[i].type === "move-right") {
        Matter.Body.setAngle(entities.Player.body, Math.PI / 2);
        Matter.Body.setVelocity(entities.Player.body, { x: 3, y: 0 });
      }

      if (events[i].type === "shoot") {
        const { bulletPosition, bulletVelocity, bulletAngle } = configureBullet(
          entities.Player.body.position,
          "Player",
          events[i].lastDirection
        );

        shootBullet(
          engine.world,
          { width: 6, height: 15 },
          bulletPosition,
          bulletVelocity,
          bulletAngle,
          "Player"
        );
      }
    }
  }

  if (time.current % 2000 < 10) {
    spawnEnemy(
      engine.world,
      "red",
      {
        x: 100 + Math.floor(Math.random() * (CONSTANTS.WINDOW_WIDTH - 150)),
        y: 100 + Math.floor(Math.random() * 350),
      },
      { width: 30, height: 30 }
    );
  }

  if (time.current % 500 < 10) {
    for (let entityKey in entities) {
      if (entityKey.startsWith("Enemy")) {
        const { bulletPosition, bulletVelocity, bulletAngle } = configureBullet(
          entities[entityKey].body.position,
          "Enemy"
        );

        shootBullet(
          engine.world,
          { width: 6, height: 15 },
          bulletPosition,
          bulletVelocity,
          bulletAngle,
          "Enemy"
        );
      }
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    if (
      (objALabel.startsWith("BulletPlayer") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("BulletPlayer"))
    ) {
      Matter.Composite.remove(engine.world, [pairs[0].bodyA, pairs[0].bodyB]);
      delete entities[objALabel];
      delete entities[objBLabel];

      if (!currentCollisionId.includes(pairs[0].id)) {
        dispatch({ type: "score" });
        currentCollisionId.push(pairs[0].id);
      }
    }

    if (
      (objALabel.startsWith("BulletEnemy") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("BulletEnemy"))
    ) {
      Matter.Composite.remove(
        engine.world,
        objALabel.startsWith("BulletEnemy") ? pairs[0].bodyA : pairs[0].bodyB
      );
      delete entities[
        objALabel.startsWith("BulletEnemy") ? objALabel : objBLabel
      ];
    }

    if (
      (objALabel.startsWith("BulletEnemy") && objBLabel.startsWith("Player")) ||
      (objALabel.startsWith("Player") && objBLabel.startsWith("BulletEnemy"))
    ) {
      Matter.Composite.remove(
        engine.world,
        objALabel.startsWith("BulletEnemy") ? pairs[0].bodyA : pairs[0].bodyB
      );
      delete entities[
        objALabel.startsWith("BulletEnemy") ? objALabel : objBLabel
      ];

      if (!currentCollisionId.includes(pairs[0].id)) {
        playerHit();

        dispatch({ type: "hit" });
        currentCollisionId.push(pairs[0].id);
      }
    }

    if (
      (objALabel.startsWith("Player") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("Player"))
    ) {
      if (!currentCollisionId.includes(pairs[0].id)) {
        playerHit();

        dispatch({ type: "crash" });
        currentCollisionId.push(pairs[0].id);

        Matter.Composite.remove(
          engine.world,
          objALabel.startsWith("Enemy") ? pairs[0].bodyA : pairs[0].bodyB
        );
        delete entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel];
      }
    }

    if (
      (objALabel.startsWith("Bullet") && objBLabel.startsWith("Boundary")) ||
      (objALabel.startsWith("Boundary") && objBLabel.startsWith("Bullet"))
    ) {
      Matter.Composite.remove(
        engine.world,
        objALabel.startsWith("Bullet") ? pairs[0].bodyA : pairs[0].bodyB
      );
      delete entities[objALabel.startsWith("Bullet") ? objALabel : objBLabel];
    }

    if (
      (objALabel.startsWith("Enemy") && objBLabel === "BoundaryTop") ||
      (objALabel === "BoundaryTop" && objBLabel.startsWith("Enemy"))
    ) {
      let enemyBody =
        entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel].body;
      let { x } = enemyBody.velocity;
      Matter.Body.setVelocity(enemyBody, {
        x,
        y: Math.random(),
      });
    }

    if (
      (objALabel.startsWith("Enemy") && objBLabel === "BoundaryCenter") ||
      (objALabel === "BoundaryCenter" && objBLabel.startsWith("Enemy"))
    ) {
      let enemyBody =
        entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel].body;
      let { x } = enemyBody.velocity;
      Matter.Body.setVelocity(enemyBody, {
        x,
        y: -Math.random(),
      });
    }

    if (
      (objALabel.startsWith("Enemy") && objBLabel === "BoundaryLeft") ||
      (objALabel === "BoundaryLeft" && objBLabel.startsWith("Enemy"))
    ) {
      let enemyBody =
        entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel].body;
      let { y } = enemyBody.velocity;
      Matter.Body.setVelocity(enemyBody, {
        x: Math.random(),
        y,
      });
    }

    if (
      (objALabel.startsWith("Enemy") && objBLabel === "BoundaryRight") ||
      (objALabel === "BoundaryRight" && objBLabel.startsWith("Enemy"))
    ) {
      let enemyBody =
        entities[objALabel.startsWith("Enemy") ? objALabel : objBLabel].body;
      let { y } = enemyBody.velocity;
      Matter.Body.setVelocity(enemyBody, {
        x: -Math.random(),
        y,
      });
    }

    if (
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Bullet") && objBLabel.startsWith("Bullet"))
    ) {
      Matter.Composite.remove(engine.world, [pairs[0].bodyA, pairs[0].bodyB]);
      delete entities[objALabel];
      delete entities[objBLabel];
    }
  });

  Matter.Events.on(engine, "collisionEnd", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    if (
      (objALabel.startsWith("BulletPlayer") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("BulletPlayer")) ||
      (objALabel.startsWith("BulletEnemy") && objBLabel.startsWith("Player")) ||
      (objALabel.startsWith("Player") && objBLabel.startsWith("BulletEnemy")) ||
      (objALabel.startsWith("Player") && objBLabel.startsWith("Enemy")) ||
      (objALabel.startsWith("Enemy") && objBLabel.startsWith("Player"))
    ) {
      if (currentCollisionId.includes(pairs[0].id)) {
        currentCollisionId = currentCollisionId.filter(
          (id) => id !== pairs[0].id
        );
      }
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
