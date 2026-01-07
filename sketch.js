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
  marioImg = loadImage(".mario.png");
  marioJumpImg = loadImage(".mario-jumping.png");
  brickImg = loadImage(".mario-block.png");
  groundImg = loadImage(".mario-ground-block");
  qImg = loadImage(".mario-question-box");
  leftImg = loadImage(".mario-tube");
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
  brick.w = tileSize;
  brick.h = tileSize;

  questionBox = new Group();
  questionBox.collider = "s";
  questionBox.image = qImg;
  questionBox.tile = "?";
  questionBox.w = tileSize;
  questionBox.h = tileSize;

  pipeLeft = new Group();
  pipeLeft.collider = "s";
  pipeLeft.image = leftImg;
  pipeLeft.tile = "L";
  pipeLeft.w = tileSize;
  pipeLeft.h = tileSize;

  pipeRight = new Group();
  pipeRight.collider = "s";
  pipeRight.image = leftImg;
  pipeRight.tile = "R";
  pipeRight.w = tileSize;
  pipeRight.h = tileSize;
  
  pipeTL = new Group();
  pipeTL.collider = "s";
  pipeTL.image = lefImg;
  pipeTL.tile = "l";
  pipeTL.w = tileSize;
  pipeTL.h = tileSize;

  pipeTR = new Group();
  pipeTR.collider = "s";
  pipeTR.image = leftImg;
  pipeTR.tile = "r";
  pipeTR.w = tileSize;
  pipeTR.h = tileSize;
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

