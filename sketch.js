// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
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
let topSensor;
let bottomSensor;
let deathCount = 0;
let goombaKills = 0;
let startTime;
let elapsedTime = 0;
let coinCount = 0;
let gameOver = false;
let levelEndX = 3100;

// It ensures images are fully loaded before the game starts
function preload() {
  marioImg = loadImage('images/mario.png');
  brickImg = loadImage('images/mario-block.png');
  groundImg = loadImage('images/mario-ground-block.png');
  qImg = loadImage('images/mario-question-box.png');
  leftImg = loadImage('images/mario-left.png');
  rightImg = loadImage('images/mario-right.png');
  topLeftImg = loadImage('images/mario-top-left.png');
  topRightImg = loadImage('images/mario-top-right.png');
  stoneImg = loadImage('images/mario-stone-block.png');
  goombaImg = loadImage('images/mario-goomba.png');
}

//setup() runs ONCE when the program starts
function setup() {
  createCanvas(windowWidth, 242);
  
  // Apply gravity to ALL dynamic objects
  world.gravity.y = 40;

  // Create a parent group for all walkable surfaces
  walkable = new Group();

  // GROUND BLOCKS
  ground = new walkable.Group();  // ground is walkable
  ground.collider = 's';          // 's' = static (does not move)
  ground.image = groundImg;       // assign image
  ground.tile = '=';              // symbol used in tile map
  ground.w = tileSize;            // width
  ground.h = tileSize;            // height

  // BRICK BLOCKS
  brick = new walkable.Group();
  brick.collider = 's';
  brick.image = brickImg;
  brick.tile = 'b';
  brick.w = tileSize;
  brick.h = tileSize;

  // QUESTION BOXES
  questionBox = new walkable.Group();
  questionBox.collider = 's';
  questionBox.image = qImg;
  questionBox.tile = '?';
  questionBox.w = tileSize;
  questionBox.h = tileSize;

  // PIPE BODY (LEFT & RIGHT)
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
   
  // PIPE TOPS
  pipeTL = new walkable.Group();
  pipeTL.collider = 's';
  pipeTL.image = topLeftImg;
  pipeTL.tile = 'l';
  pipeTL.w = tileSize;
  pipeTL.h = tileSize;

  pipeTR = new walkable.Group();
  pipeTR.collider = 's';
  pipeTR.image = topRightImg;
  pipeTR.tile = 'r';
  pipeTR.w = tileSize;
  pipeTR.h = tileSize;

  // STONE BLOCKS
  stone = new walkable.Group();
  stone.collider = 's';
  stone.image = stoneImg;
  stone.tile = 'd';
  stone.w = tileSize;
  stone.h = tileSize;

  // GOOMBA ENEMIES
  goomba = new Group();
  goomba.collider = 'd'; // 'd' = dynamic (affected by gravity)
  goomba.rotationLock = true; // prevents spinning when colliding
  goomba.image = goombaImg;
  goomba.tile = 'g';
  goomba.w = tileSize;
  goomba.h = tileSize;
  // Direction the Goomba is moving
  goomba.facing = -1; // -1 = left, 1 = right

  // MARIO PLAYER
  mario = new Sprite( 16, 160, 25, 25);
  mario.rotationLock = true;
  mario.spriteSheet = marioImg;
  mario.addAnis(
    {
      run: { row:0, frames:2},  // running animation
      stand: { row:0, frames:1}, // idle frame
    }
  );

  mario.scale = 0.6; // scale Mario down to fit tiles

  // COLLISION SENSORS

  // Sensor above Mario’s head
  topSensor = new Sprite(mario.x, mario.y - mario.h/2);

  // Sensor below Mario’s feet
  bottomSensor = new Sprite(mario.x, mario.y + mario.h/2);

  // Sensors are very thin
  topSensor.w = mario.w/2;
  topSensor.h = 2;
  bottomSensor.w = mario.w/2;
  bottomSensor.h = 2;

  // Sensors should not be visible
  bottomSensor.visible = false;
  topSensor.visible = false;

  // Glue sensors to Mario so they move together
  let bottomJoint = new GlueJoint(mario, bottomSensor);
  let topJoint = new GlueJoint(mario, topSensor);
  topJoint.visible = false;
  bottomJoint.visible = false;

  //collisions

  // If Mario stomps a Goomba from above → remove Goomba
  bottomSensor.overlaps(goomba,(s,g)=> {
    g.remove();
    addGoombaKill();
  });

  // If Mario hits a question box from below → turn it into a brick
  topSensor.overlaps(questionBox,(s,q)=> {
    // If this question box was NOT used yet
  if (!q.used) {

    q.used = true;        // mark box as used
    q.image = brickImg;  // change to brick
    addCoin();           // add ONE coin
  }
  });

  // TILE MAP (LEVEL DESIGN)
  new Tiles(
    [
      '...................................................................................................................................................................................................................',
      '...................................................................................................................................................................................................................',
      '...................................................................................................................................................................................................................',
      '...................................................................................................................................................................................................................',
      '...................................................................................................................................................................................................................',
      '...................................................................................................................................................................................................................',
      '......................?..........................................................bbbbbbbb...bbb?..............?...........bbb....b??b........................................................dd....................',
      '............................................................................................................................................................................................ddd....................',
      '...........................................................................................................................................................................................dddd....................',
      '..........................................................................................................................................................................................ddddd....................',
      '................?...b?b?b.....................lr.........lr...................b?b....................bb....?..?..?.....b..........bb......d..d..........dd..d............bb?b............dddddd....................',
      '......................................lr......LR.........LR..............................................................................dd..dd........ddd..dd..........................ddddddd....................',
      '............................lr........LR......LR.........LR.................................lr..........................................ddd..ddd......dddd..ddd.....lr..............lr.dddddddd....................',
      '......................g.....LR........LR.g....LR..g.g....LR.................................LR..g.g.............g.g.......g..g.........dddd..dddd....ddddd..dddd....LR....g...g.....LRddddddddd....................',
      '======================================================================..===============...================================================================..=======================================================',
      '======================================================================..===============...================================================================..======================================================='],
    0,            // x offset
    16,           // y offset
    tileSize,     // tile width
    tileSize - 1  // tile height
  );

  // Start every Goomba moving left
  for(g of goomba) {
    g.vel.x = -1;
  }

  startTimer();
}

// recalling all the functions 
function draw() {
  if (gameOver) {
    clear();
    background(0); 
    drawEndScreen();
    return;
  }

  // Clear previous frame
  clear();
  
  //sky
  background(92, 148, 252);

  moveMario();
  moveEnemies();
  moveCamera();
  OOB(); // out-of-bounds check
  updateTimer();
  checkLevelEnd();
  drawHUD();
}

// MARIO MOVEMENT LOGIC
function moveMario() {

  // Move right
  if(kb.pressing('d')) {
    mario.vel.x = 2.5;     // mario x speed
    mario.ani = 'run';     // run animation
    mario.mirror.x = false;  
  }
  
  // Move left
  else if(kb.pressing('a')) {
    mario.vel.x = -2.5;
    mario.ani = 'run';
    mario.mirror.x = true;
  }

  // Not moving
  else {
    mario.ani = 'stand';
  }

  // Jumping
  if(kb.presses("w") && bottomSensor.colliding(walkable)) {
    mario.vel.y = -11;
  }

  // If Mario touches a Goomba → reset level
  if (mario.overlapping(goomba) > 1) {
    countDeath();
    reset();
  }
}

// goomba movement
function moveEnemies() {

  // Move in the direction Goomba is facing
  for(g of goomba) {

    // Turn around when hitting obstacles
    g.vel.x = floor(g.facing);
    if(g.colliding(pipeLeft) > 2) {
      g.facing *=-1;
    }
    
    if(g.colliding(goomba) > 1) {
      g.facing *=-1;
    }
    
    if(g.colliding(pipeRight) > 2) {
      g.facing *=-1;
    }
    if(g.colliding(stone) > 2) {
      g.facing *=-1;
    }
  }
}

// CAMERA FOLLOW
function moveCamera() {

  // Lock camera until Mario reaches a certain point
  if(mario.x < 750) {
    camera.x = 750;
  }
  
  else{
    camera.x = mario.x;
  }
}

// RESET MARIO POSITION
function reset() {

  // Reset Mario position
  mario.x = 16;
  mario.y = 160;

  // Re-align sensors
  topSensor.x = mario.x;
  topSensor.y = mario.y - mario.h/2;
  bottomSensor.x = mario.x;
  bottomSensor.y = mario.y + mario.h/2;
}

// OUT-OF-BOUNDS CHECK
function OOB() {
  // If Mario falls off the map or goes too high
  if(mario.y < 10 || mario.y > 700) {
    countDeath();
    reset();
  }
}

// This function increases the death counter by 1
function countDeath() {
  deathCount++;
}

// This function starts the timer by saving the current time
function startTimer() {
  startTime = millis();
}

// This function updates the timer every frame
function updateTimer() {
  elapsedTime = floor((millis() - startTime) / 1000);
}

// This function increases the goomba kill counter by 1
function addGoombaKill() {
  goombaKills++;   
}

// This function increases the coin counter by 1
function addCoin() {
  coinCount++; 
}

// This function draws the HUD (Heads-Up Display) on the screen
function drawHUD() {
  push(); // Saves the current drawing settings
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);

  let x = 20;
  let y = 20;
  let spacing = 20;

  text("Time: " + elapsedTime + "s", x, y);
  text("Deaths: " + deathCount, x, y + spacing);
  text("Kills: " + goombaKills, x, y + spacing * 2);
  text("Coins: " + coinCount, x, y + spacing * 3);

  pop(); // Restores the previous drawing settings
}

// This function checks if Mario has reached the end of the level
function checkLevelEnd() {
  if (mario.x >= levelEndX && !gameOver) {
    gameOver = true; 
  }
}

// This function draws the end screen when the level is complete
function drawEndScreen() {
  push();

  background(0, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(28);
  text("LEVEL COMPLETE!", width / 2, height / 2 - 80);

  textSize(18);
  text("Time: " + elapsedTime + "s", width / 1.5, height / 2 - 20);
  text("Deaths: " + deathCount, width / 1.5, height / 2 + 10);
  text("Goombas Killed: " + goombaKills, width / 1.5, height / 2 + 40);
  text("Coins: " + coinCount, width / 1.5, height / 2 + 70);
  text("Refresh the page to play again", width / 1.5, height / 2 + 90);

  pop();
}
