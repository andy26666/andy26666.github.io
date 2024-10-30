//Grid Game
//Kevin Lee
// 2024/10.30

let dogimg;
const COLS = 3; // Number of columns
const ROWS = 3; // Number of rows
let tileWidth;
let tileHeight;
let tiles = [];
let emptyTileIndex = 0;

const ORIGIN_X = 500;
const ORIGIN_Y = 200;

function preload() {
  dogimg = loadImage('dog.png'); 
}

function setup() {
  createCanvas(800, 800); 
  dogimg.resize(width/2, height/2); // Resize image to fit canvas
  //divide image by cols and rows
  tileWidth = 400 / COLS;
  tileHeight = 400 / ROWS;
  initTiles();
  shuffleTiles();
}

function draw() {
  background(220);
  puzzleBorder();
  drawTiles();
  originImg();

}

function initTiles() {
  for (let i = 0; i < COLS * ROWS; i++) {
    tiles[i] = i;
  }
}

function drawTiles() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let index = i * COLS + j;
      let tileValue = tiles[index];
      if (tileValue !== 0) { // Skip the empty tile
        const x = j * tileWidth;
        const y = i * tileHeight;
        const sx = (tileValue % COLS) * tileWidth;
        const sy = floor(tileValue / COLS) * tileHeight; // Source y
        image(dogimg, x, y, tileWidth, tileHeight, sx, sy, tileWidth, tileHeight);

      }
    }
  }
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  emptyTileIndex = tiles.indexOf(0); // Find the empty tile index
}

function mousePressed() {

  const i = floor(mouseY / tileHeight);
  const j = floor(mouseX / tileWidth);
  const clickedTileIndex = i * COLS + j;

  if (mouseX >= 0 && mouseX <= tileWidth*COLS && mouseY >= 0 && mouseY <= tileHeight*ROWS) {
    if (isAdjacent(clickedTileIndex, emptyTileIndex)) {
      // Swap tiles
      [tiles[clickedTileIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[clickedTileIndex]];
      emptyTileIndex = clickedTileIndex;
    }
  }
}

function isAdjacent(index1, index2) {
  const row1 = floor(index1 / COLS);
  const col1 = index1 % COLS;
  const row2 = floor(index2 / COLS);
  const col2 = index2 % COLS;
  // get absolute value
  const dRow = abs(row1 - row2);
  const dCol = abs(col1 - col2);

  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1); // Check adjacency
}

function originImg() {
  image(dogimg, ORIGIN_X, ORIGIN_Y,dogimg.width*0.5, dogimg.height*0.5);
  noFill();
  rect(ORIGIN_X,ORIGIN_Y,dogimg.width*0.5, dogimg.height*0.5);
}

function puzzleBorder() {
  noFill();
  fill("lightblue");
  rect(0,0,tileWidth*COLS, tileHeight*ROWS);
}

