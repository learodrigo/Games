import Level from './Level.js';
import Scene from './Scene.js';
import SceneRunner from './SceneRunner.js';
import TimedScene from './TimedScene.js';
import Timer from './Timer.js';
import { createLevelLoader } from './loaders/level.js';
import { makePlayer, createPlayerEnv, findPlayers } from './player.js';
import { loadFont } from './loaders/font.js';
import { loadEntites } from "./entities.js"
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from "./layers/collision.js";
import { createColorLayer } from './layers/color.js';
import { createDashboardLayer } from "./layers/dashboard.js";
import { createPlayerProgressLayer } from "./layers/player-progress.js";
import { createTextLayer } from "./layers/text.js";

async function main (canvas) {
  const videoContext = canvas.getContext('2d');
  const audioContext = new AudioContext();

  const [entityFactory, font] = await Promise.all([
    loadEntites(audioContext),
    loadFont()
  ]);

  const loadLevel = await createLevelLoader(entityFactory);
  const sceneRunner = new SceneRunner();

  const mario = entityFactory.mario();
  makePlayer(mario, 'MARIO');
  window.mario = mario;

  const inputRouter = setupKeyboard(window);
  inputRouter.addReceiver(mario);

  async function runLevel (name) {
    const loadScreen = new Scene();
    loadScreen.comp.layers.push(createColorLayer('#1E1E1E'));
    loadScreen.comp.layers.push(createTextLayer(font, `Loading ${name}...`));
    sceneRunner.addScene(loadScreen);
    sceneRunner.runNext();

    const level = await loadLevel(name);

    level.events.listen(Level.EVENT_TRIGGER, (spec, trigger, touches) => {
      if (spec.type === 'goto') {
        for (const _ of findPlayers(touches)) {
          runLevel(spec.name);
          return;
        }
      }
    });

    const playerProgressLayer = createPlayerProgressLayer(font, level);
    const playerDashboardLayer = createDashboardLayer(font, level);

    mario.pos.set(0, 0);
    level.entities.add(mario);

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    const waitScreen = new TimedScene();
    waitScreen.comp.layers.push(createColorLayer('#000'));
    waitScreen.comp.layers.push(playerDashboardLayer);
    waitScreen.comp.layers.push(playerProgressLayer);
    sceneRunner.addScene(waitScreen);

    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(playerDashboardLayer);
    sceneRunner.addScene(level);

    sceneRunner.runNext();
  }

  const gameContext = {
    audioContext,
    deltaTime: null,
    entityFactory,
    videoContext
  };

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    gameContext.deltaTime = deltaTime;
    sceneRunner.update(gameContext);
  };

  timer.start();

  runLevel('1-1');
  window.runLevel = runLevel;
}

const canvas = document.getElementById('screen');
// As new chrome with auto play policy
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// we add a click event to start the game
const start = () => {
  window.removeEventListener('click', start);
  main(canvas);
};

window.addEventListener('click', start);
