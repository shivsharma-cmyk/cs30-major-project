// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let map;
let ground;
let bricks;
let questionBox;
let pipe;
let tileSize = 16;
let brickImg;
let groundImg;
let qImg;
let topLeft;
let topRight;
let rightImg;
let leftImg;
let marioImg;
let marioJumpImg;
let x;
let y;
let dx;
let dy;
let time;
let size;
let jump;

// puting the image in
function preload() {
  marioImg = loadImage("mario.png");
  marioJumpImg = loadImage("mario-jumping.png");
}

function setup() {
  createCanvas(windowWidth, 242);
  background(255);
}

function draw() {
  background(92, 148, 252);
}

// move image to x and y
function movePlayer() {
}

function playerJump() {

}

function keyPressed() {
  // move image up
  if (key === "w") {
    movePlayer();
  }
  // move image left
  else if (key === "a") {
    movePlayer();
  }
  // move image right
  else if (key === "d") {
    movePlayer();
  }
}

