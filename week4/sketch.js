

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background("#8cdd73ff");
  circle(100, 100, 100);
  circle(100, 100, 100);
  circle(115, 89, 5);
  arc(100, 100, 60, 60 ,0, PI);

  push();

  translate(200, 100);

  circle(100, 100, 100);
  circle(100, 100, 100);
  circle(115, 89, 5);
  arc(100, 100, 60, 60 ,0, PI);

  pop();

  text(mouseX + "" + mouseY, 5, 15);
}
