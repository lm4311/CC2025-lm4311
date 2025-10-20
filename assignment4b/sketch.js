let myPizzas = [];
let pizzaType;
let totalToppingCount = 0;
let pepperoniCount;
let mushroomCount;
let pepperCount;
let oliveCount;
let onionCount;
let basilCount;
let pineappleCount;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(60);
}

function draw() {
  for (let i = 0; i < myPizzas.length; i++) {
    myPizzas[i].displayPizza();
  }
}

function keyPressed() {
  if (key == 'c') {
    pizzaType = 'cheese';
  } else if (key == 'p') {
    pizzaType = 'pepperoni';
  } else if (key == 'm') {
    pizzaType = 'mushroom';
  } else if (key == 'v') {
    pizzaType = 'veggie';
  } else if (key == 'd') {
    pizzaType = 'deluxe';
  }
}
 
function mousePressed() {
  totalToppingCount = 0;
  if (pizzaType == 'pepperoni') {
    pepperoniCount = ceil(random(2, 5));
  } else if (pizzaType == 'mushroom') {
    mushroomCount = ceil(random(5, 10));
    totalToppingCount = mushroomCount;
  } else if (pizzaType == 'veggie') {
    mushroomCount = ceil(random(1, 4));
    oliveCount = ceil(random(1, 4));
    pepperCount = ceil(random(1, 4));
    onionCount = ceil(random(1, 4));
    basilCount = ceil(random(1, 4));
    pineappleCount = ceil(random(1, 4));
    totalToppingCount = onionCount + mushroomCount + oliveCount + pepperCount + basilCount + pineappleCount;
  } else if (pizzaType == 'deluxe') {
    pepperoniCount = ceil(random(5, 8));
    mushroomCount = ceil(random(1, 4));
    oliveCount = ceil(random(1, 4));
    pepperCount = ceil(random(1, 4));
    onionCount = ceil(random(1, 4));
    basilCount = ceil(random(1, 4));
    pineappleCount = ceil(random(1, 4));
    totalToppingCount = onionCount + mushroomCount + oliveCount + pepperCount + basilCount + pineappleCount;
  }
  let pizzaTempHolder = new Pizza(pizzaType, 300, mouseX, mouseY, 0, totalToppingCount, pepperoniCount, mushroomCount, pepperCount, oliveCount, basilCount, onionCount, pineappleCount);
  myPizzas.push(pizzaTempHolder);
}


class Pizza {
  constructor(variant, size, x, y, rotation, totalToppingCount, pepperoniCount, mushroomCount, pepperCount, oliveCount, basilCount, onionCount, pineappleCount) {
    this.variant = variant;
    this.size = size;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.toppingSize = size * 0.1;
    this.totalToppingCount = totalToppingCount;
    this.toppingPositions = [];
    this.toppingRotations = [];
    this.pepperoniCount = pepperoniCount;
    this.mushroomCount = mushroomCount;
    this.onionCount = onionCount;
    this.pepperCount = pepperCount;
    this.pineappleCount = pineappleCount;
    this.oliveCount = oliveCount;
    this.basilCount = basilCount;

    for (let i = 0; i < this.totalToppingCount; i++) {
      let spacing = TWO_PI / totalToppingCount;
      let posX = cos(i * spacing) * random(10, size / 2 - 50);
      let posY = sin(i * spacing) * random(10, size / 2 - 50);
      let newVector = createVector(posX, posY);
      this.toppingPositions.push(newVector);
      let newRotation = random(0, TWO_PI);
      this.toppingRotations.push(newRotation);
    }

    console.log(this.totalToppingCount);
    
  }

  drawPepperoni (size) {

    let scalar = 1.75;

    for (let i = 0; i < this.pepperoniCount; i++) {
        
      let rotationOffset2 = (i / this.pepperoniCount) * TWO_PI;
      noStroke();
      push();
      rotate(rotationOffset2);
      fill(176, 54, 45);   
      circle((this.size * 0.65) / 2, 0, size * 0.8 * scalar);
      fill(120, 20, 20, 160);
      circle((this.size * 0.6) / 2, 0, size * 0.25 * scalar);     
      circle((this.size * 0.7) / 2, 0, size * 0.2 * scalar);
      circle((this.size * 0.65) / 2, 10, size * 0.15 * scalar);      
      pop();
    }
  } 

  drawMushroom (size) {
    for (let i = 0; i < this.mushroomCount; i++) {
      push();
      noStroke();
      fill(228, 220, 190);
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      
      arc(0, 0, size * 1.3, size, PI, 0, OPEN);
      
      rectMode(CENTER);
      fill(220, 210, 180);
      rect(0, size * 0.25, size * 0.25, size * 0.45, size * 0.1);
      
      noFill();
      stroke(180, 170, 150);
      strokeWeight(2);
      let d = size * 0.55;
      for (let i = 0; i < 3; i++) {
        let adjustedD = d - i * (size * 0.08);
        arc(0, 0, adjustedD * 2, adjustedD * 1.6, PI + 0.15, TWO_PI - 0.15);
      }
      pop();
    }
  }

  drawOlive (size) {
    let start = this.mushroomCount;
    let end = this.mushroomCount + this.oliveCount;
    for (let i = start; i < end; i++) {
      push();
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      noFill();
      stroke(30);
      strokeWeight(3);
      ellipse(0, 0, size, size * 0.75);
      ellipse(0, 0, size * 0.5, size * 0.35);
      pop();
    }
  }

  drawPepper (size) {
    let start = this.mushroomCount + this.oliveCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount;
    for (let i = start; i < end; i++) {
      push();
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      noFill();
      stroke(0, 150, 40);
      strokeWeight(4);
      arc(0, 0, size * 1.2, size * 0.7, TWO_PI * 0.9, PI * 0.25);
      arc(0, 0, size * 0.95, size * 0.95, PI * 0.25, PI * 0.8);
      arc(0, 0, size * 0.8, size, PI * 0.8, PI * 1.25);
      pop();
    }
  }

  drawOnion (size) {
    let start = this.mushroomCount + this.oliveCount + this.pepperCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount;
    for (let i = start; i < end; i++) {
      push();
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      noFill();
      strokeWeight(3);
      stroke(170, 80, 180, 180);
      circle(0, 0, size);
      stroke(190, 120, 200, 140);
      circle(0, 0, size * 0.6);
      pop();
    }
  }

  drawBasil (size) {
    let start = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount;
    for (let i = start; i < end; i++) {
      push();
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      noStroke();
      fill(40, 150, 70);
      push(); 
      rotate(-0.3); 
      ellipse(-size * 0.35, 0, size, size * 0.5); 
      pop();

      push(); 
      rotate(0.3);  
      ellipse( size * 0.35, 0, size, size * 0.5); 
      pop();

      stroke(25, 100, 45);
      strokeWeight(2);
      line(-size * 0.35, 0, size * 0.35, 0);
      pop();
    }
  }

  drawPineapple (size) {
    let start = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount + this.pineappleCount;
    for (let i = start; i < end; i++) {
      push();
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      noStroke();
      rectMode(CENTER);
      fill(238, 187, 54);
      rect(0, 0, size, size * 0.5, size * 0.1);
      pop();
    }
  }

  
  displayPizza () {
    
    push();
    translate(this.x, this.y);
    rotate(this.rotation); 

    
    noStroke(); 
    fill(215, 170, 100);
    circle(0, 0, this.size);

    
    fill(202, 62, 48);
    circle(0, 0, this.size * 0.9);

    
    fill(248, 214, 96);
    circle(0, 0, this.size * 0.85);

    
    stroke(234, 195, 90);
    strokeWeight(2);
    
    for (let i = 0; i < 6; i ++) {
      let rotationOffset = (i / 6) * TWO_PI;
      push();
      rotate(rotationOffset);
      line(0, 0, (this.size * 0.85) / 2, 0)
      pop();
    }

    if (this.variant == "pepperoni") {
      this.drawPepperoni(this.toppingSize);  
    } else if (this.variant == "mushroom") {
      this.drawMushroom(this.toppingSize);
    } else if (this.variant == "veggie") {
      this.drawMushroom(this.toppingSize);
      this.drawOlive(this.toppingSize);
      this.drawPepper(this.toppingSize);
      this.drawOnion(this.toppingSize);
      this.drawBasil(this.toppingSize);
      this.drawPineapple(this.toppingSize);
    } else if (this.variant == "deluxe") {
      this.drawPepperoni(this.toppingSize); 
      this.drawMushroom(this.toppingSize);
      this.drawOlive(this.toppingSize);
      this.drawPepper(this.toppingSize);
      this.drawOnion(this.toppingSize);
      this.drawBasil(this.toppingSize);
      this.drawPineapple(this.toppingSize);
    }
    pop();
  }
}