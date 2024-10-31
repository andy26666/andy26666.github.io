let dogimg;
const COLS = 2; // Number of columns
const ROWS = 2; // Number of rows
let tileWidth;
let tileHeight;
// check the puzzle is move or not
let isMove = false;
let isClear = false;
let tiles = [];
let emptyTileIndex = 0;

// place of origin picture
const ORIGIN_X = 500;
const ORIGIN_Y = 200;

function preload() {
  dogimg = loadImage('dog.png'); 
}

function setup() {
  createCanvas(800, 800); 
  
  dogimg.resize(width/2, height/2); // Resize image to fit screen

  //get each piece of width and height
  tileWidth = 400 / COLS;
  tileHeight = 400 / ROWS;

  initTiles();
  shuffleTiles();
}

function draw() {
  background(220);

  // draw the cover border of puzzle
  puzzleBorder();

  drawTiles();
  // if the puzzle is impossible to solve, shuffle again 
  if (!isSolvable(tiles, ROWS, COLS)) {
    shuffleTiles();
  }
  // if the puzzle already solved, shuffle again
  if (isSolved() && isMove === false) {
    shuffleTiles();
  }

  originImg();

  if (isSolved() && isMove) {
    isClear = true;
    fill(0, 255, 0);
    textSize(32);
    text("Puzzle Solved!", 100, height - 100);
  }
}

// set the origin puzzle number, and use it to detect isSolve()
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
      if (tileValue !== 0) { // if 0, it is empty tile
        const x = j * tileWidth;
        const y = i * tileHeight;
        const sx = (tileValue % COLS) * tileWidth;
        const sy = floor(tileValue / COLS) * tileHeight; 
        image(dogimg, x, y, tileWidth, tileHeight, sx, sy, tileWidth, tileHeight);
        noFill();
        rect(x,y, tileWidth, tileHeight);
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

function isSolvable(tiles, ROWS, COLS) {
  let inversions = 0;
  let blankRow = -1;
  // find the empty spot
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === 0) {
      blankRow = floor(i / COLS) + 1; 
      continue; // skip if there is empty
    }
    
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[j] === 0) {
        continue; // skip if there is empty
      }
      if (tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  // if it is odd
  if (ROWS % 2 === 1) {
    return inversions % 2 === 0;
  }
  else {
    // if it is even
    // detect the empty spot is odd or even place
    return (inversions % 2 === 0 && (blankRow % 2 === 1)) || (inversions % 2 === 1 && (blankRow % 2 === 0));
  }
}

function isSolved() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) {
      return false; // If any tile is out of place, return false
    }
  }
  return true; // All tiles are in the correct place
}


function mousePressed() {
  isMove = true;

  //detect which rows of mouse
  const i = floor(mouseY / tileHeight);
  //detect which cols of mouse
  const j = floor(mouseX / tileWidth);
  
  const clickedTileIndex = i * COLS + j;

  // detect the place is empty place and move and set to new place. The past place become empty place
  if ((mouseX >= 0 && mouseX <= tileWidth * COLS && mouseY >= 0 && mouseY <= tileHeight * ROWS)&&(!isClear)) {
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
  
  const dRow = abs(row1 - row2);
  const dCol = abs(col1 - col2);

  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1); // Check adjacency
}

function originImg() {
  image(dogimg, ORIGIN_X, ORIGIN_Y, dogimg.width * 0.5, dogimg.height * 0.5);
  noFill();
  rect(ORIGIN_X, ORIGIN_Y, dogimg.width * 0.5, dogimg.height * 0.5);
}

function puzzleBorder() {
  noFill();
  fill("lightblue");
  rect(0, 0, tileWidth * COLS, tileHeight * ROWS);
}

