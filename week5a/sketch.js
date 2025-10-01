let buttonX = 160;
let buttonY = 80;
let buttonD = 80;
let hovering = false;

let r = 0;
let g = 0;
let b = 0;

let ballX = 15;
let ballSpeed = 3;
let ballDiameter = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
}

function draw() {
  background(r,g,b);
  fill(0,255,0);
  text("x: " + mouseX + " y: " + mouseY,15,15);
  let distance = dist(mouseX,mouseY,buttonX,buttonY);
  text("dist: " + distance,15,30);

  stroke(255);
  noFill();

  if(distance<buttonD/2){
    fill(50);
    hovering = true;
    ballX = ballX + ballSpeed;
    if(mouseIsPressed){
      strokeWeight(3);
    }
  } else{
    hovering = false;
  }
  circle(buttonX,buttonY,buttonD);

  fill("red");
  noStroke();

  if(ballX > (width - ballDiameter)|| ballX < ballDiameter / 2){
    ballSpeed = -ballSpeed;
  }
  circle(ballX,200,25);
}


function mousePressed(){
  if (hovering == true){
  r = random(255);
  g = random(255);
  b = random(255);
  ballSpeed = -ballSpeed;
  }
}
