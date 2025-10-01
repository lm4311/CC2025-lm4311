// declare or initializing variables
let tileSize = 32; // size for each tile
let dScale = 1; // scale factor for the arc diameter
let isDragging = false; // boolean for mouse drag
let isPressed = false; // boolean for mouse press
let colorA, colorB , direction; // arc stroke color 
let colorController; // control arc stroke color dynamically
let bgColorControllerR; // controls background color R value
let bgColorControllerG; // controls background color G value
let bgColorControllerB; // controls background color B value

function setup() {
  createCanvas(832, 640);
  noLoop(); // prevent redrawing all time
  colorMode(RGB); // initialize color mode to RGB
  colorA = color("#66ccff"); // set up first color for arc stroke
  colorB = color("#ff6b6b"); // set up second color for arc stroke
  noFill(); // only want stroke 
  strokeWeight(2); // set to a thin stroke
}

function draw() {

  // setting background color dynamically based on user mouseX and mouseY input when user is dragging or pressing mouse
  if (isDragging == true || isPressed == true){
    // here I used constrain function because I found out that map function sometimes can exceed the limit when mouse goes out from the canvas
    bgColorControllerR = constrain(map(mouseX, 0, width, 0, 40), 0, 40); // constrain mapped value so that R value stays within bound | https://p5js.org/examples/calculating-values-constrain/
    bgColorControllerG = constrain(map(mouseY, 0, height, 30, 80), 30, 80);
    bgColorControllerB = constrain(map(mouseY, 0, height, 100, 160), 100, 160);
    background(bgColorControllerR, bgColorControllerG, bgColorControllerB);
  } else {
    // return to default background color after releasing
    background("#125079ff");
  }

  // initializing number of columns and rows
  // here I decided to use ceil function is because I wanted an integer to use in the nested for loop
  let cols = ceil(width / tileSize); // divide the canvas width by each desired tile size to get the resulting column amount. use ceil function to always round up to an integer | https://p5js.org/reference/p5/ceil/
  let rows = ceil(height / tileSize); // same logic applies

  // create repeating pattern across whole canvas but with increasingly chaotic pattern along Y axis
  // this first for loop creates patterns across Y-axis
  for (let j = 0; j < rows; j++) {

    // chaos goes 0 to 1 from top row to bottom row
    let t = map(j, 0, rows - 1, 0, 1); // this is the variable I created for manupulating chaos strength based on row numbers
    
    // this second for loop creates patterns across X-axis
    for (let i = 0; i < cols; i++) {
      // define base position (center) for each tile
      let centerX = i * tileSize + tileSize * 0.5; // space tiles out evenly by a tile size each time with a tile radius offset
      let centerY = j * tileSize + tileSize * 0.5; // same logic applies

      // here I created three variables to manipulate how chaotic I want my pattern to be. I used t in each variable to make sure each of these variables is related to the chaos factor
      // since t increases along Y-axis, my pattern will be much more chaotic in transformations down the bottom
      let jitter = t * tileSize * 0.4; // create jitter effect by shifting position with t
      let rot    = t * random(-PI, PI); // random rotation grows with t between -PI and PI | https://p5js.org/reference/p5/random/
      let span   = map(t, 0, 1, 0, PI / 2); // arc lengthens with t

      // this if statement is used to skip random tiles across the canvas but more near the bottom to create a more chaotic feeling
      if (random() > t * 0.15) { // random() range between 0 and 1

        push(); // add transformations separately for each tile

        // this if statement is used to change color dynamically for each arc when user drag or press mouse
        if (isDragging == true || isPressed == true){
          // I wanted to add some more diversity so I added this conditional statement by check for odd and even tiles using the remainder opertation. I learned this operation in my first year computer science class and it's a common way to find out the odd and even numbers
          // If the number can be divided by 2, then it has to be even, and vice versa | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
          if ((i + j) % 2 == 0) {
            colorController = map(mouseX, 0, width, 0, 1, true); // even tiles go from 0 to 1
          } else {
            colorController = map(mouseX, 0, width, 1, 0, true); // odd tiles go from 1 to 0
          }
          // at this point I wanted to do some gradual change for the arc color responding to user mouse input, so I researched a bit and decided to try using lerpColor function that I found on P5.JS and gave it a try
          // lerpColor takes in two solid colors and lerp linearly from one to another based on the alpha that is the third parameter. When color controller (alpha) is 0, the color will be A. When alpha is 1, the color will be B.
          // lerpColor work both ways and interpolate the colors between colorA and colorB
          let dynamicColor = lerpColor(colorA, colorB, colorController); // lerp color in opposite for the closest two arcs by alpha (colorController) | https://p5js.org/reference/p5/lerpColor/
          stroke(dynamicColor); 
        } else {
          // reset to default arc stroke color when release
          stroke(240);
        } 

        // translate each tile for even spacing and jitter randomness 
        translate(centerX + random(-jitter, jitter), centerY + random(-jitter, jitter) - 25);

        // here I chose an alternative approach from drawing two opposite arcs for each draw run. I drew all of the arcs all at the same direction but will change the orientation for every other tile
        // alternate orientation for tiles
        let additiveRot;
        // here I still use the remainder operator to check for even and odd tiles
        if ((i + j) % 2 == 0) {
          additiveRot = 0; // even tiles remain the same base rotation
        } else {
          additiveRot = radians(270); // odd tiles rotate 270 degrees so every two nearby arcs will back facing each other
        }

        rotate(additiveRot + rot); // compute additional rotation added to the base rotation

        // adjust arc diameter a bit based on t and user mouseX input
        d = tileSize * map(t, 0, 1, 1.0, 1.25) * dScale;

        // draw arc at the origin with the size of d and span between -90 degrees and 0 to 90 degrees
        arc(0, 0, d, d, radians(-90), span);

        pop();
      }   
    }
  }
}

//I decided to use mousePressed function to let the users interact with the canvas
// execute when moues pressed | https://p5js.org/reference/p5/mousePressed/
function mousePressed() {
  // loop to constantly redraw to show simulated chaos 
  loop();
  // dynamically change arc diameter scale factor based on user mouseX input and restrict between 0.75 and 1.25
  // here again, I used the constrain function to avoid values exceeding 0.75 and 1.25 when user mouse is outside of the canvas
  dScale = constrain(map(mouseX, 0, width, 0.75, 1.25), 0.75, 1.25);
  isPressed = true;
}

// I chose to use mouseDragged function is because I wanted the user experience to be smoother by allower user sliding their mouse across the canvas and triggering dynamic change in arcs (animation)
// execute when mouse dragged | https://p5js.org/reference/p5/mouseDragged/
function mouseDragged() {
  // dynamically change arc diameter scale factor based on user mouseX input and restrict between 0.75 and 1.25
  dScale = constrain(map(mouseX, 0, width, 0.75, 1.25), 0.75, 1.25);
  isDragging = true;
}

// I chose to use mouseReleased function is because I wanted my canvas to return to default when users stop interacting with canvas. This way encourages users to interact with the canvas to explore animated pattern
// execute when mouse released | https://p5js.org/reference/p5/mouseReleased/
function mouseReleased() {
  // stop looping and reset to default
  noLoop();
  tileSize = 32; // reset tile size to default 32
  dScale = 1; // reset arc diameter scale factor to default 1
  isDragging = false; // reset isDragging to default false
  isPressed = false; // reset isPressed to default false
}

