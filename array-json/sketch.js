// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

let ballImg;
let playerImg;
let Img;
let directImg;

let isLose = false;
let ball;
let bat;
let position;
let choice;
let attack;

let directOfPlayer;
let PLAYER_X;
let PLAYER_Y;
let new_y;
let bat_wid;
let bat_hei;

let isAttack = false;
let normalAtt = false;
let playerPosit_x;
let playerPosit_y;
let n = 0;
let k = 0;
let dy = 0;

let c1 = "white";
let c2 = "white";

function preload() {
  Img = loadImage("startScene.jpg");
  playerImg = loadImage("bat.png");
  ballImg = loadImage("ball.gif");
  directImg = loadImage("direction.png");

}

function setup() {
  createCanvas(400, 400);
  posit();
}

function draw() {

  background(Img);
  
  circleBar();
  ballSet();
  playerSet();
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
  
  // for playerPosit_x, n can't be lesser or greater than the array
  if (n > 0) {
    if (key === 'a') {
      n -= 1;
    }
  }
  if (n < 3) {
    if (key === 'd') {
      n += 1;
    }
  }
  
  // for playerPosit_y, dy can't be lesser or greater than the arra
  
  //attack set
  if (isAttack) {
    if (key === 'w') {
      // 1 is normal attack, 2 is special attack
      attack = [1,1,2];
      if (attack[k] === 1) {
        if (dy === 0) {
          dy += 1;
          normalAtt = true;
        }
      }
      else {
        console.log("special attack");
        k = 0;
      }
    }
  }
}

function playerSet() {
  isAttack = true;

  // player movesetting
  PLAYER_X = width/8-playerImg.width*0.02;
  PLAYER_Y = height-playerImg.height*0.07;
  playerPosit_x = [PLAYER_X, 4.3*PLAYER_X ,7.6*PLAYER_X,11*PLAYER_X];
  
  playerPosit_y = [PLAYER_Y, PLAYER_Y-30];

  //display player
  image(playerImg, playerPosit_x[n], playerPosit_y[dy], playerImg.width*0.08, playerImg.height*0.07);
  
  if (normalAtt) {
    k += 1;
    dy -= 1;
    normalAtt = false;
  }
  if (k === 2) {
    specialAtt(playerPosit_x[n], playerPosit_y[dy]);
  }
}

function circleBar() {
  fill(c1);
  circle(width-70,height-50,10);
  fill(c2);
  circle(width-50,height-50, 15);
  
  if (k === 0) {
    c1 = "white";
    c2 = "white";
  }
  if (k === 1) {
    c1 = "red";
  }
  if (k === 2) {
    c2 = "red";
    console.log("special attack is ready");
  }
}

function specialAtt() {
  image(directImg, playerPosit_x[n] + 50, playerPosit_y[dy], directImg.width * 0.05, directImg.height * 0.05);
}

function gameOver() {
  // detect the collision for the ball and the bat
  d = (playerPosit_x[n], playerPosit_y[dy], position.x, position.y);
  // if collide, game over
  if (d === 0) {
    overScene();
  }
}
  
function overScene() {
  isLose = true;
  background("black");
  fill("white");
  text("GAME OVER", width/2-30, height/2-20);
}



