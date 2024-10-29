let dogimg;
let pieces = [];
let cols = 3; // Number of columns
let rows = 3; // Number of rows

function preload() {
  dogimg = loadImage('dog.png'); // Replace with your image filename or URL
}

function setup() {
  createCanvas(400, 400);
  dogimg.resize(width, height); // Resize image to fit canvas
  let pieceWidth = dogimg.width / cols;
  let pieceHeight = dogimg.height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let piece = dogimg.get(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
      pieces.push(piece);
    }
  }

  // Shuffle image piece randomly
  pieces = shuffle(pieces);
}

function draw() {
  background(220);
  let pieceWidth = width / cols;
  let pieceHeight = height / rows;

  for (let i = 0; i < pieces.length; i++) {
    let x = floor(i % cols) * pieceWidth;
    let y = floor(i / cols) * pieceHeight;
    image(pieces[i], x, y);
  }


}

function mouseClicked() {

}