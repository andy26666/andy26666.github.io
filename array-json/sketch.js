// Array and Object Notation Assignment
//Kevin Lee
// 10/8/2024

let ballImg;
let playerImg;
let Img;

// variable of detect lose or not
let isLose = false;

let ball;
let bat;
let position;
let PLAYER_X;
let PLAYER_Y;


// variable of heart reduce
let to = 60;

let removeHeart = false;

// variable of bat x,y position
let playerPosit_x;
//variable of use bat x,y array[k], array[dy]
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
  
  // remove heart when ball hit screen
  if (removeHeart === true) {
    to-=20;
    removeHeart = false;
    if (to <= 0) {
      gameOver();
      isLose = true;
    }
  }
  //function of drawing heart
  for (let r = 20; r <= to; r+= 20) {
    heart(15, r, 15);
  }
  
  // function of ball and bat
  playerSet();
  ballSet();
  
  // detect ball and bat hit to use x,y position, if hit the ball remove
  if (!(playerPosit_x[n] > position.x + 40 ||
           playerPosit_x[n] + playerImg.width*0.08 < position.x ||
           PLAYER_Y > position.y + 40 ||
           PLAYER_Y+ playerImg.height*0.07 < position.y)) {
    to += 20;
    posit();
  }  
  weaponIcon();
  gameOver();
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
}

// player set of bat
function playerSet() {
  // player movesetting
  PLAYER_X = width/8-playerImg.width*0.02;
  PLAYER_Y = height-playerImg.height*0.07;
  
  playerPosit_x = [PLAYER_X, 4.3*PLAYER_X ,7.6*PLAYER_X,11*PLAYER_X];
  


  //display player
  image(playerImg, playerPosit_x[n], PLAYER_Y, playerImg.width*0.08, playerImg.height*0.07);


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
  image(playerImg,-20, 90, playerImg.width*0.07, playerImg.height*0.04);
}


function gameOver() {
  // detect the collision for the ball and the line

  if (!isLose) {
    d = (0, 400, position.x, position.y);
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