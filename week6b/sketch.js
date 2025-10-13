let harry; // THIS IS A VARIABLE TO STORE MY OBJECT
let samantha; // THIS WILL SOTRE ANOTHER OBJECT
let drunks = [];
let drunkAmount = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 180, 130);
  x = width / 2;
  y = height / 2;
  colorMode(HSB);

  for(let i = 0; i<drunkAmount;i++){
    drunks[i] = new Drunk(width/2, height/2, random(50, 100), 5, random(20, 100));
  }
  
}

function draw() {
  for(let i = 0;i<drunks.length;i++){
    drunks[i].move();
    drunks[i].drawDrunk();
  }
}

class Drunk {
  constructor(x,y,diamter,speed,hue){
    this.x = x;
    this.y = y;
    this.diameter = diamter;
    this.speed = speed;
    this.hue = hue;
    this.opacity = random(0,1);
  }

  move(){
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }

  drawDrunk(){
    fill(this.hue, 70, 100, this.opacity);
    circle(this.x, this.y, this.diameter);
  }
}