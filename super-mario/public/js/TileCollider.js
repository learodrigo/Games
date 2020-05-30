import TileResolver from './TileResolver.js';
import { brick } from './tiles/brick.js';
import { coin } from './tiles/coin.js';
import { ground } from './tiles/ground.js';

const handlers = {
  brick,
  coin,
  ground
};

export default class TileCollider {
  constructor () {
    this.resolvers = [];
  }

  addGrid (tileMatrix) {
    this.resolvers.push(new TileResolver(tileMatrix));
  }

  checkX (entity, gameContext, level) {
    let x;

    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    }
    else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    }
    else {
      return;
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        x,
        x,
        entity.bounds.top,
        entity.bounds.bottom
      );

      matches.forEach(match => {
        this.handles(0, entity, match, resolver);
      });
    }
  }

  checkY (entity, gameContext, level) {
    let y;

    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    }
    else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    }
    else {
      return;
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        entity.bounds.left,
        entity.bounds.right,
        y,
        y
      );

      matches.forEach(match => {
        this.handles(1, entity, match, resolver, gameContext, level);
      });
    }
  }

  handles (index, entity, match, resolver, gameContext, level) {
    const tileCollisionContext = {
      entity,
      match,
      resolver,
      gameContext,
      level
    };
    const handler = handlers[match.tile.type];
    if (handler) handler[index](tileCollisionContext);
  }
}
