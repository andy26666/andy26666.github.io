// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

// image of the sprite
let ballImg;
let playerImg;

let position;
let choice;
let new_x;
let new_y;
let player_x;
let player_y;

function preload() {
  ballImg = loadImage("ball.gif");
  playerImg = loadImage("player.jpg");
}

function setup() {
  createCanvas(400, 400);
  posit();
}

function draw() {
  background(220);
  
  player();
  ballSet();
}

function ballSet() {
  image(ballImg, position.x, position.y, 40, 40);
  
  // ball movement depends on balls position
  if (choice <= 25) {
    new_x = position.x--;
  }
  else if (choice <= 50) {
    new_x = position.x++;
  }
  else if (choice <= 75) {
    new_y = position.y++;
  }
  else {
    new_y = position.y--;
  }
}

function posit() {
  // balls position randomly
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
  player_x = width/2;
  player_y = height/2;
  image(playerImg, player_x, player_y, playerImg.width*0.1, playerImg.height*0.1);
}
