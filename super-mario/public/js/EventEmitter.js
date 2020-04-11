/**
 * Concurrency model and the event loop
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
 * Creating and triggering events
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
 */

export default class EventEmitter {
  constructor () {
    this.listeners = [];
  }

  listen (name, callback) {
    const listener = {name, callback};
    this.listeners.push(listener);
  }

  emit (name, ...args) {
    this.listeners.forEach(listener => {
      if (listener.name === name) {
        listener.callback(...args);
      }
    });
  }
}
