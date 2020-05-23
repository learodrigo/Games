import { findPlayers } from '../player.js';

function getPlayer (level) {
  for (const entity of findPlayers(level)) {
    return entity;
  }
}

export function createPlayerProgressLayer (font, level) {
  const size = font.size;

  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = 32;
  spriteBuffer.height = 32;
  const spriteBufferContext = spriteBuffer.getContext('2d');

  return function drawPlayerProgress (context) {
    const entity = getPlayer(level);
    font.print("WORLD " + level.name, context, size * 12, size * 12);

    spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);
    entity.draw(spriteBufferContext);
    context.drawImage(spriteBuffer, size * 13, size * 15);

    font.print("x " + entity.player.lives.toString(), context, size * 17, size * 16);
  };
}
