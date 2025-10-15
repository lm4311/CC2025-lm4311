// for this assignment, I planned to do a food factory that only makes pizza but serving many variations of pizza
// for example, there would be cheese pizza, pepperoni pizza, mushroom pizza, veggie pizza, and deluxe pizza
// each of these variants will come with their own lists of toppings except for cheese pizza
// for example, pepperoni pizza will come with pepperoni only, mushroom pizza will come with mushroom only
// veggie pizza will come with mushroom, onion, pepper, basil, and pineapple
// deluxe pizza will come with all of the toppinngs available
// for creating these variations, I created a Pizza class already to include some of the characteristics of pizza 
// I didn't include all necessary parameters in consturctor yet because for this week's in-progress I will only show the two classic pizzas as an example
// they are the classic cheese pizza and pepperoni pizza
// for constructor parameters, I included variant, size, toppingCount, x and y coordinate, and rotation. I think it is enough for now
// for next week, I'm thinking to do some randomization for topping count of each toppings used and randomization for the rotation of pizza
// pizza size will also be randomized to ensure diversity. I will draw much more variations of pizzas on canvas next week
// I am also thinking to add some interactions to the canvas by implementing mousePressed(), second() function, keyboard inputs, mouseX and mouseY

// declare different variants of pizza
let cheesePizza;
let pepperoniPizza;

function setup() {
  createCanvas(900, 600);
  background(60);
  
  // here I created two instances of the Pizza class. One for cheese pizza and one for pepperoni pizza
  // for each pizza instance, I passed on different values to their parameters accordingly
  // for example the variant will be cheese or pepperoni. Size, topping count, xy coordinate, and rotation all have their own values
  // this is very modular for creating variants and it is very scalable for next week if I am trying to do lots of variants and randomness
  cheesePizza = new Pizza("cheese", 250, 0, 240, 300, 0);
  pepperoniPizza = new Pizza ("pepperoni", 300, 8, 640, 300, 0.3);

  // this is for labeling the two pizzas on canvas
  noStroke();
  fill(255);
  textSize(16);
  text("Cheese Pizza", 190, 500);
  text("Pepperoni Pizza", 590, 500);
}

function draw() {
  // to drawn each pizza instance out on canvas, I called each instance and their corresponding displayPizza function to execute code inside displayPizza()
  cheesePizza.displayPizza();
  pepperoniPizza.displayPizza();
}


// I created the class called Pizza and assigned six parameters to the constructor so far so that each instance is able to adjust its own parameter to change their size, toppingCount, xy coordinate, and rotation
// after creating the constructor parameters, I assign those parameter values to each instance specific parameter so that each of the instance contains their unique parameter values
// this is the crucial step as it makes everything modular and scalable
class Pizza {
  constructor(variant, size, toppingCount, x, y, rotation) {
    this.variant = variant;
    this.size = size;
    this.toppingCount = toppingCount;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  // inside the Pizza class, I created this function called displayPizza to execute anything that relates to each pizza instance's transformation and rendering, in order to make it appear on canvas
  displayPizza () {
    // I used push and pop here and wrapped all things inside is becuase I need to ensure the translation for each pizza instance will not affect the next pizza
    // put in other words, I want each pizza instance to follow the translation independently. This way it is much controllable and easier to manage
    push();
    translate(this.x, this.y); // center each pizza instance position at this.x and this.y
    rotate(this.rotation); // rotate each pizza instance by this.rotation in radians

    // after adjusting each pizza instance's transformation, it's now the time to draw the pizza's look. I did it layer by layer
    // the first layer is for the base crust. It will take this.size as its diameter since base crust is the outermost shape for pizza
    noStroke(); 
    fill(215, 170, 100);
    circle(0, 0, this.size);

    // the second layer is sauce layer, which is typically the inset of the base crust
    // so I drew another circle but with a smaller size, which shrinks by 0.9 times of the original size
    fill(202, 62, 48);
    circle(0, 0, this.size * 0.9);

    // the third layer is cheese layer, which is typically the inset of the sauce layer
    // so I drew another circle on top of it but with a smaller size, which shrinks by 0.85 times of the original size
    fill(248, 214, 96);
    circle(0, 0, this.size * 0.85);

    // to make it look more like a pizza instead of a pie, I decided to add some slice lines spreading around the center point
    stroke(234, 195, 90);
    strokeWeight(2);
    // because it is a repetitive task for generating these lines, I decided to use a for loop here to create 6 slice lines
    // for each spice line, it will start from the pizza center point and draw toward the cheese layer edge, which has a length of the sauce layer radius
    // each spice line will rotate in an increase offset by (i / 6) * 2PI radians, meaning that they will be spaced evenly across the span of the entire circle
    // here is also used the push and pop to separate each slice line transformation
    for (let i = 0; i < 6; i ++) {
      let rotationOffset = (i / 6) * TWO_PI;

      push();
      rotate(rotationOffset);
      line(0, 0, (this.size * 0.85) / 2, 0)
      pop();
    }

    // because different pizza variants have different looks and toppings, I created this if statement to isolate the pepperoni pizza and make only the pepperoni pizza execute the logics below
    if (this.variant == "pepperoni") {
      // to create the pepperoni, I first set the size of each one by multiplying the original size by 0.12, so it scales with the entire pizza
      let ringSize = this.size * 0.12;
      // then I used this for loop to create a maximum of toppingCount number of pepperoni
      // I used the same method as the for loop above to evenly space out the pepperoni across the circle
      // every logic used from the for loop above can directly apply to this for loop
      for (let j = 0; j < this.toppingCount; j++) {
        let rotationOffset2 = (j / this.toppingCount) * TWO_PI;
        noStroke();
        push();
        rotate(rotationOffset2);
        fill(176, 54, 45);   
        circle((this.size * 0.65) / 2, 0, ringSize);      
        pop();
      }
    }

    pop();
  }
}