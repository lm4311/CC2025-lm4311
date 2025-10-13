let harry; // THIS IS A VARIABLE TO STORE MY OBJECT
let samantha; // THIS WILL SOTRE ANOTHER OBJECT

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 180, 130);
  x = width / 2;
  y = height / 2;
  colorMode(HSB);

  harry = new Drunk(width/2, height/2, 30, 3, 180);
  samantha = new Drunk(width/2, height/2, 20, 5, 20);
  
}

function draw() {
  harry.move();
  harry.drawDrunk();
  samantha.move();
  samantha.drawDrunk();
}

//function drawDrunk(drunkSpeed,drunkHue,drunkDiamter){
  //x = x + random(-drunkSpeed,drunkSpeed);
  //y = y + random(-drunkSpeed,drunkSpeed);
  //fill(drunkHue,70,100,opacity);
  //circle(x, y, drunkDiamter);
//}

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