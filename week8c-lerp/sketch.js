let x = 200;
let y = 200;

let eyeWidth = 100;
let eyeHeight = 150;

let pX = 0;
let pY = 0;

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let lerpAmount = 1;
let speed = 0.05;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  eye1 = new EyeBall(200,200,100,150);
}

function draw() {
  background(0);
  currentX = lerp(pX, targetX, lerpAmount);
  currentY = lerp(pY, targetY, lerpAmount);

  lerpAmount = lerpAmount + speed;
  lerpAmount = constrain(lerpAmount,0,1);

  eye1.x = currentX;
  eye1.y = currentY;
  eye1.display();

  
}

class EyeBall {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.speed = 0.005;
    this.noiseR = 0;
    this.noiseT = 1000;
  }

  display () {
    push();
    translate(this.x,this.y);
    fill(255);
    ellipse(0,0,eyeWidth,eyeHeight);
    let eyeTheta = noise(noiseT)*360;
    let eyeXRadius = noise(noiseR)*eyeWidth/2;
    let eyeYRadius = noise(noiseR)*eyeHeight/2;

    let eyeX = cos(eyeTheta)*eyeXRadius;
    let eyeY = sin(eyeTheta)*eyeYRadius;

    fill(0);
    ellipse(eyeX, eyeY, eyeWidth/2, eyeHeight/2);

    noiseR = noiseR + speed;
    noiseT = noiseT + speed;
    pop();
  }
}

function mousePressed() {
  pX = currentX;
  pY = currentY;
  targetX = mouseX;
  targetY = mouseY;
  lerpAmount = 0;

}