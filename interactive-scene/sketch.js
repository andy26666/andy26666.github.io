// Interactive Scene
// Kevin Lee
//CS 30

// img
let Img;
let GameImg;
let GamestageImg;
let Startbutton;

// colourlist from random colour drawing
let ColorList = ["white","red","navy","purple", "orange", "blue","black","pink","green", "lightblue", "yellow", "lightgreen", "brown", "grey"];

let ColorChoice;


let c = [];


//variable of scene checker
var buttonTrue = true;
var description = false;
var IsGame = false;

function setup() {
  
  //img of game
  Img = loadImage("Start Scene.png");
  GameImg = loadImage("Game.jpg");
  GamestageImg = loadImage("Playscene.png");

  createCanvas(700, 400);
  
  ColorScreenChoice = random(ColorList);
  
// choose random colour from random drawing once
  for (let y = height; y >= 0; y-= height/5) {
    c[y]= [];
    for (let x = 0; x < width; x+= width/5) {
      c[y][x] = color(random(ColorList));

      fill(c[y][x]);
      rect(x, y, width/5, height/6);
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

  if (IsGame === true) {
    background(GamestageImg);
    DrawingRandom();
  }
  
}

//create startButton
function GameButton() {
  // start button
  if (buttonTrue === true && IsGame === false){
    Startbutton = createButton("START");
    Startbutton.size(150,50);
    Startbutton.position(275, 300);
    
    Startbutton.mousePressed(GameChapter);  }
}

function GameText() {
  //Title text of start scene
  
  if (buttonTrue === true) {
    fill("skyblue");

    textSize(40);
    text("COlOUR DARWING",400-textWidth(),100);
  }
 
  //text of description
  if (description === true) {
    
    //title of introduction
    fill("black");
    textSize(40);
    textAlign(CENTER);
    text("DESCRIPTION",350, 50);
    
    //text of small sentence
    textSize(25);
    textAlign(CENTER);
    text("Program will generate random colour drawing!", 350,200);
    text("Press Any key to start", 350, 300);
    
    textSize(15);
    text("created by Kevin Lee", 600,350);
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
    IsGame = true;
  } 
}

/////////////////////////////////////////
//function of Drawing

//drawing random colour, use array 
function DrawingRandom() {
  for (let y = height; y >= 0; y-= height/5) {
    for (let x = 0; x < width; x += width/5) {
      fill(c[y][x]);
      
      
      rect(x, y, width/5, height/5);
    }
  }
}


