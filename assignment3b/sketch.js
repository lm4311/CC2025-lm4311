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
let ringRadiusContainer = []; // declare array to be used for containing all radius data for 48 rings | https://idmp5.github.io/coding/arrays/
let isYearRing = []; // declare array to to store boolean values for keeping track of year ring (every 12th ring)
let currentAngle = 0; // declare to be used for accumulating arc span length that sums to two PI
let currentAngleStart = 0; // declare to be used for accumulating arc span length for the first imcompleted ring
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
  // for each ring's radius I just extract the corresponding ring radius from the pre-computed array by passing on the "m" month variable to the array parameter
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
  // because draw() operates based on frame per second, there is inconsistency for the animation drawing speed if I just rely on draw() to update my current angle offset every frame
  // to compensate that inconsistency due to frame rate, I chose to use this built-in variable called deltaTime and divide it by 1000 to get seconds since last frame | https://p5js.org/reference/p5/deltaTime/
  // so now if the frame rate fluctuates, the faster frame rate will yield a lower seconds per frame that reduces the spanning distance for that particular second, and vice versa
  // now no matter what the frame rate is for each PC, it will take the same time for a ring to span from 0 to 2PI
  let frameSeconds = deltaTime / 1000; 
  let speeds;
  if (mouseIsPressed) {
    speeds = 25;
  } else {
    speeds = 2.5;
  }
  currentAngleStart += speeds * frameSeconds; // this variable keeps increasing by (speeds * frameSeconds) each frame for the ring to animate itself
  // here I try to animate the arc ring starting from the point where the incompleted ring is left off, and then start animating the ring from there until it fully closed at 2PI. This is what currentAngleOffset is used for
  // when the animated arc ring is fully closed, I then allow the rest of the drawing logics to perform, just by setting the gate boolean canLoop back to true
  // if I don't do that, the current animated arc will be covered by a full ring that is pre-loaded on canvas by the for loop below, and the next animated ring drawn by for loop below will not begin at 0, since the currentAngle keeps accumulating itself while waiting for the previous animated arc ring to finish
  let currentAngleOffset = initialMonthProgress * TWO_PI + currentAngleStart;
  if (currentAngleOffset <= TWO_PI) {
    arc(0, 0, ringRadiusContainer[initialMonth] * 2, ringRadiusContainer[initialMonth] * 2, initialMonthProgress * TWO_PI, currentAngleOffset); // I want the ring radius value for the inital month ring so I simply extract that value from the pre-computed ring radius container, all the radius are pre-assigned in the monthly order
  } else {
    canLoop = true;
  }
    
  // the rest of the for loops are wrapped inside this if statement for gating purposes
  if (canLoop){
    // I created this for loop to print all fully completed rings that have already been drawn out through the animation on the canvas, except for the rings that are already on the canvas that is based on the calendar time
    // that's why this for loop starts at initial month, and always stop at the ring that is previously drawn
    // whenever the actively drawing ring finishes its animation, the currentRing will be incremented by one, so it keeps printing the ones that have already been drawn on the canvas
    // without this for loop, the rings will not stay on the canvas since they will disappear as soon as it finishes its animation
    for (let i = initialMonth; i < currentRing; i++) {
      // similar to the mapColor() I used in the for loop at the start, this assigns a color to each ring that stays on canvas, and this should be matching with the currently drawing arc rings executed in the later for loop
      // I also used a modulo operator here so that there will never be a value larger than 11 getting passed onto mapColor() function because the alpha should not be higher than 1 and should return to 0 after each year cycle
      mapColor(i % (monthsPerYear));
      // same logic here for checking year ring and extracting ring radius
      if (isYearRing[i]) {
        strokeWeight(thickStrokeWidth); 
        arc(0, 0, ringRadiusContainer[i] * 2, ringRadiusContainer[i] * 2, 0, TWO_PI); // a completed ring spans across 0 and 2PI
      } else {
        strokeWeight(thinStrokeWidth); 
        arc(0, 0, ringRadiusContainer[i] * 2, ringRadiusContainer[i] * 2, 0, TWO_PI);
      }
    }  

    // this has the same logic as the currentAngleStart except this is the animation controller specifically for the rings generated after the initial setup
    // I chose to do two different controller variable is because I don't want the ring animations generated after the initial setup mess up with animation from the inital setup rings, due to the conditional statement limitation inside draw()
    currentAngle += speeds * frameSeconds;
    
    // this section is for drawing tree rings over and over again until it hits the maximum count, which is the length of the ring radius container array. So basically this part is for animating the rings after the initial setup part
    if (currentRing < ringRadiusContainer.length) {
      // mapColor logic is still the same by using the modulo operator
      mapColor(currentRing % (monthsPerYear));
      // same logic applies to how year ring is detected and drawn on the canvas with a thicker stroke
      if (isYearRing[currentRing]) {
        strokeWeight(thickStrokeWidth); 
        // same logic for extracting ring radius based on the current executing animated ring
        // same logic for animation driver variable currentAngle
        arc(0, 0, ringRadiusContainer[currentRing] * 2, ringRadiusContainer[currentRing] * 2, 0, currentAngle);
      } else {
        strokeWeight(thinStrokeWidth); 
        arc(0, 0, ringRadiusContainer[currentRing] * 2, ringRadiusContainer[currentRing] * 2, 0, currentAngle);
      }
    } else {
      // here I want some defaulting logic once the amount of rings hits the maximum
      // also I want to add an additional overlay of rectangle barks to the current layer to simulate the growth of tree from the outer appearance. This can also show the passage of time
      // the default time will always be the lastest updated month and day because the initial setup rings are anchored to the calendar time. month() and day() updates every frame in draw()
      displayRectangleBarks();
      currentRing = month() + 1; // set the current ring back to its default
      currentAngleStart = 0; // set the animation controller for the initial setup rings to 0
      canLoop = false; // set the gating boolean back to false. This is very important as I want the later ring drawing executions wait until the rings in the initial setup finish theirs first
    }

    // this section is for keeping track of the arc drawing animation to ensure once it hits the full span, the current angle will reset to 0, starting from the beginning for the next drawing animation for rings
    if (currentAngle >= TWO_PI) {
      currentAngle = 0; // reset the span end point to zero
      currentRing++; // draw for the next ring
    }
  }
  // I want to initialize the rectangle barks at the start so it will appear on the canvas, but the problem is it will keep adding layers and layers of randomized rectangle barks due to infinite calls from draw()
  // so I decided to use a gate boolean to just make it execute once at the start
  // Once it is executed once, the gate boolean will be set to true so it won't execute ever again
  if (!doOnce) {
    displayRectangleBarks();
    doOnce = true;
  }
}

// I decided to customize a function for arranging all ring radius into one array and the year ring checker in another array
// I arranged them all in monthly order so it won't give me headache if anything goes wrong and I need to trace back to the problem
// Now all the data for ring radius and year ring are in one place, which made my life way easier. It drove me crazy before trying to debug which ring radius goes wrong
function arrangeRingLayout() {

  // the core idea of using two for loops to calculate radius for each ring and check for year ring did not change from the last week's in progress assignment
  // Since I need to animate the rings one by one, it it much better to do it this way 
  // the first for loop is to keep track of the year ring, making my life easier for managing these many rings even though I could do these in one for loop, but I chose not to becuase it can get quite overwhelming when the number of rings increase and hard to debug
  for (let y = 0; y < years; y++) {
    // I created this variable becuase I wanted to store and update the year ring radius every time the year increases by 1. Think of it as levels in game, when you reach to a new level, everything you will be getting is based on that level and keep getting accumulated from there
    // so this variable consists of the pith radius, y number of year ring gap, and 12y number of month ring gap
    let yearStartRadius = pithRadius + y * yearRingGap + monthsPerYear * y * monthRingGap;
    // the second for loop as expected will be responsible for the 12 month ring tracking each year (11 thin rings + 1 thick ring)
    for (let m = 0; m < monthsPerYear; m++) {
      let ringRadius = yearStartRadius + m * monthRingGap; // I created this variable to store the final value for each month rings. The final radius for each ring consists of a current year ring radius and m number of month ring gap
      ringRadiusContainer.push(ringRadius); // adds the corresponding ring radius to the container | https://idmp5.github.io/coding/arrays/
      isYearRing.push(m === monthsPerYear - 1); // returns a boolean value to the array for year ring. It will only returns true when the current month is the last month of each full year cycle
    }
  }
}
// same reason for creating this customized function as above. It is much easier to debug and reuse when multiple similar logics are in the same place
// this function is responsible for assigning colors to the tree ring
// tree rings will have different colors within each full year cycle, from the light wood to dark wood
// this function takes in current month as the parameter and uses the current month to get divided by 11 because the month tracking begins at 0 and ends at 11
function mapColor(currentMonth) {
  alpha = currentMonth / (monthsPerYear - 1); 
  // once we have the alpha which controls the interpolation of color, the ring color will get deeper each time when going to the next ring since alpha is increasing
  ringColor = lerpColor(lightWood, darkWood, alpha); // https://p5js.org/reference/p5/lerpColor/
  stroke(ringColor);
  noFill();
}

// I created this customized function for the same reason for reusability as it contains a bunch of code that is just for adding random rectangle barks to the canvas
// exact same logic from my last week's in-progress assingment
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
    let rotationOffset = (j / barkRectCount) * TWO_PI;
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
  }
}

// I decided to implement mousePressed function is because I want the users to be able to interact with the canvas and accelerate time elapse just by holding down the left mouse button
// I created the mouseIsPressed variable to notify canvas whether the user is holding their left mouse button. Basically this variable will act as a gating boolean and be used with if statement during executions
// https://p5js.org/reference/p5/mousePressed/
function mousePressed() {
  mouseIsPressed = true;
}

// same reasons for implementing mouseReleased function. Since I have users pressing down their mouse button, I also want to know when the users release it, in order to stop accelerating the time and return to normal speed
// when users release their mouse button, this gating boolean will return to false and notifies the if statement to stop the acceleration
// https://p5js.org/reference/p5/mouseReleased/
function mouseReleased() {
  mouseIsPressed = false;
}