// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

let ballImg;
let playerImg;

let ball;
let bat;
let position;
let choice;
let new_x;
let new_y;

let PLAYER_X = 200;
let PLAYER_Y = 200;
let bat_wid;
let bat_hei;

function preload() {
  ballImg = loadImage("ball.gif");
  playerImg = loadImage("bat.png");
}

function setup() {
  createCanvas(400, 400);
  posit();
}

function draw() {
  background(220);

  player();
  ballSet();

  gameOver();
}

function ballSet() {
  ball = image(ballImg, position.x, position.y, 40, 40);

  if (choice <= 25) {
    new_x = position.x-=2;
    if (position.x < 0) {
      posit();
    }
  }
  else if (choice <= 50) {
    new_x = position.x+=2;
    if (new_x > width) {
      posit();
    }
  }
  else if (choice <= 75) {
    new_y = position.y+=2;
    if (new_y > height) {
      posit();
    }
  }
  else {
    new_y = position.y-=2;
    if (new_y < 0) {
      posit();
    }
  }
}

function posit() {
  choice = random(100);
  
  if (choice <= 25) {
    position = {
      x: width-40,
      y: height/2-20,
    };
  }
  else if (choice <= 50) {
    position = {
      x: 0,
      y: height/2-20,
    };
  }
  else if (choice <= 75) {
    position = {
      x: width/2-20,
      y: 0,
    };
  }
  else if (choice <= 100) {
    position = {
      x: width/2-20,
      y: height-40,
    };
  } 
  return position;
}

function player() {
  bat_wid = playerImg.width*0.09;
  bat_hei = playerImg.height*0.08
  bat = image(playerImg, PLAYER_X -playerImg.width*0.04, PLAYER_Y - playerImg.height*0.03, playerImg.width*0.09, playerImg.height*0.08);
  

}

function gameOver() {
  let d = dist(PLAYER_X, PLAYER_Y, position.x, position.y);

  if (position.x + playerImg.width*0.03 > PLAYER_X -playerImg.width*0.07 && position.x < PLAYER_X - playerImg.width*0.04 + playerImg.width*0.09 && position.y + playerImg.height*0.08 > PLAYER_Y - playerImg.height*0.03 && position.y < PLAYER_Y - playerImg.height*0.02 + playerImg.height*0.06) {
    //console.log("bump");
  }
  else {
    //console.log("safe");
  }
}