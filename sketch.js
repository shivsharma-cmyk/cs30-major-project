// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 4;
  }

  display() {

  }
}

function preload() {
  marioImg = loadImage("mario.png");
}