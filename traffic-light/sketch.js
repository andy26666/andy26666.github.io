let WaitTime = 2000;
let TotalTime = 0;
let top;
let mid;
let bot;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
  



  top = ellipse(width/2, height/2 - 65, 50, 50); //top

  mid = ellipse(width/2, height/2, 50, 50); //middle

  bot = ellipse(width/2, height/2 + 65, 50, 50); //bottom

  if (millis > WaitTime + TotalTime) {
    top.color('red');
  }


  
}