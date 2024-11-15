//Kevin Lee
//2024 11 15
//Grid-Based-Game
// It is image slide puzzle game, and description to solve that.
///////////////////////////////////////////////////////////////


//At the top left side of the original image puzzle is always empty.
let dogimg;

// The amount of puzzle pieces
//COLS and ROWS must be 2 or 3, otherwise, the image become weird
//General set is 3
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
let colour = "lightblue";
// place of origin picture
const ORIGIN_X = 500;
const ORIGIN_Y = 200;

//variable for tutorial
// the state of puzzle
let currentPuzzle;
let tutotileSize;
let next_step = 0;


function preload() {
  dogimg = loadImage('dog.png'); 
}

function setup() {
  createCanvas(800, 800); 
  // Resize image to fit screen
  dogimg.resize(width/2, height/2); 

  if (isStartScene) {
    background(colour);
    textSize(75);
    text("SLIDE PUZZLE", 150, 200);

    imgButton = createButton('Image Puzzle');
    imgButton.position(260, 375);
    imgButton.mousePressed(imgPuzzle);

    tutoButton = createButton('Tutorial');
    tutoButton.position(315, 475);
    tutoButton.mousePressed(puzzleTutorial);
  }
  // image puzzle
  //get each piece of width and height
  tileWidth = 400 / COLS;
  tileHeight = 400 / ROWS;
  initTiles();
  shuffleTiles();
  
  // tutorial
  // 3x3 grid, so each tile will be this size
  tutotileSize = 400 / 3;  
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
  if (!isStartScene && playGame) {
    background(colour);

    // related what to do for state of game
    if (!isClear) {

      colour = "pink";
      puzzleBorder();
      originImg();
      fill("black");
      textSize(20);
      text("Press 7 to tutorial", 400, 600);
      textAlign(CENTER);
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
      // if puzzle is solved not for once after shuffle, clear!
      if (isSolved() && isMove) {
        isClear = true;
      }
    }
    //clear scene
    else {
      colour = "black";
      fill("white");
      textSize(100);
      textAlign(CENTER);
      text("You Win", 400, 350);
      textSize(35);
      text("Click Anywhere to play again", 400, 500);
    }
  }
  //tutorial 
  else if (!isStartScene && tutorial) {
    background(colour);
    colour = "lightgreen";
    textAlign(CENTER);
    text("Press right arrow or mouseclick to go next", 400, 575);
    text("Press left arrow to go previous part", 400, 625);
    if (next_step === 1) {
      currentPuzzle = [
        [2, 4, 6],
        [3, 8, 5],
        [7, 9, 0]
      ];
      // Draw the current puzzle state
      tutoVisualPuzzle();
      textSize(20);
      text("Always solve the bottom pieces first", 400, 500);
      text("So make bottom left and bottom right attach and put bottom middle above bottom right. ",400, 700);
    }
    if (next_step === 2) {
      currentPuzzle = [
        [2, 5, 3],
        [4, 6, 0],
        [7, 8, 9]
      ];
      tutoVisualPuzzle();
      textSize(20);
      text("After solve bottom, then solve middle part like solve bottom part.", 400, 500);
      text("Like this!", 400, 700);

    }
    if (next_step === 3) {
      currentPuzzle = [
        [0,2,3],
        [4,5,6],
        [7,8,9]
      ];
      tutoVisualPuzzle();
      textSize(20);
      text("Then, you can solve the rest of the puzzle easily! ", 400, 500);
      text("Press anywhere to start play puzzle.", 400, 700);
    }
    if (next_step > 3) {
      tutorial = false;
      playGame = true;
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
      // if 0, it is empty tile, so do nothing
      if (tileValue !== 0) { 
        let x = j * tileWidth;
        let y = i * tileHeight;
        let sx = floor(tileValue % COLS) * tileWidth;
        let sy = floor(tileValue / COLS) * tileHeight; 
        image(dogimg, x, y, tileWidth, tileHeight, sx, sy, tileWidth, tileHeight);
        //make border for each puzzle piece
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
  // Find the empty tile index
  emptyTileIndex = tiles.indexOf(0); 
}
// check puzzle is possible to solve
function isSolvable(tiles, ROWS, COLS) {
  let inversions = 0;
  let blankRow = -1;
  // find the empty spot
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === 0) {
      blankRow = floor(i / COLS) + 1; 
      // skip if empty
      continue; 
    }
    
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[j] === 0) {
        // skip if empty
        continue; 
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
      // If any tile is out of place, return false
      return false;
    }

  }
  // All tiles are in the correct place
  return true; 
}


function mousePressed() {
  if (playGame && !isStartScene) {
    isMove = true;

    //detect which rows of mouse
    let i = floor(mouseY / tileHeight);
    //detect which cols of mouse
    let j = floor(mouseX / tileWidth);
      
    let clickedTileIndex = i * COLS + j;
  
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

function keyPressed() {
  if (key === '7') {
    if (!isStartScene && playGame) {
      playGame = false;
      tutorial = true;
      next_step = 1;
    }
  }
  if (keyCode === LEFT_ARROW && tutorial && next_step > 1) {
    next_step -= 1;
  }
  if (keyCode === RIGHT_ARROW && tutorial) {
    next_step++;
  }
}


function isAdjacent(index1, index2) {
  let row1 = floor(index1 / COLS);
  let col1 = index1 % COLS;
  let row2 = floor(index2 / COLS);
  let col2 = index2 % COLS;
  
  let dRow = abs(row1 - row2);
  let dCol = abs(col1 - col2);

  return (dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1);
}

function originImg() {
  image(dogimg, ORIGIN_X, ORIGIN_Y, dogimg.width * 0.5, dogimg.height * 0.5);
  noFill();
  rect(ORIGIN_X, ORIGIN_Y, dogimg.width * 0.5, dogimg.height * 0.5);
}

//make entire puzzle border
function puzzleBorder() {
  noFill();
  fill("lightblue");
  rect(0, 0, tileWidth * COLS, tileHeight * ROWS);
}

// draw puzzle for tutorial, draw puzzle for the inside of square bracket number.
function tutoVisualPuzzle() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let num = currentPuzzle[row][col];
      let x = col * tutotileSize;
      let y = row * tutotileSize;

      // Draw the number inside the tile, except 0
      if (num !== 0) {
        fill(255);
        stroke(0);
        // Draw the tile
        rect(x, y, tutotileSize, tutotileSize); 
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        // Draw the number inside the tile
        text(num, x + tutotileSize / 2, y + tutotileSize / 2);  
      }
    }
  }
}
