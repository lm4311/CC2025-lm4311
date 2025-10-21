// As I stated last week, I will be creating a pizza factory that only serves pizzas but with many variations and toppings.
// I implemented 5 variants of pizzas, including cheese, pepperoni, mushroom, veggie, and deluxe.
// I also chose seven toppings that can be served with these variants.
// They are pepperoni, mushroom, pepper, olive, onion, basil, and pineapple.
// Cheese pizza is the most basic one with no toppings, pepperoni pizza only has pepperoni topping, mushroom pizza only has mushroom topping.
// Veggie pizza include all vegeterian toppings including all toppings except for pepperoni.
// Deluxe pizza is the most premium pizza that serves with all seven toppings.
// However, I decided not to make pizzas get served with same number of toppings even though the total number of topping types will always be the same.
// For example, the mushroom pizza sometimes will come with 5 mushrooms and sometimes will come with 10 mushrooms (range between 5 and 10).
// This topping logic applies to all pizza variants to make sure the pizzas feel organic, not just a duplicate of one another.
// I decided to implement user interactions by allowing users to pick the variant they would like through pressing different keys.
// For example, 'c' represents cheese pizza, 'm' represents mushroom pizza, 'p' represents pepperoni pizza, 'v' represents veggie pizza, and 'd' represents deluxe pizza.
// Also, if the user presses 'r' key, it will randomly choose one of those five variants for users. 
// I also decided to automatically generate pizzas in random variants for users at the start so that users can have a quick glance of what the pizzas look like.
// To make it user-friendly, I enabled the 'a' key so that users can toggle between automatic and manually placing pizzas only. 
// Even if it is in the automatic mode, the user can still manually place pizzas.
// I also allow users to remove pizzas from the canvas just by clicking on the pizza they dislike.
// Another user-friendly design I made here is that I created this scale out-in effect for any pizza that is placed on the canvas for the first time to help users identify which pizza is the freshest (newest).
// To ensure an organic pattern of pizzas, I used many random() in my pizza functions to simulate different sizes, types, positions, and topping amount.

// declare global variables
let myPizzas = []; // this array contains all the pizzas that will be drawn on the canvas
let pizzaType; // this variable contains string value for pizza type
let tempPizzaType; // this variable contains string value for pizza type but used for the automatic pizza generator
let pizzaTypeContainer = ['cheese', 'pepperoni', 'mushroom', 'veggie', 'deluxe']; // this array contains all five pizza variants

// initialize topping counts and set to default 0
let totalToppingCount = 0;
let pepperoniCount = 0;
let mushroomCount = 0;
let pepperCount = 0;
let oliveCount = 0;
let onionCount = 0;
let basilCount = 0;
let pineappleCount = 0;

// initialize topping counts and set to default 0 but used for the automatic pizza generator
let tempTotalToppingCount = 0;
let tempPepperoniCount = 0;
let tempMushroomCount = 0;
let tempPepperCount = 0;
let tempOliveCount = 0;
let tempOnionCount = 0;
let tempBasilCount = 0;
let tempPineappleCount = 0;

let randomType = false; // initialize randomType boolean to false. Users do not start with random pizza selection
let isAutoGenerate = true; // initialize isAutoGenerate boolean to true. Canvas starts by automatically generating pizzas
let lastSpawn = 0; // initialize the spawnTime for automatic generator to 0

function setup() {
  createCanvas(1200, 1200);
}

function draw() {
  background(92, 64, 44);
  // I used this for loop to call displayPizza() function on each pizza instance stored inside myPizzas array so that every pizza pushed into the array will show on the canvas
  for (let i = 0; i < myPizzas.length; i++) {
    myPizzas[i].displayPizza();
  }
  // I created this automatic pizza generator that can generate pizzas with different variants every other second
  // Here I subtract millis() by last recorded time to see how many milli seconds has passed. If it is more than 1000ms (1s), it will record the time again and if the user chooses to auto generate pizza, the generator will do its job
  if ((millis() - lastSpawn) >= 1000) {
    lastSpawn = millis();
    if (isAutoGenerate) {
      // This line of code randomly chooses one of those 5 variants and stores in the tempPizzaType for later use. I used random() function here to round the numbers to integer so that it works properly inside an array.
      tempPizzaType = pizzaTypeContainer[round(random(0, 4))]; // https://p5js.org/reference/p5/round/
      // I called this customized function here to check which pizza type it is and assign random amount for each topping and calculate the total amount of topping
      updateTempToppingCount();
      let tempSize = random(200, 300); // assign a random size for the pizza
      // create a new instance of pizza class with corresponding values. I used many random() here to create organic patterns of pizza
      let tempPizza = new Pizza(tempPizzaType, tempSize, random(0 + (tempSize / 2), width - (tempSize / 2)), random(0 + (tempSize / 2), height - (tempSize / 2)), random(0, TWO_PI), tempTotalToppingCount, tempPepperoniCount, tempMushroomCount, tempPepperCount, tempOliveCount, tempBasilCount, tempOnionCount, tempPineappleCount);
      myPizzas.push(tempPizza); // add the newly created pizza instance to myPizzas array
    }
  }
  // on-screen text for instruction
  textSize(18);
  fill(255);
  text('[c] - cheese', 75, 1150);
  text('[p] - pepperoni', 225, 1150);
  text('[m] - mushroom', 375, 1150);
  text('[v] - veggie', 525, 1150);
  text('[d] - deluxe', 675, 1150);
  text('[r] - random', 825, 1150);
  text('[a] - disable/enable', 975, 1150);
}

// I created this customized function to check which pizza type it is and assign random amount for each topping and calculate the total amount of topping
// one thing to note here is that I only assign random amount to the toppings that exist in the corresponding variant, and pepperoniCount is excluded from total topping count because later in the class I will need to have the toppings in the correct order and numbers to assign each topping a random position using cos() and sin()
// pepperoni topping will not be using random positions so it is excluded from the total topping count
function updateTempToppingCount() {
  // total topping count need to be defaulted to 0 every time to avoid infinite accumulation
  tempTotalToppingCount = 0;
  if (tempPizzaType == 'pepperoni') {
    tempPepperoniCount = round(random(2, 5)); // round random numbers to an integer so that it can be used in for loops
  } else if (tempPizzaType == 'mushroom') {
    tempMushroomCount = round(random(5, 10));
    tempTotalToppingCount = tempMushroomCount;
  } else if (tempPizzaType == 'veggie') {
    tempMushroomCount = round(random(1, 4));
    tempOliveCount = round(random(1, 4));
    tempPepperCount = round(random(1, 4));
    tempOnionCount = round(random(1, 4));
    tempBasilCount = round(random(1, 4));
    tempPineappleCount = round(random(1, 4));
    tempTotalToppingCount = tempOnionCount + tempMushroomCount + tempOliveCount + tempPepperCount + tempBasilCount + tempPineappleCount;
  } else if (tempPizzaType == 'deluxe') {
    tempPepperoniCount = round(random(5, 8));
    tempMushroomCount = round(random(1, 4));
    tempOliveCount = round(random(1, 4));
    tempPepperCount = round(random(1, 4));
    tempOnionCount = round(random(1, 4));
    tempBasilCount = round(random(1, 4));
    tempPineappleCount = round(random(1, 4));
    tempTotalToppingCount = tempOnionCount + tempMushroomCount + tempOliveCount + tempPepperCount + tempBasilCount + tempPineappleCount;
  }
}

// same reason for creating this customized function except that it is used for spawning pizzas with mouse clicks
// I created the second version of the same function and corresponding variables to make sure the automatic generator does not interfere with manual spawned pizzas
// I wanted each system to contain their own values to avoid future bugs and errors
// the only difference of this customized function is that it receives random type input from the user, signaling whether to spawn a random pizza variant for the next mouse click
function updateToppingCount() {
  totalToppingCount = 0;
  if (randomType == true) {
    pizzaType = pizzaTypeContainer[round(random(0, 4))];
  }
  if (pizzaType == 'pepperoni') {
    pepperoniCount = round(random(2, 5));
  } else if (pizzaType == 'mushroom') {
    mushroomCount = round(random(5, 10));
    totalToppingCount = mushroomCount;
  } else if (pizzaType == 'veggie') {
    mushroomCount = round(random(1, 4));
    oliveCount = round(random(1, 4));
    pepperCount = round(random(1, 4));
    onionCount = round(random(1, 4));
    basilCount = round(random(1, 4));
    pineappleCount = round(random(1, 4));
    totalToppingCount = onionCount + mushroomCount + oliveCount + pepperCount + basilCount + pineappleCount;
  } else if (pizzaType == 'deluxe') {
    pepperoniCount = round(random(5, 8));
    mushroomCount = round(random(1, 4));
    oliveCount = round(random(1, 4));
    pepperCount = round(random(1, 4));
    onionCount = round(random(1, 4));
    basilCount = round(random(1, 4));
    pineappleCount = round(random(1, 4));
    totalToppingCount = onionCount + mushroomCount + oliveCount + pepperCount + basilCount + pineappleCount;
  }
}

// I used this built-in function to receive user key input and decide which pizza variant users want
// Users can select a random variant each time by pressing 'r' and enabling or disabling pizza auto-generation by toggling 'a'
// need to reset random type to false so that when users choose other pizza supplies, it will not randomly choose one for user
function keyPressed() {
  randomType = false;
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
  } else if (key == 'r') {
    randomType = true;
  } else if (key = 'a') {
    if (isAutoGenerate) {
      isAutoGenerate = false;
    } else {
      isAutoGenerate = true;
    }
  }
}
 
// I used this built-in function to receive user mouse click input so that when user clicks on the canvas, it will generate a pizza at that (mouseX, mouseY) location
// it can also detect if the user's mouse is within any pizza's radius, and if it is hovering over any pizza, when the mouse is clicked, it will remove that pizza instead of generating a new one
function mousePressed() {
  let isHovering = false;
  // need to check which pizza type the user chooses and assign random amount for each topping and calculate the total amount of topping
  updateToppingCount();

  // I used a reverse for loop to scan through all pizza instances that might be hovered by the mouse
  // It will scan from the end of the array to ensure the pizza layered at the top will be removed first if the mouse hovers over the intersection of two pizzas
  for (let i = myPizzas.length - 1; i >= 0; i--) {
    if (myPizzas[i].hovering == true) {
      myPizzas.splice(i, 1); // splice() function is used to remove the hovered pizza | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      isHovering = true; // set isHovering to true so that the next conditional statement will never be executed by any chance. We want to remove instead of add when mouse is hovering over a pizza
      return; // I used return here so that the for loop will not keep deleting pizzas once it has already has deleted one. We want it to exit the loop immediately once the first pizza is removed | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
    }
  }

  // if the mouse is not hovering over any pizzas, a new pizza instance will be added to the canvas based on mouse click and parameters
  if (isHovering == false) {
    let pizzaTempHolder = new Pizza(pizzaType, random(200, 300), mouseX, mouseY, random(0, TWO_PI), totalToppingCount, pepperoniCount, mushroomCount, pepperCount, oliveCount, basilCount, onionCount, pineappleCount);
    myPizzas.push(pizzaTempHolder);
  }
}

// I created this customized function as a helper to simulate scale-out-in effect. It takes in the time when the pizza is added to the canvas, the animation duration in ms, and max scale value allowed
// I used lerp() to smooth out the scaling effect
function spawnLerpScale(spawnTime, animDuration, maxScale) {
  // alpha controls the progress of the interpolation, so I subtracted current time in ms by the time when it was first spawned on canvas, and then divide it by the total duration I want it to animate. 
  // this gives me the progress of the animation from 0 to infinity. So to make it stay within bound and to prevent future crashes, I used the constrain() function to make it stay within 0 to 1 bound
  // even it finishes animating, alpha will remain at 1
  let alpha = constrain((millis() - spawnTime) / animDuration, 0 , 1);
  // when the animation is before half, this function keeps returning the lerp value from 1 to max scale
  // I multiplied alpha by 2 is becuase I wanted it to reach max scale despite the max scale animation only plays to the half of the entire animation duration
  if (alpha <= 0.5) {
    return lerp(1, maxScale, alpha * 2);
  } else {
    // when the animation is half way to the finish line, this function keeps returning the lerp value from max scale back to 1
    // I subtracted alpha by 0.5 to let the lerping progress begin at 0 and then multiply the whole thing by 2 so that it lerps completely back to 1
    return lerp(maxScale, 1, (alpha - 0.5) * 2);
  }
}

// I created Pizza class to spawn instances of it using same parameters but storing different values for each instance
class Pizza {
  // create parameters for pizza instance
  constructor(variant, size, x, y, rotation, totalToppingCount, pepperoniCount, mushroomCount, pepperCount, oliveCount, basilCount, onionCount, pineappleCount) {
    // assign parameter values to pizza instance
    this.variant = variant;
    this.size = size;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.totalToppingCount = totalToppingCount;
    this.pepperoniCount = pepperoniCount;
    this.mushroomCount = mushroomCount;
    this.onionCount = onionCount;
    this.pepperCount = pepperCount;
    this.pineappleCount = pineappleCount;
    this.oliveCount = oliveCount;
    this.basilCount = basilCount;
    // define variables inside class 
    this.hovering = false; // this variable is used to determine mouse hovering
    this.spawnTime = millis(); // these three variables will be used for the scale-out-in animation
    this.animDuration = 500; // ...
    this.maxScale = 1.2; // ...
    this.toppingSize = size * 0.1; // this is a general scalar for topping size
    this.toppingPositions = []; // this array stores topping positions in terms of 2d vector location
    this.toppingRotations = []; // this array stores topping rotations 

    // I got inspired by the in-class tutorial of using this method to locate toppings in a random pattern | https://www.dropbox.com/scl/fi/bm0d4q30z7w4wgb0p3lry/PizzaClass.mov?rlkey=h97dnqmlu2242aimf8qgj2cb1&e=2&dl=0
    // I used a for loop to loop through every toppings added based on the variant so that each topping will have a random position based on the cos() and sin() function combined with random()
    // by randomly assigning polar coordinates to the toppings, I can make sure every topping stays wihtin the crust while maintaining a random arrangement which makes the pizza look more organic

    for (let i = 0; i < this.totalToppingCount; i++) {
      let spacing = TWO_PI / totalToppingCount; // even spacing for each topping but will be randomized after
      let posX = cos(i * spacing) * random(10, size / 2 - 50); // randomized polar coordinate
      let posY = sin(i * spacing) * random(10, size / 2 - 50);
      let newVector = createVector(posX, posY); // create a 2d vector to store the polar coordinate
      this.toppingPositions.push(newVector); // add each polar coordinate to the array so they can be distributed afterwards
      let newRotation = random(0, TWO_PI); // create random rotation for each topping that ranges between 0 and two PI (0 - 360 deg)
      this.toppingRotations.push(newRotation); // add each rotation value to the array so they can be distributed afterwards
    }
  }

  // I created this customized function inside the Pizza class to help draw the toppings on top of the base layers like crust and sauce
  // I created one for each of the toppings, which makes debugging easier
  // each draw topping function will take in size value from each pizza instance's toppingSize
  drawPepperoni (size) {

    let scalar = 1.75; // scalar variable

    // I created this loop to place "pepperoniCount" amount of pepperoni toppings on the crust
    // it will circle around the crust because I rotated every pepperoni evenly and separate each rotation offset using push() and pop()
    for (let i = 0; i < this.pepperoniCount; i++) {
        
      let rotationOffset2 = (i / this.pepperoniCount) * TWO_PI;
      noStroke();
      push();
      rotate(rotationOffset2);
      fill(176, 54, 45);   
      // I offset the circle x coordinate from the crust center so that the pepperoni will stay at the edge instead of middle
      // this first circle draws the pepperoni base shape
      circle((this.size * 0.65) / 2, 0, size * 0.8 * scalar);
      fill(120, 20, 20, 160);
      // these three additional circles draw the darker small areas inside the larger circle to represent fats
      circle((this.size * 0.6) / 2, 0, size * 0.25 * scalar);     
      circle((this.size * 0.7) / 2, 0, size * 0.2 * scalar);
      circle((this.size * 0.65) / 2, 10, size * 0.15 * scalar);      
      pop();
    }
  } 

  drawMushroom (size) {
    // this outer for loop spreads "mushroomCount" number of mushrooms on the crust using the pre-assigned positions we added to the toppingPositions array
    // translate() is used here to adjust each mushroom topping's position based on the array. The x and y value of the 2d postion vector is retrieved from the i index of the array, and these values are going to be the x and y coordinate offset of each mushroom
    // rotate() is used here to adjust each mushroom's rotation based on the values stored in the toppingRotations array
    for (let i = 0; i < this.mushroomCount; i++) {
      push(); // separate transformation for each mushroom
      noStroke();
      fill(228, 220, 190);
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y);
      rotate(this.toppingRotations[i]);
      
      // draws the upper big arc of the mushroom
      arc(0, 0, size * 1.3, size, PI, 0, OPEN);
      
      // draws the lower rectangle part of the mushroom
      rectMode(CENTER);
      fill(220, 210, 180);
      rect(0, size * 0.25, size * 0.25, size * 0.45, size * 0.1);
      
      // I used a for loop to iterate three drawings for the mushroom thin arcs within the upper large arc
      noFill();
      stroke(180, 170, 150);
      strokeWeight(2);
      let d = size * 0.55; // define diameter
      for (let i = 0; i < 3; i++) {
        // I offseted each thin arc by (size * 0.08) each time
        let adjustedD = d - i * (size * 0.08);
        arc(0, 0, adjustedD * 2, adjustedD * 1.6, PI + 0.15, TWO_PI - 0.15);
      }
      pop();
    }
  }

  drawOlive (size) {
    // I created the start and end number to deal with incremental index in toppingPosition array as well as toppingRotation array
    // by doing so, the topping's position and rotation will not be the same as the previous topping type's
    let start = this.mushroomCount;
    let end = this.mushroomCount + this.oliveCount; 
    for (let i = start; i < end; i++) {
      push(); // separate transformation
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y); // same logic
      rotate(this.toppingRotations[i]); // same logic
      noFill();
      stroke(30);
      strokeWeight(3);
      // draws olive shape using two ellipses
      ellipse(0, 0, size, size * 0.75);
      ellipse(0, 0, size * 0.5, size * 0.35);
      pop();
    }
  }

  drawPepper (size) {
    // same logic for incremental index in the toppingPosition and toppingRotation array
    let start = this.mushroomCount + this.oliveCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount;
    for (let i = start; i < end; i++) {
      push(); // separate transformation
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y); // same logic
      rotate(this.toppingRotations[i]); // same logic
      noFill();
      stroke(0, 150, 40);
      strokeWeight(4);
      // draws pepper shape using three arcs
      arc(0, 0, size * 1.2, size * 0.7, TWO_PI * 0.9, PI * 0.25);
      arc(0, 0, size * 0.95, size * 0.95, PI * 0.25, PI * 0.8);
      arc(0, 0, size * 0.8, size, PI * 0.8, PI * 1.25);
      pop();
    }
  }

  drawOnion (size) {
    // same logic for incremental index in the toppingPosition and toppingRotation array
    let start = this.mushroomCount + this.oliveCount + this.pepperCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount;
    for (let i = start; i < end; i++) {
      push(); // separate transformation
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y); // same logic
      rotate(this.toppingRotations[i]); // same logic
      noFill();
      strokeWeight(3);
      stroke(170, 80, 180, 180);
      // draws onion using two circles
      circle(0, 0, size);
      stroke(190, 120, 200, 140);
      circle(0, 0, size * 0.6);
      pop();
    }
  }

  drawBasil (size) {
    // same logic for incremental index in the toppingPosition and toppingRotation array
    let start = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount;
    for (let i = start; i < end; i++) {
      push(); // separate each basil's transformation
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y); // same logic
      rotate(this.toppingRotations[i]); // same logic

      // draws the left leaf using ellipse
      noStroke();
      fill(40, 150, 70);
      push(); // separate each leaf's transformation
      rotate(-0.3); 
      ellipse(-size * 0.35, 0, size, size * 0.5); 
      pop();

      // draws the right leaf using ellipse
      push(); // separate each leaf's transformation
      rotate(0.3);  
      ellipse( size * 0.35, 0, size, size * 0.5); 
      pop();

      // draws the stem that connects the two leaves using a single line
      stroke(25, 100, 45);
      strokeWeight(2);
      line(-size * 0.35, 0, size * 0.35, 0);
      pop();
    }
  }

  drawPineapple (size) {
    // same logic for incremental index in the toppingPosition and toppingRotation array
    let start = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount;
    let end = this.mushroomCount + this.oliveCount + this.pepperCount + this.onionCount + this.basilCount + this.pineappleCount;
    for (let i = start; i < end; i++) {
      push(); // separate each basil's transformation
      translate(this.toppingPositions[i].x, this.toppingPositions[i].y); // same logic
      rotate(this.toppingRotations[i]); // same logic
      noStroke();
      // draws the pineapple using rectangle
      rectMode(CENTER);
      fill(238, 187, 54);
      rect(0, 0, size, size * 0.5, size * 0.1);
      pop();
    }
  }

  // I created this customized class function to display each individual pizza instance on the canvas
  // It draws the basic layers of the pizza like the crust, sauce, and cheese. It also outlines the thin cuts within the pizza.
  // this function also uses other helper functions from the class that we created previously, such as the drawPepperoni() and drawMushroom() etc., to draw the entire look of the pizza with all their corresponding toppings chosen by users and printed them on the canvas
  // this displayPizza function also keep tracks of the distance between mouse and each pizza instance, and when the distance is close enough, it will mark it as being hovered and will be removed once the user clicks on it
  // I used dist() function over here is because displayPizza() runs inside draw(), meaning that it will get updated every frame, so here is the solid place for keeping track of mouse distance
  displayPizza () {

    let mouseDist = dist(mouseX, mouseY, this.x, this.y); // https://p5js.org/reference/p5/dist/
    // if mouse is hovering over this pizza instance, this pizza instance will be marked hovering = true, and vice versa
    if (mouseDist < this.size / 2) {
      this.hovering = true;
    } else {
      this.hovering = false;
    }

    // I called the spawnLerpScale() function here to update the lerp for my scale-out-in effect
    // I store the lerped scale value to lerpScale so that it can be used inside the scale() function to smooth the scale effect
    let lerpScale = spawnLerpScale(this.spawnTime, this.animDuration, this.maxScale);
    
    push(); // separate transformation of each pizza instance
    translate(this.x, this.y); // translate the entire pizza based on the given x and y values
    rotate(this.rotation); // rotate the entire pizza based on the given rotation values
    scale(lerpScale); // https://p5js.org/examples/transformation-scale/

    // draws crust
    noStroke(); 
    fill(215, 170, 100);
    circle(0, 0, this.size);

    // draws sauce
    fill(202, 62, 48);
    circle(0, 0, this.size * 0.9);

    // draws cheese
    fill(248, 214, 96);
    circle(0, 0, this.size * 0.85);

    stroke(234, 195, 90);
    strokeWeight(2);
    // I used this for loop to draw six slice lines of the pizza
    // they are spreaded evenly in a circular pattern
    // I did it by offsetting each line's rotation and separating those rotations using push() and pop()
    for (let i = 0; i < 6; i ++) {
      let rotationOffset = (i / 6) * TWO_PI; // space the slice lines evenly
      push();
      rotate(rotationOffset);
      line(0, 0, (this.size * 0.85) / 2, 0)
      pop();
    }

    // I used these conditional statements to decide what toppings should be provided on top of the pizza based on the pizza variant
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