export default function gameEventHandler(eventType) {
  switch (eventType) {
    case "score":
      setScore((prev) => prev + 1);
      break;
    case "crash":
    case "hit":
      setLifeCount((prev) => prev - 1);
      break;
    case "game_over":
      setIsRunning(false);
      break;
  }
}
