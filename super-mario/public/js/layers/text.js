export function createTextLayer (font, text) {
  const size = font.size;
  return function drawText (context) {
    const textWidth = text.length;
    const screenWidth = Math.floor(context.canvas.width / size);
    const screenHeight = Math.floor(context.canvas.height / size);
    const x = screenWidth / 2 - textWidth / 2;
    const y = screenHeight / 2;
    font.print(text, context, x * size, y * size);
  };
}
