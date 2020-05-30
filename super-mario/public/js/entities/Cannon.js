import Emitter from '../traits/Emitter.js';
import Entity from '../Entity.js';
import { findPlayers } from '../player.js';
import { loadAudioBoard } from '../loaders/audio.js';

const HOLD_FIRE_TRASHOLD = 30;

export function loadCannon (audioContext) {
  return loadAudioBoard('cannon', audioContext)
  .then(audio => {
    return createCannonFactory(audio);
  });
}

function createCannonFactory (audio) {
  // This function emits (aka creates) a bullet from the cannon pos
  function emitBullet (cannon, gameContext, level) {
    let dir = 1;
    for (const player of findPlayers(level.entities)) {
      // When Mario is too close form the cannon, it stops firing
      if (
        player.pos.x > cannon.pos.x - HOLD_FIRE_TRASHOLD &&
        player.pos.x < cannon.pos.x + HOLD_FIRE_TRASHOLD
      ) {
        return;
      }

      // Handling bullet direction
      if (player.pos.x < cannon.pos.x) {
        dir *= -1;
      }
    }
    // Create instance of bullet
    const bullet = gameContext.entityFactory.bullet();
    // Copy the position from the cannon
    bullet.pos.copy(cannon.pos);
    // Adding vel + dir
    bullet.vel.set(80 * dir, 0);
    // Adding the sound to cannon
    cannon.sounds.add('shoot');
    // // Add the obj to the level
    level.entities.add(bullet);
  }

  return function createCannon() {
    const cannon = new Entity();
    cannon.audio = audio;

    const emitter = new Emitter();
    emitter.interval = 4;
    emitter.emitters.push(emitBullet);
    cannon.addTrait(emitter);

    return cannon;
  }
}
