import Compositor from './Compositor.js';
import EventEmitter from './EventEmitter.js';

export default class Scene {
  static EVENT_COMPLETE = Symbol('scene complete');

  constructor () {
    this.comp = new Compositor();
    this.events = new EventEmitter();
  }

  draw (gameContext) {
    this.comp.draw(gameContext.videoContext);
  }

  update (gameContext) {}

  pause () {}
}
