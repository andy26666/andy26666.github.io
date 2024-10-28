// Grid Based Game Assignment
// Kevin Lee
// 2024/10/25

// Puzzle game

let cols = 3;
let rows = 3;
let dogImg;
let DOGIMGWIDTH = 200;
let DOGIMGHEIGHT = 200;

let slice_x;
let slice_y;

let puzzleArr = [];

function preload() {
  dogImg = loadImage("dog.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cropImage();
}

function draw() {
  background(220);

  puzzleArr = shuffle(puzzleArr);

  // Keep track of the position of the current square.
  // We change these as we draw each square,
  // so we know where to draw the next one.
  let dogX = 0;
  let dogY = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

    }
  }
}

function cropImage() {
  slice_x = DOGIMGWIDTH/cols;
  slice_y = DOGIMGHEIGHT/rows;

  for (let y = 0; y < height; y += slice_y) {
    for (let x = 0; x < width; x += slice_x) {
      puzzleArr.push(dogImg.get(x, y, slice_x, slice_y));
    }
  }

}
