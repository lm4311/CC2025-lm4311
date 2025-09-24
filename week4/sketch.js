

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background("#8cdd73ff");
  circle(100, 100, 100);
  circle(85, 89, 5);
  circle(115, 89, 5);
  arc(100, 100, 60, 60 ,0, PI);

  push();
  if (mouseX > width / 2 && mouseY > height / 2){
    fill("pink");
  } else if (mouseX < width / 2 && mouseY < height / 2){
    fill("orange");
  }
  
  else{
    fill("yellow");
  }
  translate(width / 2, height / 2);
  let angle;
  angle = map(mouseX, 0, width, 0 , 360);
  rotate(radians(angle));
  let scaleFactor = map(mouseY, 0, height, 0.1, 3);
  scale(scaleFactor);
  circle(0, 0, 100);
  circle(-15, -10, 5);
  circle(15, -10, 5);
  arc(0, 0, 60, 60 ,0, PI);
  pop();

  text(mouseX + " " + mouseY, 5, 15);
}
