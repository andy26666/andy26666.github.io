
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
let playGame = false;
let tutorial = false;

// the colour of the background of screen
let colour = "white";
// place of origin picture
const ORIGIN_X = 500;
const ORIGIN_Y = 200;

//variable for tutorial
let currentPuz;
let tileSize;
let next_step = 0;


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

    tutoButton = createButton('Tutorial');
    tutoButton.position(315, 475);

    tutoButton.mousePressed(puzzleTutorial);
  
  }

  //get each piece of width and height
  tileWidth = 400 / COLS;
  tileHeight = 400 / ROWS;

  initTiles();
  shuffleTiles();
  
  tileSize = 400 / 3;  // 3x3 grid, so each tile will be this size

}
function imgPuzzle() {
  isStartScene = false;
  playGame = true;
  imgButton.hide();
  tutoButton.hide();
}
function puzzleTutorial() {
  isStartScene = false;
  tutorial = true;
  tutoButton.hide();
  imgButton.hide();

}

function draw() {
  console.log(next_step);
  
  if (!isStartScene && playGame) {
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
  else if (!isStartScene && tutorial) {
    background(colour);
    colour = "lightgreen";
    if (next_step === 1) {
      currentPuz = [
        [2, 4, 6],
        [3, 8, 5],
        [7, 9, 0]
      ];
      // Draw the current puzzle state
      drawPuzzle();
      textSize(20);
      text("Always solve the bottom pieces first", 400, 500);
      text("So make bottom left and bottom right attach and put bottom middle above bottom right. ",400, 700);
    }
    if (next_step === 2) {
      currentPuz = [
        [2, 5, 3],
        [4, 6, 0],
        [7, 8, 9]
      ];
      drawPuzzle();
      textSize(20);
      text("After solve bottom, then solve middle part like solve bottom part.", 400, 500);
      text("Like this!", 400, 700);

    }

  }
  else {
    background("lightblue");
    textSize(75);
    text("SLIDE PUZZLE", 150, 200);

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
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) {
      return false; // If any tile is out of place, return false
    }

  }
  return true; // All tiles are in the correct place
}


function mousePressed() {
  if (playGame && !isStartScene) {
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
  else if (tutorial && !isStartScene) {
    next_step++;
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

function drawPuzzle() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let num = currentPuz[row][col];
      let x = col * tileSize;
      let y = row * tileSize;

      // Draw the number inside the tile, except for the empty space (0)
      if (num !== 0) {
        fill(255);
        stroke(0);
        rect(x, y, tileSize, tileSize);  // Draw the tile
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(num, x + tileSize / 2, y + tileSize / 2);  // Draw the number inside the tile
      }
    }
  }
}
