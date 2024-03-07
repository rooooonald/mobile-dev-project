export const configureBullet = (
  shootingPosition,
  bulletFrom,
  movingDirection
) => {
  let bulletDirection;
  let bulletPosition;
  const shootingDirection =
    bulletFrom === "Player" ? movingDirection : Math.floor(Math.random() * 8);

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

  return { bulletDirection, bulletPosition };
};
