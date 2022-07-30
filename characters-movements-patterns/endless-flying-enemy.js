class EndlessFlyingEnemy {
  constructor({ canvasWidth, image, canvasHeight, speed = 1 }) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.image = new Image()
    this.image.src = image

    this.spriteWidth = this.image.width / 6
    this.spriteHeight = this.image.height

    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5

    this.x = Math.random() * (canvasWidth - this.width)
    this.y = Math.random() * (canvasHeight - this.height)

    this.speed = speed
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)

    this.angle = Math.random() * 2
    this.angleSpeed = Math.random() * 0.2 - 0.2
    this.curve = Math.random() * 7
  }

  update({ frameCount }) {
    this.x -= this.speed

    if (this.x + this.width < 0) {
      this.x = this.canvasWidth
    }

    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed

    if (frameCount % this.flapSpeed === 0 && frameCount % 10 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }

  draw({ ctx2 }) {
    ctx2.drawImage(
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
