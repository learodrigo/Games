import { findPlayers } from '../player.js';

function getPlayerTrait (level) {
  for (const entity of findPlayers(level)) {
    return entity.player;
  }
}

function getTimerTrait (level) {
  for (const entity of level.entities) {
    if (entity.levelTimer) {
      return entity.levelTimer;
    }
  }
}

export function createDashboardLayer (font, level) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;
  const playerTrait = getPlayerTrait(level);
  const name = playerTrait.name;
  const timerTrait = getTimerTrait(level);
  const time = timerTrait.currentTime;

  return function drawDashboard (context) {
    font.print(name, context, 16, LINE1);
    font.print(playerTrait.score.toString().padStart(6, "0"), context, 16, LINE2);

    // Lives counter debugging
    // font.print("+  " + playerTrait.lives.toString().padStart(2, "0"), context, 80, LINE1);
    font.print("@x " + playerTrait.coins.toString().padStart(2, "0"), context, 80, LINE2);

    font.print("WORLD", context, 152, LINE1);
    font.print(level.name, context, 160, LINE2);

    font.print("TIME", context, 208, LINE1);
    font.print(time.toFixed().toString().padStart(3, "0"), context, 216, LINE2);
  };
}
