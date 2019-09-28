// For the bezier noise we used code from https://genekogan.com/code/p5js-perlin-noise/?fbclid=IwAR3bSYqaZT9TNnT1mtzNcYpRECsVwj1ReTZohjwTzOtBZJXnbIVNdlYC3EU

let mic;
var sound;
var vol;
var extraCanvas;

var img1, img2, img3, img4;
var acc;

let t = 0
let noTint = 0;
let offset = 0;


function preload() {

  //load images
  img1 = loadImage("image/light-gradient-transparent-bubble.png");
  img2 = loadImage("image/light-gradient-transparent.png");
  img3 = loadImage("image/gradient-bubble-07.png");

  //load audio
  soundFormats('mp3', 'ogg');
  sound = loadSound('sfx/FireCrackle_Trimmed2.mp3');
}


function setup() {

  //main canvas
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  //mic controls
  mic = new p5.AudioIn();
  mic.start();

  //audio controls
  sound.play();
  sound.loop();
  sound.setVolume(1);

  //creates clear canvas on top of main canvas
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.clear();

  stroke(1, 25);
  noFill();

}


function draw() {
  background(0, 0, 0, 0.5);

  acc = Math.abs(accelerationX);
  sound.setVolume(1 + acc);

  //load the main gradient
  tint(noTint);
  noTint = noTint + 8;
  tint(noTint - acc * 10);

  image(img2, width / 2, height / 2, width, height);
  image(img1, width / 2, height, mic.getLevel() * 10000, mic.getLevel() * 10000);
  image(img3, width / 2, height, mic.getLevel() * 30000, mic.getLevel() * 30000);

  //bezier wave
  imageMode(CENTER);
  image(extraCanvas, width / 2, height / 2);

  extraCanvas.stroke(250, 200, 0, 40);
  extraCanvas.noFill();

  var x1 = width * noise(t + 25);
  var x2 = width * noise(t + 35);
  var x3 = width * noise(t + 45);
  var x4 = width * noise(t + 55);
  var y1 = height * noise(t + 65);
  var y2 = height * noise(t + 75);
  var y3 = height * noise(t + 85);
  var y4 = height * noise(t + 95);

  extraCanvas.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  t += 0.0075;

  //text
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  textStyle(NORMAL);
  textFont('Georgia');
  text("Turn up your volume.", width / 2, height / 2);

  // clear the background every 1000 frames using mod (%) operator
  if (frameCount % 1000 == 0) {
    extraCanvas.clear();

  }
}