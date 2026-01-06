// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let map;
let ground;
let brick;
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
  brickImg = loadImage("mario-block.png");
  groundImg = loadImage("mario-ground-block");
  qImg = loadImage("mario-question-box");
  leftImg = loadImage("mario-tube");
}

function setup() {
  createCanvas(windowWidth, 242);
  world.gravity.y = 40;

  ground = new Group();
  ground.collider = "s";
  ground.image = groundImg;
  ground.tile = "=";
  ground.w = tileSize;
  ground.h = tileSize;

  brick = new Group();
  brick.collider = "s";
  brick.image = brickImg;
  brick.tile = "b";
  brick.w = 16;
  brick.h = 16;

  questionBox = new Group();
  questionBox.collider = "s";
  questionBox.image = qImg;
  questionBox.tile = "?";
  questionBox.w = 16;
  questionBox.h = 16;
  
}

function draw() {
  clear();
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

