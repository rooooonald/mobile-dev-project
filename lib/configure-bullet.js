export const configureBullet = (
  shootingPosition,
  bulletFrom,
  movingDirection
) => {
  let bulletVelocity;
  let bulletPosition;
  const shootingDirection =
    bulletFrom === "Player" ? movingDirection : Math.floor(Math.random() * 8);

  const shootingOffset = bulletFrom === "Player" ? 15 : 20;

  switch (shootingDirection) {
    case 0:
      bulletVelocity = { x: 0, y: -10 };
      bulletPosition = {
        x: shootingPosition.x,
        y: shootingPosition.y - shootingOffset,
      };
      break;

    case 1:
      bulletVelocity = { x: 10, y: -10 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y - shootingOffset,
      };
      break;

    case 2:
      bulletVelocity = { x: 10, y: 0 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y,
      };
      break;

    case 3:
      bulletVelocity = { x: 10, y: 10 };
      bulletPosition = {
        x: shootingPosition.x + shootingOffset,
        y: shootingPosition.y + shootingOffset,
      };
      break;

    case 4:
      bulletVelocity = { x: 0, y: 10 };
      bulletPosition = {
        x: shootingPosition.x,
        y: shootingPosition.y + shootingOffset,
      };
      break;

    case 5:
      bulletVelocity = { x: -10, y: 10 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y + shootingOffset,
      };
      break;

    case 6:
      bulletVelocity = { x: -10, y: 0 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y,
      };
      break;

    case 7:
      bulletVelocity = { x: -10, y: -10 };
      bulletPosition = {
        x: shootingPosition.x - shootingOffset,
        y: shootingPosition.y - shootingOffset,
      };
      break;

    default:
      bulletVelocity = { x: 0, y: 0 };
      bulletPosition = { x: 0, y: 0 };
  }

  return { bulletVelocity, bulletPosition };
};
