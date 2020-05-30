import MusicPlayer from '../MusicPlayer.js';
import { loadJSON } from '../loaders.js';

export function loadMusicSheet (name) {
  return loadJSON(`/music/${name}.json`)
  .then(musicSheet => {
    const musicPlayer = new MusicPlayer();

    //The Object.entries(something) method returns an array of a given object's own
    // enumerable string-keyed property [key, value] pairs
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [name, track] of Object.entries(musicSheet)) {
      musicPlayer.addTrack(name, track.url);
    }

    return musicPlayer;
  });
}
