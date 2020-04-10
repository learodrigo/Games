export default class AudioBoard {
  constructor () {
    this.buffer = new Map();
  }

  addAudio (name, buffer) {
    this.buffer.set(name, buffer);
  }

  playAudio (name, audioContext) {
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = this.buffer.get(name);
    source.start(0);
  }
}
