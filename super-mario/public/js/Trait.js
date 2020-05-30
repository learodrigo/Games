export default class Trait {
  static EVENT_TASK = Symbol('taks');

  constructor () {
    this.listeners = [];
  }

  finalize (entity) {
    this.listeners = this.listeners.filter(listener => {
      entity.events.process(listener.name, listener.callback);
      return --listener.count;
    });
  }

  listen (name, callback, count = Infinity) {
    const listener = {name, callback, count};
    this.listeners.push(listener);
  }

  queue (task) {
    this.listen(Trait.EVENT_TASK, task, 1);
  }

  collides (us, them) {}

  obstruct () {}

  update () {}
}
