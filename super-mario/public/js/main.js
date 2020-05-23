import SceneRunner from './SceneRunner.js';
import CompositionScene from './CompositionScene.js';
import Level from './Level.js';
import Timer from './Timer.js';
import { createLevelLoader } from './loaders/level.js';
import { createPlayer, createPlayerEnv } from './player.js';
import { loadFont } from './loaders/font.js';
import { loadEntites } from "./entities.js"
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from "./layers/collision.js";
import { createColorLayer } from './layers/color.js';
import { createDashboardLayer } from "./layers/dashboard.js";
import { createPlayerProgressLayer } from "./layers/player-progress.js";

async function main (canvas) {
  const videoContext = canvas.getContext('2d');
  const audioContext = new AudioContext();

  const [entityFactory, font] = await Promise.all([
    loadEntites(audioContext),
    loadFont(),
  ]);

  const loadLevel = await createLevelLoader(entityFactory);
  const sceneRunner = new SceneRunner();

  const mario = createPlayer(entityFactory.mario());
  mario.player.name = 'MARIO';
  const inputRouter = setupKeyboard(window);
  inputRouter.addReceiver(mario);

  async function runLevel (name) {
    const level = await loadLevel(name);

    level.events.listen(Level.EVENT_TRIGGER, (spec, trigger, touches) => {
      if (spec.type === 'goto') {
        for (const entity of touches) {
          if (entity.player) {
            runLevel(spec.name);
            return;
          }
        }
      }
    });

    const playerProgressLayer = createPlayerProgressLayer(font, level);
    const playerDashboardLayer = createDashboardLayer(font, level);

    mario.pos.set(0, 0);
    level.entities.add(mario);

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    const waitScreen = new CompositionScene();
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

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    gameContext.deltaTime = deltaTime;
    sceneRunner.update(gameContext);
  }

  timer.start();

  runLevel('debug-progression');
  // window.runLevel = runLevel;
}

const canvas = document.getElementById('screen');
// As new chrome with auto play policy
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
const start = () => {
  window.removeEventListener('click', start);
  main(canvas);
};
window.addEventListener('click', start);
