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
let new_x;
let new_y;

let PLAYER_X = 200;
let PLAYER_Y = 200;
let bat_wid;
let bat_hei;


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



  player();
  ballSet();
  //gameOver();

}


function ballSet() {
  ball = image(ballImg, position.x, position.y, 40, 40);

  if (isLose !== true) {
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
}
// spawn ball in random place
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

  bat = image(playerImg, PLAYER_X -playerImg.width*0.04, PLAYER_Y - playerImg.height*0.03, playerImg.width*0.08, playerImg.height*0.07);
  
  if (keyIsPressed === true) {
    if (keyCode === "w") {
      bat.rotate(45);
    }
    if (keyCode === "a") {
      shoot();
    }
    if (keyCode === "s") {
      shoot();
    }
    if (keyCode === "d") {
      shoot();
    } 
  }
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
    
  }
}