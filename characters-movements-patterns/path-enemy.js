class PathEnemy {
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
    this.angleSpeed = Math.random() * 2 + 0.2
  }

  update({ frameCount }) {
    this.x =
      (Math.sin((this.angle * Math.PI) / 90) *
        (this.canvasWidth - this.width * 2)) /
        2 +
      this.canvasWidth / 2 -
      this.width / 2

    this.y =
      (Math.cos((this.angle * Math.PI) / 720) *
        (this.canvasHeight - this.width * 2)) /
        2 +
      this.canvasHeight / 2 -
      this.height / 2

    if (this.x + this.width < 0) {
      this.x = this.canvasWidth
    }

    this.angle += this.angleSpeed

    if (frameCount % this.flapSpeed === 0 && frameCount % 10 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }

  draw({ ctx3 }) {
    ctx3.drawImage(
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
