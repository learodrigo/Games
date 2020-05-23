export default class SceneRunner {
  constructor () {
    this.sceneIndex = -1;
    this.scenes = [];
  }

  addScene (scene) {
    this.scenes.push(scene);
  }

  runNext () {
    this.sceneIndex++;
  }

  update (gameContext) {
    const currentScene = this.scenes[this.sceneIndex];
    if (currentScene) {
      currentScene.update(gameContext);
      currentScene.draw(gameContext);
    }
  }
}
