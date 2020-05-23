export default class MusicPlayer {
  constructor () {
    // The Map object holds key-value pairs and remembers the original insertion
    // order of the keys. Any value may be used as either a key or a value.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    this.tracks = new Map();
  }

  addTrack (name, url) {
    const audio = new Audio();
    audio.loop = true;
    audio.src = url;
    this.tracks.set(name, audio);
  }

  playTrack (name) {
    this.pauseAll();
    const audio = this.tracks.get(name);
    audio.play();
    return audio;
  }

  pauseAll () {
    // Object.values() returns an array of object's own enumerable property values
    for (const audio of this.tracks.values()) {
      audio.pause();
    }
  }
}
