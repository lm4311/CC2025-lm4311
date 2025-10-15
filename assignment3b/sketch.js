// This week I focused on finishing my tree ring abstract clock by aadding the ring animation and interactions to the original idea
// Last week it was about the overall appearance of the clock, and this week is about giving the functionality to it so it can respond to time in an unconventional way
// This clock starts at the current time based on month() and day(), meaning that it will adjust its growth ring number and length accordingly.
// For example, if the current month is October and the current day is 15th of October, the clock will have 10 growth rings with another half completed ring at start.
// Each ring will represent a month of time passage, and each full ring consists of 30 days, meaning that the ring will complete a full circle in 30 days
// Because I wanted to show more clearly about the passage of time, I decided to just anchor the tree ring clock's initial time to the actual calendar time, and for the time passage after the initial time will be fully based on the speed I set for the clock
// The color of the tree ring will change gradually within each full year, from a lightwood color to a darkwood color. I did this intentionally for a realistic tree ring surface because tree rings do get from a light to dark from based on seasonal factors and temperatures. Rings are light in Spring and dark in Winter
// Also, the tree pith color will also change gradually based on customized time passage speed after initialliy anchored the time to the real calendar
// Once the tree rings reach to their maximum amount, the tree barks will add another layer on top of itself. I did this to simulate the tree growth once every four year, despite I speed up this process by assigning the time passage rate to a customized speed
// After every four years (4 year rings - 48 rings in total), the rings will default back to the calendar time and start again from there
// For user convenience, I added a mouse interction so if the user hold their left mouse button, it will speed up the entire time elapsing rate to show the conccept of time passage in the way that relates to the most fundamental concept of time through nature objects

// constant variables
let years = 4; // set the tree max years to 4 years old - 4 year rings
let monthsPerYear = 12; // set the number of months in one year
let daysPerMonth; // declare amount of days in a month in the global scope so it could store values globally for easy access

let thinStrokeWidth = 1.4; // set the stroke width value for thin tree ring for easy adjustment later on
let thickStrokeWidth = 3.0; // set the stroke width value for thick tree ring for easy adjustment later on

let monthRingGap = 7; // set the gap reserved for each thin ring  
let yearRingGap = 3; // set the gap reserved for each thick ring  
let pithRadius = 18; // set the radius value for the centered pith for easy access and adjustment 

let centerX; // initialize the center point x-coordinate of the tree ring clock - will be used later for overall translate
let centerY; // initialize the center point y-coordinate of the tree ring clock - will be used later for overall translate

// I found that it was pretty tedious to find the outer radius of this digital clock each time I needed it, so I set this variable for quick access to the outer radius of this clock
// outer radius consists of the pith radius, 47 thin ring gap, and 3 year ring gap
let outerRadius = pithRadius + (years * monthsPerYear - 1) * monthRingGap + (years - 1) * yearRingGap;

let barkRectCount = 64; // set the number of rectangular bark pieces for easy adjustment

// functional variables
let ringColor; // declare to be used in mapColor() customized function
let currentRing; // delcare to be used for tracking actively drawing arcs
let ringRadiusContainer = []; // declare array to be used for containing all radius data for 48 rings
let isYearRing = []; // declare array to to store boolean values for keeping track of year ring (every 12th ring)
let currentAngle = 0; // declare to be used for accumulating arc span length that sums to two PI
let currentAngleOffset = 0; // declare to be used for accumulating arc span length for the first imcompleted ring
let canLoop = false; //initialize the gate boolean to false 
let doOnce = false; // initialize the Do Once boolean to false
let mouseIsPressed = false; // initialize the mouse press boolean to false

// color variables for global access
let lightWood; 
let darkWood;
let pithColor;
let barkFill;
let barkStroke;

function setup() {
  createCanvas(840, 840);
  angleMode(RADIANS); // I'm more comfortable using radians when working with circles, and there will be a lot involving angles, so I decided to change the angle mode to radians. | https://p5js.org/reference/p5/angleMode/
  centerX = width / 2; // center the x-coordinate
  centerY = height / 2; // center the y-coordiante so all the shapes stay in middle
  background("rgba(24, 121, 45, 1)"); // set the background color to green fow now to represent grass

  // set all the colors needed for the tree ring digital clock
  // color palette
  currentRing = month() + 1; // set the current ring to month() + 1 so the the rings keep looping right after the initial ring setup
  lightWood = color(210, 176, 135); 
  darkWood = color(120, 85, 60);
  pithColor = color(184, 150, 116);
  barkFill = color(76, 58, 46);
  barkStroke = color(45, 35, 28);

  // here I called a customized function that stores all ring radius values and year rings inside their corresponding arrays, so I preset the enitre layout before any drawing happens so it is easy for me to debug later on
  // initially it was a disaster having repeated codes just for getting each growth ring radius, including year rings which has an additional gap for it
  // so I created this customized function so everything that needs to have access to each growth ring radius will stay at one place, which is this function.
  arrangeRingLayout();

  // set text for hint
  textSize(18)
  text('Hold Left Mouse Button To Fast Forward', 510, 20);
}

function draw() {
  // translate the origin for all shapes below to the screen center. It is super convenient as I will be handling lots of circles and rectangles
  translate(centerX, centerY);
 
  // this small section is for creating the tree ring base with a deep brown color
  // all ellipses from now will be using 0,0 origin for consistency
  stroke(barkStroke);
  fill(barkStroke);
  ellipse(0, 0, outerRadius * 2, outerRadius * 2);

  // this small section is for creating the tree pith, which is the small filled circle in the center
  // I added dynamic color logic so the pith color will change within the brownish color scheme based on milliseconds
  // I first declared the current calendar month, day, and hour as the anchor time for the tree ring clock. So the clock will begin the time according to these three time values
  let initialMonth = month(); 
  let initialDay = day();
  let initialHour = hour();
  let hourSpeed; // declare the speed controller for adjusting how fast I want the current hour to be changing
  // here I bring up the if statement to check if user is pressing down the mouse or not. If the user is pressing the mouse, then the hours will be fast forward 10 times than before
  if (mouseIsPressed) {
    hourSpeed = 5; // accelerated speed
  } else {
    hourSpeed = 0.5; // default hour elapsing speed
  }
  // I need a variable that can store the sum of anchored initial hour and the elapsing hours in terms of seconds. So in my case, two seconds is treated as an hour. When speeded up, 0.2 seconds is treated as an hour
  // to achieve that, I divide millis() by 1000 to get the elpasing seconds and then multiply by the hour speed. I used modulo operator here is because I want to make sure the hours are restricted between 0 and 23, which is exactly what I want for a 24 hour day | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
  let currentHour = (initialHour + (millis() / 1000 * hourSpeed)) % 24;
  // I assigned cosine function of current hour to alpha, so the color lerping won't be cut off at each end point for example 0 and 23. with property for consine, the color with shift in a ping pong effect for a smooth ease-in-out effect instead of a hard cut off returning from 23 to 0. Now it will go from 0 to 23 and then 23 to 0
  let alpha = cos(currentHour); // https://p5js.org/reference/p5/cos/
  noStroke();
  fill(lerp(100, 222, alpha), lerp(70, 196, alpha), lerp(50, 160, alpha)); // the pith color will lerp within the brown color scheme based on time | https://p5js.org/reference/p5/lerp/
  ellipse(0, 0, pithRadius * 2, pithRadius * 2);

  // this small section is for setting the number of days based on different months. Because some months have different number of days than others so I need to check what month is it currently in calendar and set the number of days manually to ensure accuracy
  // month 1, 3, 5, 7, 8, 10, 12 has 31 days
  // month 2 has 28 days
  // the rest of months has 30 days
  if (initialMonth == 1 || initialMonth == 3 || initialMonth == 5 || initialMonth == 7 || initialMonth == 8 || initialMonth == 10 || initialMonth == 12) {
    daysPerMonth = 31;
  } else if (initialMonth == 2) {
    daysPerMonth = 28;
  } else {
    daysPerMonth = 30;
  }
  // becuase each completed ring represents full number of days in a month, the ring arc span can indicate which day of a month we are currently in. If it is 15th of a month, the arc span will be from 0 to PI
  let initialMonthProgress = initialDay / daysPerMonth;


  // Below I used multiple for loops to display the rings that have been drawn and the rings that are actively being drawn to the canvas through change of arc span
  // I created this for first for loop to draw initial rings based on calendar month and day. These are meant to be static rings since they represent the time that has already past in a year
  // as you can see here, m starts from 0 and stops at the calendar month, meaning that it will display up tp (initial month) number of rings on the canvas
  // the only thing that is worth noticing here is that the current month may not be a full ring because it is based on the initial month progress that is caldendar day divided by total number of days in a month
  // also here I retrieved the boolean value that determines if each ring being display on canvas is year ring or not. Year ring would be every 12th growth ring
  // this isYearRing boolean list is pre-stored during setup() through arrangeRingLayout(). Now I can just pass on the current month to its parameter to decide the year ring
  // if it is not a year ring, it will have a thin stroke width and vice versa
  // I also used my customized function mapColor() here to make each ring lerp from light wood color to dark wood color. So I just need to pass on the current month for it to decide which color it should use
  for (let m = 0; m <= initialMonth; m++){

    mapColor(m);
  
    if (isYearRing[m]) {
      strokeWeight(thickStrokeWidth); 
    } else {
      strokeWeight(thinStrokeWidth); 
    }
     
    if (m == initialMonth) {
      arc(0, 0, ringRadiusContainer[m] * 2, ringRadiusContainer[m] * 2, 0, initialMonthProgress * TWO_PI);
    } else {
      arc(0, 0, ringRadiusContainer[m] * 2, ringRadiusContainer[m] * 2, 0, TWO_PI); 
    }
  }

  // this section is for drawing the remaining part of the arc span that is not completed in the initial calendar setup
  // this is basically the animation of arc spanning itself until it is fully closed but for the incompleted ring, not for the rest of the rings to be drawn
  // this is why I did not use for loop for this one
  let frameSeconds = deltaTime / 1000; // because draw() operates based on frame per second, there is consistency for the animation drawing speed if I just rely on draw() to update my current angle offset eveyr frame
  let speeds;
  if (mouseIsPressed) {
    speeds = 25;
  } else {
    speeds = 2.5;
  }
  currentAngleOffset += speeds * frameSeconds;
  console.log(deltaTime);

  let secondsProgressPerMinuteOffset = initialMonthProgress * TWO_PI + currentAngleOffset;
  if (secondsProgressPerMinuteOffset <= TWO_PI) {
    arc(0, 0, ringRadiusContainer[initialMonth] * 2, ringRadiusContainer[initialMonth] * 2, initialMonthProgress * TWO_PI, secondsProgressPerMinuteOffset); 
  } else {
    canLoop = true;
  }
    
  if (canLoop){
    for (let i = initialMonth; i < currentRing; i++) {
      mapColor(i % (monthsPerYear));
      if (isYearRing[i]) {
        strokeWeight(thickStrokeWidth); 
        arc(0, 0, ringRadiusContainer[i] * 2, ringRadiusContainer[i] * 2, 0, TWO_PI);
      } else {
        strokeWeight(thinStrokeWidth); 
        arc(0, 0, ringRadiusContainer[i] * 2, ringRadiusContainer[i] * 2, 0, TWO_PI);
      }
    }  

    currentAngle += speeds * frameSeconds;
      
    if (currentRing < ringRadiusContainer.length) {
      mapColor(currentRing % (monthsPerYear));
      if (isYearRing[currentRing]) {
        strokeWeight(thickStrokeWidth); 
        arc(0, 0, ringRadiusContainer[currentRing] * 2, ringRadiusContainer[currentRing] * 2, 0, currentAngle);
      } else {
        strokeWeight(thinStrokeWidth); 
        arc(0, 0, ringRadiusContainer[currentRing] * 2, ringRadiusContainer[currentRing] * 2, 0, currentAngle);
      }
    } else {
      displayRectangleBarks();
      currentRing = month() + 1;
      currentAngleOffset = 0;
      canLoop = false;
    }

    if (currentAngle >= TWO_PI) {
      currentAngle = 0;
      currentRing++;
      console.log(currentRing);
    }
  }
  if (!doOnce) {
    displayRectangleBarks();
  }
}

function arrangeRingLayout() {

  for (let y = 0; y < years; y++) {
    let yearStartRadius = pithRadius + y * yearRingGap + monthsPerYear * y * monthRingGap;

    for (let m = 0; m < monthsPerYear; m++) {
      let ringRadius = yearStartRadius + m * monthRingGap;
      ringRadiusContainer.push(ringRadius);
      isYearRing.push(m === monthsPerYear - 1); 
    }
  }
}

function mapColor(currentMonth) {
  alpha = currentMonth / (monthsPerYear - 1); 
  ringColor = lerpColor(lightWood, darkWood, alpha);
  stroke(ringColor);
  noFill();
}

function displayRectangleBarks() {
  // -- tree rectangular barks 
  // this section creates all the rectangular barks on the edge of the entire tree. I will be using for loop and random() to generate natural patterns for it
  rectMode(CORNER); // Set the rectangle mode to corner because I want rectangles to follow along the circular edge with one of their sides touching it. I want side on side so corner mode is the best option. Corner mode allows the rectangle to pivot around its top left corner | https://p5js.org/reference/p5/rectMode/
  // set up fill color and stroke color and weight
  stroke(barkStroke);
  strokeWeight(1.4);
  fill(barkFill);

  // I want an organic pattern of rectangular barks that won't look chaotic. Also, I dont want to draw them out one by one using rect(), so I decided to use for loop because for loop is good at handling repeating tasks.
  // in this for loop, I loop through all 64 rectangular barks and slightly offset each of them to create this result, where all 64 rectangles circle around the tree bark
  for (j = 0; j < barkRectCount; j++) {
    // to create this circular placement of rectangles, I used the rotation offset for each rectangle. Because there are 64 of them, each of them will take 1/64 of the 2PI for placement, so that they can evenly space out
    let rotationOffset = (j / barkRectCount) * 2 * PI;
    // now the rectangles are perfectly evenly spaced out around the tree bark, but it is not organic. So I decided to add some randomness to their width and height
    let randomDepth = random(25, 50); // set a random number between 25 and 50 for rectangle height (depth) | https://p5js.org/reference/p5/random/
    let randomWidth = random(30, 60); // set a random number between 30 and 60 for rectangle width. Now they look pretty organic and real

    // add rotation to each rectangle separately
    push();
    // apply rotation for each rectangle
    rotate(rotationOffset)
    // draw rectangle with x being at the tree bark, y at 0 (stay at the edge), random width between 30 and 60, and random height between 25 and 50
    // because there is already a translation of centerX and centerY so we don't need any translation here
    rect(outerRadius, 0, randomWidth, randomDepth);
    pop();       
    doOnce = true;
  }
}

function mousePressed() {
  mouseIsPressed = true;
}

function mouseReleased() {
  mouseIsPressed = false;
}
