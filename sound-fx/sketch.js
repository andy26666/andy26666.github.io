// Sound Effects Demo
let bgMusic;
let clickFx;

function preload() {
  bgMusic = loadSound("background.mp3");
  clickFx = loadSound()
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }
}