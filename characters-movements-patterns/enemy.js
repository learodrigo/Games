class Enemy {
  constructor({ canvasWidth, image, canvasHeight, speed = 1 }) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.image = new Image()
    this.image.src = image

    this.spriteWidth = this.image.width / 9
    this.spriteHeight = this.image.height

    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5

    this.x = Math.random() * (canvasWidth - this.width)
    this.y = Math.random() * (canvasHeight - this.height)

    this.newX = this.#randomizeX()
    this.newY = this.#randomizeY()

    this.speed = speed
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.interval = Math.floor(Math.random() * 200 + 50)
  }

  #randomizeX() {
    return Math.random() * (this.canvasHeight - this.height)
  }

  #randomizeY() {
    return Math.random() * (this.canvasHeight - this.height)
  }

  update({ frameCount }) {
    if (frameCount % this.interval === 0) {
      this.newX = this.#randomizeX()
      this.newY = this.#randomizeY()
    }

    const dx = this.x - this.newX
    const dy = this.y - this.newY

    this.x -= dx / 70
    this.y -= dy / 20

    if (this.x + this.width < 0) {
      this.x = this.canvasWidth
    }

    if (frameCount % this.flapSpeed === 0 && frameCount % 10 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }

  draw({ ctx4 }) {
    ctx4.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
