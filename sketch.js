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
let topLeftImg;
let topRightImg;
let rightImg;
let leftImg;
let marioImg;
let marioJumpImg;
let goombaImg;
let stoneImg;
let mario;
let goomba;

// puting the image in
function preload() {
  marioImg = loadImage('mario.png');
  marioJumpImg = loadImage('mario-jumping.png');
  brickImg = loadImage('mario-block.png');
  groundImg = loadImage('mario-ground-block.png');
  qImg = loadImage('mario-question-box.png');
  leftImg = loadImage('mario-left.png');
  rightImg = loadImage('mario-right.png');
  topLeftImg = loadImage('mario-top-left.png');
  topRightImg = loadImage('mario-top-right.png');
  stoneImg = loadImage('mario-stone-block.png');
  goombaImg = loadImage('mario-goomba.png');
}

function setup() {
  createCanvas(windowWidth, 242);
    world.gravity.y = 40;

    ground = new Group();
    ground.collider = 's';
    ground.image = groundImg;
    ground.tile = '=';
    ground.w = tileSize;
    ground.h = tileSize;

    brick = new Group();
    brick.collider = 's';
    brick.image = brickImg;
    brick.tile = 'b';
    brick.w = tileSize;
    brick.h = tileSize;

    questionBox = new Group();
    questionBox.collider = 's';
    questionBox.image = qImg;
    questionBox.tile = '?';
    questionBox.w = tileSize;
    questionBox.h = tileSize;

    pipeLeft = new Group();
    pipeLeft.collider = 's';
    pipeLeft.image = leftImg;
    pipeLeft.tile = 'L';
    pipeLeft.w = tileSize;
    pipeLeft.h = tileSize;

    pipeRight = new Group();
    pipeRight.collider = 's';
    pipeRight.image = rightImg;
    pipeRight.tile = 'R';
    pipeRight.w = tileSize;
    pipeRight.h = tileSize;
      
    pipeTL = new Group();
    pipeTL.collider = 's';
    pipeTL.image = topLeftImg;
    pipeTL.tile = 'l';
    pipeTL.w = tileSize;
    pipeTL.h = tileSize;

    pipeTR = new Group();
    pipeTR.collider = 's';
    pipeTR.image = topRightImg;
    pipeTR.tile = 'r';
    pipeTR.w = tileSize;
    pipeTR.h = tileSize;

    stone = new Group();
    stone.collider = 's';
    stone.image = stoneImg;
    stone.tile = 'd';
    stone.w = tileSize;
    stone.h = tileSize;

    goomba = new Group();
    goomba.collider = 'd';
    goomba.rotationLock = true;
    goomba.image = goombaImg;
    goomba.tile = 'g';
    goomba.w = 16;
    goomba.h = 16;
    goomba.facing = -1;

    mario = new Sprite( 16, 160, 25, 25);
    mario.rotationLock = true;
    mario.spriteSheet = marioImg;
    mario.addAnis(
      {
        run: { row:0, frames:2},
        stand: { row:0, frames:1},
      }
    );

    mario.scale = 0.6;

    new Tiles(
      [
        '...................................................................................................................................................................................................................',
        '...................................................................................................................................................................................................................',
        '...................................................................................................................................................................................................................',
        '...................................................................................................................................................................................................................',
        '..................................................................................g.g..............................................................................................................................',
        '......................?..........................................................bbbbbbbb...bbb?..............?...........bbb....b??b........................................................dd....................',
        '............................................................................................................................................................................................ddd....................',
        '...........................................................................................................................................................................................dddd....................',
        '..........................................................................................................................................................................................ddddd....................',
        '................?...b?b?b.....................lr.........lr...................b?b..............b.....bb....?..?..?.....b..........bb......d..d..........dd..d............bb?b............dddddd....................',
        '......................................lr......LR.........LR..............................................................................dd..dd........ddd..dd..........................ddddddd....................',
        '............................lr........LR......LR.........LR.............................................................................ddd..ddd......dddd..ddd.....lr..............lr.dddddddd....................',
        '......................g.....LR........LR.g....LR..g.g....LR.....................................g.g.............g.g.......g..g.........dddd..dddd....ddddd..dddd....LR....g...g.....LRddddddddd....................',
        '======================================================================..===============...================================================================..=======================================================',
        '======================================================================..===============...================================================================..======================================================='],
        0,
        16,
        tileSize,
        tileSize - 1);
}

function draw() {
  clear()
  background(92, 148, 252);
  if (kb.pressing("d")) {
    camera.x += 2;
  }
  else if (kb.pressing("a")) {
    camera.x -= 2;
  }
  moveMario();
}

function moveMario() {
  if(kb.pressing('d')) {
    mario.vel.x = 3;
    mario.ani = 'run'
    mario.mirror.x = false;
  }
  
  else if(kb.pressing('a')) {
    mario.vel.x = -3;
    mario.ani = 'run'
    mario.mirror.x = true;
  }

  else {
    mario.ani = 'stand';
  }

  if(kb.presses("w") && (mario.colliding(ground) || mario.colliding(brick) || mario.colliding(stone) || mario.colliding(questionBox) || mario.colliding(pipeTL) || mario.colliding(pipeTR))) {
    mario.vel.y = -10;
  }
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