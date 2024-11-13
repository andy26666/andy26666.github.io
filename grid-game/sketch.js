
//At the top left side of the original image puzzle is always empty.

let dogimg;

// The amount of puzzle pieces
//COLS and ROWS must be bigger than 1
const COLS = 3; // Number of columns
const ROWS = 3; // Number of rows

let tileWidth;
let tileHeight;

let sizeInput;
let puzzleSize;

// check the puzzle is move or not
let isMove = false;
let isClear = false;
let tiles = [];
let emptyTileIndex = 0;

// start scene
let isStartScene = true;
let imgButton = false;
let normalButton = false;
let puzzleSelect;

// the colour of the background of screen
let colour = "white";
// place of origin picture
const ORIGIN_X = 500;
const ORIGIN_Y = 200;

///////////////////////////////////////////
// variable for normal puzzle
let puzzleSet = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]  // 0 represents the empty space
];

let currentPuz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
];

let tileSize;
let isDone = false;
let emptyTileX = 2; // Start with the empty tile in the bottom-right corner
let emptyTileY = 2;


function preload() {
  dogimg = loadImage('dog.png'); 
}

function setup() {
  createCanvas(800, 800); 
  dogimg.resize(width/2, height/2); // Resize image to fit screen

  if (isStartScene) {
    background("lightblue");
    textSize(75);
    text("SLIDE PUZZLE", 150, 200);

    //button
    imgButton = createButton('Image Puzzle');
    imgButton.position(260, 375);
  
    imgButton.mousePressed(imgPuzzle);
  
    normalButton = createButton('Normal Puzzle');
    normalButton.position(250, 500);
  
    normalButton.mousePressed(normalPuzzle);
  }

  //get each piece of width and height
  tileWidth = 400 / COLS;
  tileHeight = 400 / ROWS;

  initTiles();
  shuffleTiles();
  

  tileSize = width / 3;  // 3x3 grid, so each tile will be this size
  
  shufflePuzzle();  // Shuffle the puzzle at the start 

}
function imgPuzzle() {
  puzzleSelect = "imgpuzzle";
  isStartScene = false;
  imgButton.hide();
  normalButton.hide();
}
function normalPuzzle() {
  puzzleSelect = "normalpuzzle";
  isStartScene = false;
  normalButton.hide();
  imgButton.hide();
}

function draw() {
  
  if (!isStartScene && puzzleSelect === "imgpuzzle") {
    background(colour);

    // related what to do for state of game
    if (!isClear) {

      colour = "pink";
      puzzleBorder();
      originImg();
      // if the puzzle is impossible to solve, shuffle again 
      if (!isSolvable(tiles, ROWS, COLS)) {
        shuffleTiles();
      }
      // if the puzzle already solved right after shuffle, shuffle again
      else if (isSolved() && isMove === false) {
        shuffleTiles();
      }
      else {
        drawTiles();
      }
      if (isSolved() && isMove) {
        isClear = true;
      }
    }
    else {
      colour = "black";
      fill("white");
      textSize(100);
      text("You Win", 225, 350);
      textSize(35);
      text("Click Anywhere to play again", 170, 500);
    }
  }
  if (!isStartScene && puzzleSelect === "normalpuzzle") {
    // Draw the current puzzle state
    drawPuzzle();

    // Check if the puzzle is solved
    if (isDone) {
      textSize(32);
      fill(0);
      textAlign(CENTER, CENTER);
      text("Solved!", width / 2, height / 2);
    }
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
        const sx = floor(tileValue % COLS) * tileWidth;
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
    let j = floor(random(i+1));
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
  if (puzzleSelect === "imgpuzzle") {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== i) {
        return false; // If any tile is out of place, return false
      }

    }
    return true; // All tiles are in the correct place
  }
  else {
    // Check if the current puzzle matches the solved state
    isDone = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentPuz[i][j] !== puzzleSet[i][j]) {
          isDone = false;
          break;
        }
      }
      if (!isDone) {
        break;
      }
    }
  }
}


function mousePressed() {
  if (puzzleSelect === "imgpuzzle") {
    isMove = true;

    //detect which rows of mouse
    const i = floor(mouseY / tileHeight);
    //detect which cols of mouse
    const j = floor(mouseX / tileWidth);
    
    const clickedTileIndex = i * COLS + j;

    // detect the place is empty place and move and set to new place. The past place become empty place
    if ((mouseX >= 0 && mouseX <= tileWidth * COLS && mouseY >= 0 && mouseY <= tileHeight * ROWS) && (!isClear)) {
      if (isAdjacent(clickedTileIndex, emptyTileIndex)) {
        // Swap tiles
        [tiles[clickedTileIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[clickedTileIndex]];
        emptyTileIndex = clickedTileIndex;
      }
    }

    if (isClear) {
      shuffleTiles();
      if (!isSolvable(tiles, ROWS, COLS)) {
        shuffleTiles();
      }
      // if the puzzle already solved right after shuffle, shuffle again
      else if (isSolved() && isMove === false) {
        shuffleTiles();
      }
      else {
        drawTiles();
      }
      isClear = false;
    }
  }
  else {
    if (isDone) return; // Do nothing if the puzzle is solved
  
    let col = floor(mouseX / tileSize);
    let row = floor(mouseY / tileSize);
  
    // If the clicked tile is adjacent to the empty space, swap it
    if (isAdjacent(row, col)) {
      swapTiles(row, col);
    }
  
    // Check if the puzzle is solved after the move
    isSolved();
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





