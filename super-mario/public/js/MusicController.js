/**
 * With this module we create a middle layer between
 * the level and the music player
 */
export default class MusicController {
  constructor () {
    this.player = null;
  }

  setPlayer (player) {
    this.player = player;
  }
}
