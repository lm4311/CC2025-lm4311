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
      let cx = i * tileSize + tileSize * 0.5; // space tiles out evenly by a tile size each time with a tile radius offset
      let cy = j * tileSize + tileSize * 0.5; // same logic applies

      // chaos controls
      let jitter = t * tileSize * 0.4; // create jitter effect by shifting position with t
      let rot    = t * random(-PI, PI); // random rotation grows with t between -PI and PI | https://p5js.org/reference/p5/random/
      let span   = map(t, 0, 1, 0, PI / 2); // arc lengthens with t

      // skip more tiles near the bottom
      if (random() > t * 0.15) { // random() range between 0 and 1

        push(); // add transformations separately for each tile

        // change color dynamically for each arc when user drag or press mouse
        if (isDragging == true || isPressed == true){
          // check for odd and even tiles
          if ((i + j) % 2 === 0) {
            colorController = map(mouseX, 0, width, 0, 1, true); // even tiles go from 0 to 1
          } else {
            colorController = map(mouseX, 0, width, 1, 0, true); // odd tiles go from 1 to 1
          }
          let dynamicColor = lerpColor(colorA, colorB, colorController); // lerp color in opposite for the closest two arcs by alpha (colorController) | https://p5js.org/reference/p5/lerpColor/
          stroke(dynamicColor); 
        } else {
          // reset to default arc stroke color when release
          stroke(240);
        } 

        // translate each tile for even spacing and jitter randomness 
        translate(cx + random(-jitter, jitter), cy + random(-jitter, jitter) - 25);

        // alternate orientation for tiles
        let additiveRot;
        // check for even and odd tiles
        if ((i + j) % 2 === 0) {
          additiveRot = 0; // even tiles remain the same base rotation
        } else {
          additiveRot = radians(270); // odd tiles rotate 270 degrees
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

// execute when moues pressed
function mousePressed() {
  // loop to constantly redraw to show simulated chaos 
  loop();
  // dynamically change arc diameter scale factor based on user mouseX input and restrict between 0.75 and 1.25
  dScale = constrain(map(mouseX, 0, width, 0.75, 1.25), 0.75, 1.25);
  isPressed = true;
}

// execute when mouse dragged
function mouseDragged() {
  // dynamically change arc diameter scale factor based on user mouseX input and restrict between 0.75 and 1.25
  dScale = constrain(map(mouseX, 0, width, 0.75, 1.25), 0.75, 1.25);
  isDragging = true;
}

// execute when mouse released
function mouseReleased() {
  // stop looping and reset to default pattern with random seed 5
  noLoop();
  tileSize = 32; // reset tile size to default 32
  dScale = 1; // reset arc diameter scale factor to default 1
  isDragging = false; // reset isDragging to default false
  isPressed = false; // reset isPressed to default false
}

