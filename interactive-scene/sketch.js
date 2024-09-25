// Interactive Scene
// Kevin Lee


let Img;
let GameImg;
let GamestageImg;
let CatImg;
let Startbutton;
let ColorList = ["white","red","navy","purple", "orange", "blue","black","pink","green", "lightblue", "yellow", "darkblue", "lightgreen", "darkgreen", "grey"];
let ColorChoice;
let ColorScreenChoice;
let CorrectPlace;
let speed = 5;
let timer = 3;
let c = [];
let x = 200;
let y = 50;

//variable of scene checker
let buttonTrue = true;
let description = false;
let playscene = false;
let IsGame = false;
let IsPause = false;

//variable for wall
let FrontWall = false;
let BehindWall = false;
let LeftWall = false;
let RightWall = false;

let GameOver = false;

function setup() {
  
  //img of game
  Img = loadImage("Start Scene.png");
  GameImg = loadImage("Game.jpg");
  GamestageImg = loadImage("Playscene.png");
  CatImg = loadImage("Cat.png");
  createCanvas(700, 400);
  
  ColorChoice = random(ColorList);
  ColorScreenChoice = random(ColorList);
  
  for (let y = height; y >= height/3; y-= height/6) {
    c[y]= [];
    for (let x = 0; x < width; x+= width/5) {
      c[y][x] = color(random(ColorList));
    }
  }
  
  GameButton();
}

function draw() {
  if (buttonTrue === true){
    background(Img);
    GameText();  
    Startbutton.show();
  }
  if (description === true) {
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
}

function GameButton() {
  // start button
  if (buttonTrue === true){
    Startbutton = createButton("START");
    Startbutton.size(150,50);
    Startbutton.position(275, 300);
    
    Startbutton.mousePressed(GameChapter);
  }
}

function GameText() {
  //Title text of start scene
  
  if (buttonTrue === true) {
    fill("skyblue");

    textSize(40);
    text("COlOUR GAME",400-textWidth(),100);
  }
 
  //text of description
  if (description === true) {
    
    //title of introduction
    fill("black");
    textSize(40);
    textAlign(CENTER);
    text("HOW TO PLAY?",350, 50);
    
    //text of small sentence
    textSize(25);
    textAlign(CENTER);
    text("Rule", 350, 100);
    text("Go to the same colour square within 3 seconds.", 350, 125);
    text("Control", 350,200);
    text("Press WASD to move.", 350,225);
    text("Press Q to pause.",350, 250);
    text("Press Any key to start", 350, 300);
    
    textSize(15);
    text("created by Kevin Lee", 600,350);
  }
  if (playscene === true) {
    textSize(80);
    textAlign(CENTER, CENTER);
    text(timer,width/2, height/2);
    time();
  }

  if (IsPause === true) {
    fill("pink");
    rect(100,100, 500, 200);
    fill("black");
    textSize(30);
    text("Pause, Click P to continue!", 350, 200);
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
  if (IsGame === true && keyIsDown(80)) {
    IsPause = true; 
    GameText();
  }
  if (IsPause === true && keyIsDown(80)) {
    IsPause = false;
  }
}
/////////////////////////////////////////
//function of game

function GameSet() {
  ColourScreen();
  You();
}

//function of your character
function You() {
  image(CatImg, x, y, CatImg.width*0.3, CatImg.height*0.2);
  KeyInteract();
  IsWall();
}

function KeyInteract() {
  
  if (IsPause === false) {
    if (FrontWall === false) {
      if (keyIsDown(87)) {  //w
        y -= speed;
      }
    }
    
    if (BehindWall === false) {
      if (keyIsDown(83)) {  //s
        y += speed;
      }
    }
    
    if (LeftWall === false) {
      if (keyIsDown(65)) {  //a
        x -= speed;
      }
    }
    
    if (RightWall === false) {
      if (keyIsDown(68)) {  //d
        x += speed;
      }
    }
  }
}

function IsWall() {
  // if wall on left
  if (x <= -40 ) {
    LeftWall = true;
  }
  else {
    LeftWall = false;
  }

  
  //wall on right
  if (x >= 600) {
    RightWall = true;
  }
  else {
    RightWall = false;
  }
  
  //wall on behind
  if (y >= 335) {
    BehindWall = true;
  } 
  else {
    BehindWall = false;
  }
  
  //wall on front
  if (y <= -20) {
    FrontWall = true;
  } 
  else {
    FrontWall = false;
  }
}

function ColourScreen() {

  fill(ColorScreenChoice);
  square(width/2 - 25, 25, 50);
  ColorGround();
}

function ColorGround() {
  for (let y = height; y >= height/3; y-= height/6) {
    for (let x = 0; x < width; x += width/5) {
      fill(c[y][x]);
      rect(x, y, width/5, height/6);
    }
  }
}

function Pause() {
  fill("pink");
  let pause_bar = rect(100,100, 500, 200);
  fill("black");
  textSize(30);
  text("Pause, Click P to continue!", 350, 200);
}