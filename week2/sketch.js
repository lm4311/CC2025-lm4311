let shapeOriginX = window.innerWidth / 2; // X-coordinate origin of the shape pattern
let shapeOriginY = window.innerHeight / 2; // Y-coordinate origin of the shape pattern
let quadOffset = 270; // equal length offset for quad

function setup() { // Setting up the canvas, background color, strokeweight, and fill color
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(8);
  fill(255, 255, 255);
}

function draw() { // Using several different shapes to form a complete shape pattern
  rectMode(CENTER); // Setting the rectangle align in the middle
  ellipse(shapeOriginX, shapeOriginY, 800) // most outer circle
  rect(shapeOriginX, shapeOriginY, 555); // outer rectangle
  quad(shapeOriginX - quadOffset, shapeOriginY, shapeOriginX, shapeOriginY - quadOffset, shapeOriginX + quadOffset, shapeOriginY, shapeOriginX, shapeOriginY + quadOffset) // diamond shape
  rect(shapeOriginX, shapeOriginY, 355, 160); // inner rectangle
  ellipse(shapeOriginX, shapeOriginY, 100) // inner circle
  triangle(shapeOriginX, shapeOriginY - 40, shapeOriginX + 30, shapeOriginY + 30, shapeOriginX - 30, shapeOriginY + 30);
  // Drawing lines that connect between the rectangle and the most outer circle
  line(shapeOriginX, shapeOriginY - 395, shapeOriginX, shapeOriginY - 283) // top line
  line(shapeOriginX - 395, shapeOriginY, shapeOriginX - 283, shapeOriginY) // left line
  line(shapeOriginX + 395, shapeOriginY, shapeOriginX + 283, shapeOriginY) // right line
  line(shapeOriginX, shapeOriginY + 395, shapeOriginX, shapeOriginY + 283) // bottom line
}
