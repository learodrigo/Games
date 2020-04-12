import { Sides, Trait } from '../Entity.js';

export default class Stomper extends Trait {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  static EVENT_STOMP = Symbol('stomp');

  constructor () {
    super('stomper');
    this.bounceSpeed = 400;
  }

  bounce (us, them) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  collides (us, them) {
    if (!them.killable || them.killable.dead){
      return;
    }

    if (us.vel.y > them.vel.y) {
      // We queue the bounce because of race condition in the collision
      this.queue(() => this.bounce(us, them));
      us.sounds.add('stomp');
      us.events.emit(Stomper.EVENT_STOMP, us, them);
    }
  }
}
