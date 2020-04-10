// const audioContext = new AudioContext();
// const audioBoard = new AudioBoard(audioContext);
// const loadAudio = createAudioLoader(audioContext);
// loadAudio('/audio/jump.ogg')
// .then(buffer => {
//   audioBoard.addAudio('jump', buffer);
// });
// loadAudio('/audio/stomp.ogg')
// .then(buffer => {
//   audioBoard.addAudio('stomp', buffer);
// });

import { loadJSON } from '../loaders.js';
import AudioBoard from '../AudioBoard.js';

export function loadAudioBoard (name, audioContext) {
  const loadAudio = createAudioLoader(audioContext);

  return loadJSON(`sounds/${name}.json`)
    .then(audioSheet => {
      const audioBoard = new AudioBoard(audioContext);
      const fx = audioSheet.fx;
      const jobs = [];

      // For each key we load the audio and add them to the audioBoard
      Object.keys(fx).forEach(name => {
        const url = fx[name].url;
        // Keep track of the jobs and not return until done
        const job = loadAudio(url).then(buffer => {
           audioBoard.addAudio(name, buffer);
        })
        jobs.push(job);
      });

      return Promise.all(jobs).then(() => audioBoard);
    });
}

export function createAudioLoader (context) {
  return function loadAudio (url) {
    return fetch(url)
      .then(response => {
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        return context.decodeAudioData(arrayBuffer);
      });
  };
}
