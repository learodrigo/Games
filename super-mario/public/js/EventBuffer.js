export default class EventBuffer {
  constructor () {
    this.events = [];
  }

  clear () {
    this.events = [];
  }

  emit (name, ...args) {
    const evt = {name, args}
    this.events.push(evt);
  }

  process (name, callback) {
    this.events.forEach(evt => {
      if (evt.name === name) {
        callback(...evt.args);
      }
    });
  }
}
