let speed = 0.01
let noiseR = 0;
let noiseT = 1000;

let x = 200;
let y = 200;

let eyeWidth = 100;
let eyeHeight = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  eye1 = new EyeBall(200,200,100,150);
  eye2 = new EyeBall(200,200,100,150);
}

function draw() {
  background(0);
  eye1.display();
  eye2.display();

  
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