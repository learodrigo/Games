window.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  const canvas1 = document.getElementById("canvas1")
  const ctx1 = canvas1.getContext("2d")
  /** @type {HTMLCanvasElement} */
  const canvas2 = document.getElementById("canvas2")
  const ctx2 = canvas2.getContext("2d")
  /** @type {HTMLCanvasElement} */
  const canvas3 = document.getElementById("canvas3")
  const ctx3 = canvas3.getContext("2d")
  /** @type {HTMLCanvasElement} */
  const canvas4 = document.getElementById("canvas4")
  const ctx4 = canvas4.getContext("2d")

  const CANVAS_WIDTH =
    (canvas1.width =
    canvas2.width =
    canvas3.width =
    canvas4.width =
      500)

  const CANVAS_HEIGHT =
    (canvas1.height =
    canvas2.height =
    canvas3.height =
    canvas4.height =
      1000)

  const ENEMIES_NUM = 100
  const SHAKY_ENEMIES = []
  const ENDLESS_FLYING_ENEMIES = []
  const PATH_ENEMIES = []
  const ENEMIES = []

  for (let i = 0; i < ENEMIES_NUM; i++) {
    SHAKY_ENEMIES.push(
      new ShakyEnemy({
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        speed: Math.random() * 15 - 7.5,
        image: "./sprites/enemy1.png",
      })
    )

    ENDLESS_FLYING_ENEMIES.push(
      new EndlessFlyingEnemy({
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        speed: Math.random() * 4 + 1,
        image: "./sprites/enemy2.png",
      })
    )

    PATH_ENEMIES.push(
      new PathEnemy({
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        speed: Math.random() * 0.5 + 2.5,
        image: "./sprites/enemy3.png",
      })
    )

    ENEMIES.push(
      new Enemy({
        canvasWidth: CANVAS_WIDTH,
        canvasHeight: CANVAS_HEIGHT,
        speed: Math.random() * 0.5 + 2.5,
        image: "./sprites/enemy4.png",
      })
    )
  }

  let frameCount = 0

  const animate = () => {
    ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    for (const enemy of SHAKY_ENEMIES) {
      enemy.update({ frameCount })
      enemy.draw({ ctx1 })
    }

    for (const enemy of ENDLESS_FLYING_ENEMIES) {
      enemy.update({ frameCount })
      enemy.draw({ ctx2 })
    }

    for (const enemy of PATH_ENEMIES) {
      enemy.update({ frameCount })
      enemy.draw({ ctx3 })
    }

    for (const enemy of ENEMIES) {
      enemy.update({ frameCount })
      enemy.draw({ ctx4 })
    }

    frameCount++
    requestAnimationFrame(animate)
  }

  animate()
})
