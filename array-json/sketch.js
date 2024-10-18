// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

let ballImg;
let playerImg;
let Img;
let gunImg;

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
let to = 60;

let isAttack = false;
let normalAtt = false;
let removeHeart = false;
let isGun = false;
let playerPosit_x;
let playerPosit_y;
let n = 0;
let k = 0;
let dy = 0;

let button;
let cc = [];
let gunBullet = [1,1,2,0];
let gb = 0;
let c1 = "white";
let c2 = "white";

function preload() {
  Img = loadImage("startScene.jpg");
  playerImg = loadImage("bat.png");
  ballImg = loadImage("ball.gif");
  gunImg = loadImage("gun.png");

}

function setup() {
  createCanvas(400, 400);

  posit();
  preload();
}


function draw() {
  background(Img);
  if (removeHeart === true) {
    to-=20;
    removeHeart = false;
    if (to <= 0) {
      gameOver();
      isLose = true;
    }
  }
  for (let r = 20; r <= to; r+= 20) {
    heart(15, r, 15);
  }
  playerSet();
  ballSet();
  //gameOver();
}

function ballSet() {
  if (!isLose) {
    ball = image(ballImg, position.x, position.y, 40, 40);
  }

  if (!isLose) { 
    position.y += 5;
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
      if (attack[k] === 2) {

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
  if (!isLose) {
    image(playerImg, playerPosit_x[n], playerPosit_y[dy], playerImg.width*0.08, playerImg.height*0.07);
  }
  
  if (normalAtt) {
    k += 1;
    dy -= 1;
    normalAtt = false;
  }
  if (k === 2) {
    gunIcon();
  }

}

function circleBar(x,y,size) {
  
  if (k === 0) {
    cc.push(y);
    console.log(cc[0]);
  }
  if (k === 1) {
    
  }
  if (k === 2) {
    c2 = "red";
    console.log("special attack is ready");

  }
}

function heart(x, y, size) {
  beginShape();
  //set x,y position
  vertex(x, y);
  fill("red");
  //draw left side of heart
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  //draw right side of heart
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function gunIcon() {
  image(gunImg, 5,90, gunImg.width*0.03, gunImg.height*0.03);
  
}

function attackGun() {


  if (gunBullet[gb] === 1) {
    square(30,30,20,20)
    gb += 1;
  }
  if (gunBullet[gb] === 2) {
    square(30,30,40,40);
    gb += 1;
  }
  else {
    k = 0;
  }
  console.log("gun");
}

function gameOver() {
  // detect the collision for the ball and the line

  if (!isLose) {
    d = (0, height, position.x, position.y);
    // if collide, game over
    if (d === 0) {
      removeHeart = true;
    }
  }

  if (isLose) {
    background("black");
    fill("white");
    text("GAME OVER", width/2-30, height/2-20);
    text("Click anywhere to start", width/2-50, height/2+30);
  }
}

function mouseClicked() {
  if (isLose) {
    to = 60;
    isLose = false;
  }
}





