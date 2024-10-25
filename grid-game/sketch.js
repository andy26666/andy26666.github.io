// Grid Based Game Assignment
// Kevin Lee
// 2024/10/25

// Puzzle game

let dogImg;
let DOGIMGWIDTH = 200;
let DOGIMGHEIGHT = 200;
let dogX = 50;
let dogY = 50;

function preload() {
  dogImg = loadImage("dog.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cropImage();
}

function draw() {
  background(220);

  image(dogImg, dogX, dogY, DOGIMGWIDTH,DOGIMGHEIGHT);
}

function cropImage() {
  for (let y = 20; y < 60; y+= 20) {
    dogY = dogY + y;
    for (let x = 20; x < 60; x+=20) {
      dogX = dogX + x;
    }
  }
}