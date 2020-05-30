import Entity from "../Entity.js";
import Gravity from "../traits/Gravity.js";
import Killable from "../traits/Killable.js";
import Stomper from "../traits/Stomper.js";
import Trait from "../Trait.js";
import Velocity from "../traits/Velocity.js";
import { loadSpriteSheet } from "../loaders/sprite.js";

export function loadBullet () {
  return loadSpriteSheet("bullet")
  .then(createBulletFactory);
}

class Behaviour extends Trait {
  constructor () {
    super();
    this.gravity = new Gravity();
  }

  // Feature detection
  collides (us, them) {
    if (us.traits.get(Killable).dead) {
      return;
    }

    if (them.traits.has(Stomper)) {
      if (them.vel.y > us.vel.y) {
        us.traits.get(Killable).kill();
        us.vel.set(100, -200);
      } else {
        them.traits.get(Killable).kill();
      }
    }
  }

  update (entity, gameContext, level) {
    if (entity.traits.get(Killable).dead) {
      this.gravity.update(entity, gameContext, level);
    }
  }
}

function createBulletFactory (sprite) {
  function drawBullet (context) {
    sprite.draw('bullet', context, 0, 0, this.vel.x < 0);
  }

  return function createBullet () {
    const bullet = new Entity();

    bullet.size.set(16, 14);
    bullet.addTrait(new Velocity());
    bullet.addTrait(new Behaviour());
    bullet.addTrait(new Killable());

    bullet.draw = drawBullet;

    return bullet;
  };
}
