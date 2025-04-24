const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleWidth = 10;
let paddleHeight = 100;

let leftPaddleY = 250;
let rightPaddleY = 250;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function draw() {
  // Clear the canvas
  drawRect(0, 0, canvas.width, canvas.height, "black");

  // Draw paddles
  drawRect(10, leftPaddleY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight, "white");
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
