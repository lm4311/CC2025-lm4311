

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i<10; i++){
    console.log(i);
  }
  
}

function draw() {
  background("black");


  for (let y = 50; y < height - 50; y += 100){
    for (let x = 50; x < width - 50; x += 100){
      push();
      translate(x, y);
      let rotation;
      rotation = map(y, 50, height - 50, 0, PI);
      rotate(rotation);

      let randomAmount = 0.075;
      let randomXDisp;
      let randomYDisp;

      strokeWeight(3);
      fill("yellow");
      circle(0, 0, 100);
      circle(-15, -10, 10);
      circle(15, -10, 10);
      let happiness;
      happiness = map(x, 0, width, -25, 25);
      noFill();
      arc(0, 0, 60, 60, radians(0 - happiness), radians(180 + happiness));
      pop();
    }
  }

}
