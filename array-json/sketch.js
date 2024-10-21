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
let gb = 0;

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
  // remove heart when ball hit screen
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
  weaponIcon();
  //gameOver();
}
// ball display and ball movevment speed
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
  //case 1
  if (choice <= 25) {
    position = {
      x: width/8,
      y: 0,
    };
  }
  //case 2
  else if (choice <= 50) {
    position = {
      x: 3*width/8,
      y: 0,
    };
  }
  //case 3
  else if (choice <= 75) {
    position = {
      x: 5*width/8,
      y: 0,
    };
  }
  //case 4
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
  let id = height-50;
  //attack set
  if (isAttack) {
    if (key === 'w') {
      // 1 is bat attack, 2 is change to gun
      if (isGun === false) {
        attack = [1,1,2];
        if (attack[k] === 1) {
          if (dy === 0) {
            dy += 1;
            normalAtt = true;
          }
        }
        else {
          isGun = true;
          k = 0;
        }
      }
      // 1 is gun attack, 2 is change to bat
      else {
        attack = [1,1,1,2];
        if (attack[k] === 1) {
 
          circle(30, id,30);
          k += 1;
          id -= 7;
        }
        else {
          k = 0;
          isGun = false;
        }
      }
    } 
  } 
}

// player set of bat
function playerSet() {
  isAttack = true;
  // player movesetting
  PLAYER_X = width/8-playerImg.width*0.02;
  PLAYER_Y = height-playerImg.height*0.07;
  playerPosit_x = [PLAYER_X, 4.3*PLAYER_X ,7.6*PLAYER_X,11*PLAYER_X];
  
  playerPosit_y = [PLAYER_Y, PLAYER_Y-30];

  //display player
  if (!isLose && isGun === false) {
    image(playerImg, playerPosit_x[n], playerPosit_y[dy], playerImg.width*0.08, playerImg.height*0.07);
  }
  
  if (normalAtt) {
    normalAtt = false;
    dy -= 1;
    k += 1;
  }
  if (isGun) {
    attackGun(playerPosit_x, playerPosit_y, n, dy);
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

//display the weapon that I hold for icon
function weaponIcon() {
  if (isGun) {
    image(gunImg, 5,90, gunImg.width*0.03, gunImg.height*0.03);
  } 
  else {
    image(playerImg,-20, 90, playerImg.width*0.07, playerImg.height*0.04);
  }
}

function attackGun() {
  image(gunImg, playerPosit_x[n], playerPosit_y[dy], gunImg.width*0.05, gunImg.height*0.05);
}

function gameOver() {
  // detect the collision for the ball and the line

  if (!isLose) {
    d = (0, height, position.x, position.y);
    // if ball collide the screen, remove heart
    if (d === 0) {
      removeHeart = true;
    }
  }
  //gameover scene
  if (isLose) {
    background("black");
    fill("white");
    text("GAME OVER", width/2-30, height/2-20);
    text("Click anywhere to start", width/2-50, height/2+30);
  }
}
//go back to game scene 
function mouseClicked() {
  if (isLose) {
    to = 60;
    isLose = false;
  }
}