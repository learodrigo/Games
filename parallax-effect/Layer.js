class Layer {
  constructor(image, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = image.width
    this.height = image.height
    this.image = image
    this.speedModifier = speedModifier
  }

  update(gameSpeed) {
    this.speed = gameSpeed * this.speedModifier

    if (this.x <= -this.width) {
      this.x = 0
    }

    this.x = this.x - this.speed
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}
