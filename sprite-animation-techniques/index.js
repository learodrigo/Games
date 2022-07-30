window.addEventListener("DOMContentLoaded", () => {
  let playerState = "idle"

  const dropdown = document.getElementById("animations")
  dropdown.addEventListener("change", (evt) => {
    playerState = evt.target.value
  })

  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  const PLAYER_IMAGE = new Image()
  PLAYER_IMAGE.src = "./sprites/shadow_dog.png"

  const CANVAS_WIDTH = (canvas.width = 600)
  const CANVAS_HEIGHT = (canvas.height = 600)
  const SPRITE_WIDTH = PLAYER_IMAGE.width / 12 + 2
  const SPRITE_HEIGHT = PLAYER_IMAGE.height / 10
  const STAGGER_FRAMES = 4

  let gameFrame = 0

  const ANIMATION_STATES = [
    {
      name: "idle",
      frames: 7,
    },
    {
      name: "jump",
      frames: 7,
    },
    {
      name: "fall",
      frames: 7,
    },
    {
      name: "run",
      frames: 9,
    },
    {
      name: "dizzy",
      frames: 11,
    },
    {
      name: "sit",
      frames: 5,
    },
    {
      name: "roll",
      frames: 7,
    },
    {
      name: "bite",
      frames: 7,
    },
    {
      name: "ko",
      frames: 12,
    },
    {
      name: "getHit",
      frames: 4,
    },
  ]
  const SPRITE_ANIMATIONS = []

  ANIMATION_STATES.forEach((state, index) => {
    const frames = {
      loc: [],
    }

    for (let j = 0; j < state.frames; j++) {
      const postX = j * SPRITE_WIDTH
      const postY = index * SPRITE_HEIGHT

      frames.loc.push({
        x: postX,
        y: postY,
      })
    }

    SPRITE_ANIMATIONS[state.name] = frames
  })

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position =
      Math.floor(gameFrame / STAGGER_FRAMES) %
      SPRITE_ANIMATIONS[playerState].loc.length

    const frameX = SPRITE_ANIMATIONS[playerState].loc[position].x
    const frameY = SPRITE_ANIMATIONS[playerState].loc[position].y

    ctx.drawImage(
      PLAYER_IMAGE,
      frameX,
      frameY,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      0,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT
    )

    gameFrame++
    requestAnimationFrame(animate)
  }

  animate()
})
