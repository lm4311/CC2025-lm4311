let noisePosition = 0;
let noiseSpeed = 0.01
let startingPoint = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background("gray");
  
  noisePosition = startingPoint;
  for (let i = 0; i<width;i++){
    let y = noise(noisePosition) * height;
    noisePosition = noisePosition + noiseSpeed;
    circle(i , y, 5);
  }

  startingPoint = startingPoint + noiseSpeed;
}
