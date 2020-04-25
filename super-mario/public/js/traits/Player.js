import { Trait } from '../Entity.js';
import Stomper from '../traits/Stomper.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait {
  constructor () {
    super('player');
    this.coins = 0;
    this.name = 'NN';
    this.lives = 3;
    this.score = 0;

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100;
    });
  }

  addCoins (count) {
    this.coins += count;
    // Adding a life every 100
    if (this.coins >= COIN_LIFE_THRESHOLD) {
      // If a level has a section with 1000 coins and we want to handle that
      // scenario with another handler, rather than adding, we use this
      // basic math logic
      const lifeCount = Math.floor(this.coins / COIN_LIFE_THRESHOLD);
      this.addLives(lifeCount);
      this.coins = this.coins % COIN_LIFE_THRESHOLD;
    }
    // Adding sound to entity
    this.queue(entity => entity.sounds.add('coin'));
  }

  addLives (count) {
    this.lives += count;
  }
}
