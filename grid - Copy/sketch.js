// Character in Grid Demo
// Dan Schellenberg
// Oct 29, 2024

// if hardcoding the grid, use this:
// let grid = [[1, 0, 0, 1],
//             [0, 1, 1, 0],
//             [1, 0, 1, 1],
//             [1, 1, 1, 0]];

let grid;
let cellSize;
const GRID_SIZE = 4;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let thePlayer = {
  x: 0,
  y: 0,
};

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  //add player to the grid
  grid(thePlayer.y)(thePlayer.x)
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle itself
  toggleCell(x,y);

}

function toggleCell(x,y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "s") {
    //move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") {
    //move down
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "d") {
    //move down
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  if (key === "a") {
    //move down
    movePlayer(thePlayer.x=1, thePlayer.y - 1);
  }
}

function movePlayer (x,y) {let oldX = thePlayer.x;
  thePlayer.x-= x;
  thePlayer.y-= y;

  grid[thePlayer.x][thePlayer.y] = {:AYERLd}
}
function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        fill("black");
      }
      else if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      else if (gird[y][x] === PLAYER) {
        fill("red");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}


function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //make it a 1 half the time, a 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}