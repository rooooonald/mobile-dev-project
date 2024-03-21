export const configureBullet = (
  shootingPosition,
  bulletFrom,
  movingDirection
) => {
  let bulletVelocity, bulletPosition, bulletAngle;
  const shootingDirection =
    bulletFrom === "Player" ? movingDirection : Math.floor(Math.random() * 8);

  const shootingOffset = bulletFrom === "Player" ? 30 : 22.5;

  switch (shootingDirection) {
    case 0:
      bulletVelocity = { x: 0, y: -10 };
      bulletPosition = {
        x: shootingPosition.x,
        y: shootingPosition.y - shootingOffset,
      };
      bulletAngle = 0;
      break;

    case 1:
      bulletVelocity = { x: 10, y: -10 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y - shootingOffset,
      };
      bulletAngle = 45;
      break;

    case 2:
      bulletVelocity = { x: 10, y: 0 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y,
      };
      bulletAngle = 90;
      break;

    case 3:
      bulletVelocity = { x: 10, y: 10 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y + shootingOffset,
      };
      bulletAngle = 135;
      break;

    case 4:
      bulletVelocity = { x: 0, y: 10 };
      bulletPosition = {
        x: shootingPosition.x,
        y: shootingPosition.y + shootingOffset,
      };
      bulletAngle = 180;
      break;

    case 5:
      bulletVelocity = { x: -10, y: 10 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y + shootingOffset,
      };
      bulletAngle = 225;
      break;

    case 6:
      bulletVelocity = { x: -10, y: 0 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y,
      };
      bulletAngle = 270;
      break;

    case 7:
      bulletVelocity = { x: -10, y: -10 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y - shootingOffset,
      };
      bulletAngle = 315;
      break;

    default:
      bulletVelocity = { x: 0, y: 0 };
      bulletPosition = { x: 0, y: 0 };
      bulletAngle = 0;
  }

  return { bulletVelocity, bulletPosition, bulletAngle };
};
