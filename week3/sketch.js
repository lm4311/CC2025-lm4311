let circleSize = 125;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background("rgba(231, 185, 132, 1)");
  stroke(255);
  strokeWeight(10);
  fill(211, 231,3);
  circle(400, 300, 200);
  fill(100, 201, 212);
  rect(250,500, 300, 50);
  fill(255);
  ellipse(450, 300, 25, 50);
  ellipse(350, 300, 25, 50);
  line(300, 500, 300, 600);
  line(500, 500, 500, 600);
  fill(255, 232, 214);
  rect(380, 400, 40, 600);
  
  fill(255);
  beginShape();
  vertex(300, 600);
  vertex(500, 600);
  vertex(600, 700);
  vertex(400, 700);
  vertex(200, 700);
  endShape(CLOSE);

  arc(width/2, height/2, 100, 100, 0, PI);

}
