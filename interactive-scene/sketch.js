// Interactive Scene
// Kevin Lee


let Img;
let GameImg;
let GamestageImg;
let CatImg;
let Startbutton;
let x = 200;
let y = 200;
let speed = 5;
let ColorList = ['white','red','navy','purple', 'orange', 'blue','black','pink','green'];
let timer = 3;


//variable of scene checker
var buttonTrue = true;
var description = false;
var playscene = false;
var IsGame = false;
var OverWall = false;
var GameOver = false;

function setup() {
  
  //img of game
  Img = loadImage('Start Scene.png');
  GameImg = loadImage('Game.jpg');
  GamestageImg = loadImage('Playscene.png');
  CatImg = loadImage('Cat.png');
  createCanvas(700, 400);
  
  GameButton();
}

function draw() {
  if (buttonTrue === true){
    background(Img);
    GameText();  
    Startbutton.show();
  }
  if (description == true) {
      background(GameImg);
      Startbutton.hide();
      GameText();
  }
  if (playscene === true) {
    background(GamestageImg);
    GameText();
  }

  if (IsGame === true) {
    background(GamestageImg);
    GameSet();
  }
  if (OverWall === true) { 
    GameText();
  }

}

function GameButton() {
    // start button
  if (buttonTrue === true){
    Startbutton = createButton('START');
    Startbutton.size(150,50);
    Startbutton.position(275, 300);
    
    Startbutton.mousePressed(GameChapter);
  }
}

function GameText() {
    //Title text of start scene
  
  if (buttonTrue === true) {
    fill('skyblue');

    textSize(40);
    text('COlOUR GAME',400-textWidth(),100);
  
  // creater text
    textSize(25);
    text('created by Kevin Lee', 270,200);
  }
  
  //text of description
  if (description === true) {
    
    //title of introduction
    fill('black');
    textSize(40);
    textAlign(CENTER);
    text('HOW TO PLAY?',350, 80);
    
    //text of small sentence
    textSize(25);
    textAlign(CENTER);
    textWrap(WORD);
    text('Press WASD to move.', 350,150);
    text('Press Q to pause.',350, 200);
    text('Press Any key to start', 350, 300);
  }
  if (playscene === true) {
    textSize(80);
    textAlign(CENTER, CENTER);
    text(timer,width/2, height/2);
    time();
  }
}

function time() {
    if (frameCount % 60 === 0 && timer > 0) { 
      timer -= 1;    
     }
    else if (timer === 0) {
      playscene = false;
      IsGame = true;
    }
}

//function of the game
function GameChapter() {
  if (buttonTrue === true) {
    buttonTrue = false;
    description = true;
  }

}

//function of Keyboard
function keyPressed() {
  if (description === true) {
    description = false;
    playscene = true;
  }
  if (OverWall === true) {
    OverWall = false;
  }

}



/////////////////////////////////////////
//function of game

function GameSet() {
  You();
  ColourScreen();
  ColorGround();
}

//function of your character
function You() {
  image(CatImg, x, y,
        CatImg.width*0.3, CatImg.height*0.2);
  KeyInteract();
  IsWall();
}

function KeyInteract() {
  
  if (keyIsDown(87)) {  //w
    y -= speed;
  }
  if (keyIsDown(83)) {  //s
    y += speed;
  }
  if (keyIsDown(65)) {  //a
    x -= speed;
  }
  if (keyIsDown(68)) {  //d
    x += speed;
  }
}

function IsWall() {
  if (x >= width - CatImg.width*0.3 || x <= 0 + CatImg.width*0.3) {
    OverWall = true;
  }
  if (y >= height - CatImg.height*0.2 || y <= 0 + CatImg.height*0.2) {
    OverWall = true;
  }
}

function ColourScreen() {
  fill(random(ColorList));
  square(width/2 - 25, 25, 50);
  if (frameCount % 60 === 0 && timer > 0) { 
      timer -= 1;    
     }
}

function ColorGround() {
  
  
  
  let xCoordinates = [];
  for (let y = height; y > height/3; y-= height/5) {
    for (let x = 0; x < width; x += width/5) {
      xCoordinates.push(x);

    }
    for (let x of xCoordinates) {
      fill('red');
      rect(x, y, width/5, height/5);


    }
  }
}