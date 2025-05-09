const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let upPressed = false;
let downPressed = false;
let sPressed = false;
let wPressed = false;
let paddleWidth = 10;
let paddleHeight = 100;
let speed = 5; // Set speed of paddle movement

let leftPaddleY = 250;
let rightPaddleY = 250;

// Draw a rectangle (paddle or background)
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Draw the game elements
function draw() {
  // Clear the canvas
  drawRect(0, 0, canvas.width, canvas.height, "black");

  // Draw paddles
  drawRect(10, leftPaddleY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight, "white");
}

// Add event listeners for key press and release
document.addEventListener("keydown", function(event) {
  if (event.key === "w") {
    wPressed = true;
  }
  if (event.key === "s") {
    sPressed = true;
  }
  if (event.key === "ArrowUp") {
    upPressed = true;
    console.log("Up pressed");
  }
  if (event.key === "ArrowDown") {
    downPressed = true;
    console.log("Down pressed");
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "w") {
    wPressed = false;
  }
  if (event.key === "s") {
    sPressed = false;
  }
  if (event.key === "ArrowUp") {
    upPressed = false;
    console.log("Up released");
  }
  if (event.key === "ArrowDown") {
    downPressed = false;
    console.log("Down released");
  }
});

// Game loop to update paddle positions
function gameLoop() {
  if (wPressed) {
    // Move the left paddle up, but don't go off-screen
    if (leftPaddleY > 0) {
      leftPaddleY -= speed;
    }
  }

  if (sPressed) {
    // Move the left paddle down, but don't go off-screen
    if (leftPaddleY + paddleHeight < canvas.height) {
      leftPaddleY += speed;
    }
  }

  // Right paddle movement
  if (upPressed) {
    // Move the right paddle up, but don't go off-screen
    if (rightPaddleY > 0) {
      rightPaddleY -= speed;
    }
  }

  if (downPressed) {
    // Move the right paddle down, but don't go off-screen
    if (rightPaddleY + paddleHeight < canvas.height) {
      rightPaddleY += speed;
    }
  }

  // Redraw everything on the canvas
  draw();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
