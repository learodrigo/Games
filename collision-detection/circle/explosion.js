class Explosion {
  constructor(x, y) {
    this.image = new Image()
    this.sound = new Audio("./assets/audio/boom.wav")
    this.image.src = "./assets/sprites/boom.png"

    this.spriteWidth = this.image.width / 5
    this.spriteHeight = this.image.height

    this.width = this.spriteWidth * 0.7
    this.height = this.spriteHeight * 0.7

    this.x = x
    this.y = y

    this.frame = 0
    this.timer = 0
    this.angle = Math.random() * 6.2
  }

  update() {
    if (this.frame === 0) this.sound.play()

    if (++this.timer % 10 === 0) {
      this.frame++
    }
  }

  draw(ctx) {
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.restore()
  }
}
