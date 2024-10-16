// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

let ballImg;
let playerImg;
let Img;

let isLose = false;
let ball;
let bat;
let position;
let choice;

let directOfPlayer;
let PLAYER_X;
let PLAYER_Y;
let bat_wid;
let bat_hei;

let playerPosit;
let n = 0;

function preload() {
  Img = loadImage("startScene.jpg");
  playerImg = loadImage("bat.png");
  ballImg = loadImage("ball.gif");

}

function setup() {
  createCanvas(400, 400);

  posit();
  preload();

}

function draw() {

  background(Img);


  playerSet();
  ballSet();
  //gameOver();

}


function ballSet() {
  ball = image(ballImg, position.x, position.y, 40, 40);

  if (isLose !== true) {
    position.y += 2;
    if (position.y > height) {
      posit();
    }
  }

}
// spawn ball in random place
function posit() {
  choice = random(100);
  
  if (choice <= 25) {
    position = {
      x: width/8,
      y: 0,
    };
  }
  else if (choice <= 50) {
    position = {
      x: 3*width/8,
      y: 0,
    };
  }
  else if (choice <= 75) {
    position = {
      x: 5*width/8,
      y: 0,
    };
  }
  else if (choice <= 100) {
    position = {
      x: 7*width/8,
      y: 0,
    };
  } 
  return position;
}
function keyTyped() {
  if (n > -1 && n < 4) {
    if (key === 'a') {
      console.log(n -= 1);
    }
    if (key === 'd') {
      console.log(n += 1);
    }
  }
  else {
    if (n === 4) {
      n = 3;
    }
    if (n === -1) {
      n = 0;
    }
  }
}

function playerSet() {
  PLAYER_X = width/8-playerImg.width*0.02;
  PLAYER_Y = height-playerImg.height*0.07;
  playerPosit = [PLAYER_X, 4.3*PLAYER_X, 7.6*PLAYER_X,11*PLAYER_X];


  image(playerImg, playerPosit[n], PLAYER_Y, playerImg.width*0.08, playerImg.height*0.07);
}


function gameOver() {
  // detect the collision for the ball and the bat
  d = dist(PLAYER_X, PLAYER_Y, position.x, position.y);

  // if collide, game over

  if (d < 30) {
    overScene();
  }
}
  

function overScene() {
  isLose = true;
  background("black");
  fill("white");
  text("GAME OVER", width/2-30, height/2-20);
}

function shoot() {
  let attack = {
    
  };
}