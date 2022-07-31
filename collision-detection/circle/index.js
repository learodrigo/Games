/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 700)
let canvasPosition = canvas.getBoundingClientRect()

const EXPLOSIONS = []

window.addEventListener("click", (evt) => {
  createAnimation(evt.x, evt.y)
})

const createAnimation = (x, y) => {
  const positionX = x - canvasPosition.left
  const positionY = y - canvasPosition.top
  EXPLOSIONS.push(new Explosion(positionX, positionY))
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < EXPLOSIONS.length; i++) {
    EXPLOSIONS[i].update()
    EXPLOSIONS[i].draw(ctx)

    if (EXPLOSIONS[i].frame > 5) {
      EXPLOSIONS.splice(i, 1)
      i--
    }
  }

  requestAnimationFrame(animate)
}

animate()
