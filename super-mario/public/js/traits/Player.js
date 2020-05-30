import Stomper from '../traits/Stomper.js';
import Trait from '../Trait.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait {
  constructor () {
    super();
    this.coins = 0;
    this.lives = 3;
    this.name = 'NN';
    this.score = 0;

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100;
    });
  }

  addCoins (count) {
    this.coins += count;
    // Adding sound to entity
    this.queue(entity => entity.sounds.add('coin'));
    // Adding a life every 100
    while (this.coins >= COIN_LIFE_THRESHOLD) {
      // If a level has a section with 1000 coins and we want to handle that
      // scenario with another handler, rather than adding, we use this
      // basic math logic
      this.addLives(1);
      this.coins -=  COIN_LIFE_THRESHOLD;
    }
  }

  addLives (count) {
    this.lives += count;
  }
}
