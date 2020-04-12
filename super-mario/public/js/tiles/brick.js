import { Sides } from '../Entity.js';

function handleX ({entity, match}) {
  // Right to left
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(Sides.RIGHT, match);
    }

  // Left to right
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(Sides.LEFT, match);
    }
  }
}

function handleY ({entity, match, resolver, gameContext, level}) {
  // Top to bottom
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Sides.BOTTOM, match);
    }

  // Bottom to top
  } else if (entity.vel.y < 0) {
      // Checking the player
    if (entity.player) {
      const grid = resolver.matrix;
      grid.delete(match.indexX, match.indexY);

      const goomba = gameContext.entityFactory.goomba();
      goomba.vel.set(50, -400);
      goomba.pos.set(entity.pos.x, match.y1);
      level.entities.add(goomba);
    }

    if (entity.bounds.top < match.y2) {
      entity.obstruct(Sides.TOP, match);
    }
  }
}

export const brick = [handleX, handleY];
