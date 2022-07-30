const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)
const LAYERS = []

window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider")
  const showGameSpeed = document.getElementById("showGameSpeed")

  let gameSpeed = +slider.value
  showGameSpeed.innerText = gameSpeed

  slider.addEventListener("change", (evt) => {
    gameSpeed = +evt.target.value
    showGameSpeed.innerText = gameSpeed
  })

  for (let i = 1; i < 6; i++) {
    const image = new Image()
    image.src = `./sprites/layer-${i}.png`
    const layer = new Layer(image, ((1 / i) * gameSpeed) / 2)
    LAYERS.push(layer)
  }

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for (const layer of LAYERS) {
      layer.update(gameSpeed)
      layer.draw(ctx)
    }

    requestAnimationFrame(animate)
  }

  animate()
})
