let shapeOrigin = 600; // origin of the shape pattern
let quadOffset = 270; // equal length offset for quad

function setup() { // Setting up the canvas, background color, strokeweight, and fill color
  createCanvas(1200, 1200);
  background(0);
  strokeWeight(8);
  fill(255, 255, 255);
}

function draw() { // Using several different shapes to form a complete shape pattern
  rectMode(CENTER); // Setting the rectangle align in the middle
  ellipse(shapeOrigin, shapeOrigin, 800) // most outer circle
  rect(shapeOrigin, shapeOrigin, 555); // outer rectangle
  quad(shapeOrigin - quadOffset, shapeOrigin, shapeOrigin, shapeOrigin - quadOffset, shapeOrigin + quadOffset, shapeOrigin, shapeOrigin, shapeOrigin + quadOffset) // diamond shape
  rect(shapeOrigin, shapeOrigin, 355, 160); // inner rectangle
  ellipse(shapeOrigin, shapeOrigin, 100) // inner circle
  triangle(shapeOrigin, shapeOrigin - 40, shapeOrigin + 30, shapeOrigin + 30, shapeOrigin - 30, shapeOrigin + 30);
  // Drawing lines that connect between the rectangle and the most outer circle
  line(shapeOrigin, shapeOrigin - 395, shapeOrigin, shapeOrigin - 283) // top line
  line(shapeOrigin - 395, shapeOrigin, shapeOrigin - 283, shapeOrigin) // left line
  line(shapeOrigin + 395, shapeOrigin, shapeOrigin + 283, shapeOrigin) // right line
  line(shapeOrigin, shapeOrigin + 395, shapeOrigin, shapeOrigin + 283) // bottom line
  
}
