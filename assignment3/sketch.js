// I chose to do a tree ring digital clock because it represents the passage of time through the increase of growth rings
// I think this is a great idea because it captures the idea of time but also has a lot of room for me to use my imagination
// Even though the tree ring digital clock does not show the exact time, it reveals the passage of time in years, months, days, and hours
// The growth rings here do not exactly follow natural rules as it will be a little abstract and creative. 
// Each thin ring represents one month and each thicker year ring represents one year, meaning that each year will consist of 12 rings (1 thick ring and 11 thin rings)
// Each thin ring will be animated through setting the end point of arc dynamically responding to day passing.
// Background color will also be changing dynamically based on the day-night cycle. 
// Users can click and hold the mouse button to speed up the time to see the passage of time more clearly.
// These animated and interactive features will be implemented in the next week's assignment as it directly contributes to the clock function.
// This week I purely focused on the aesthetics and appearance of the abstract digital clock
// There are four year rings for this tree ring digital clock, meaning that a full animated cycle of time passage will be four years.
// After each full cycle, the tree will change its shape by randomizing the width and height of itsrectangular barks and default tree rings back to 0 becuase it now becomes a new tree
// This feature will also be implemented next week as it relates to the clock function
// I declared several variables below to store values globally for easy access later on  

let years = 4; // set the tree max years to 4 years old - 4 year rings
let monthsPerYear = 12; // set the number of months in one year

let thinStrokeWidth = 1.4; // set the stroke width value for thin tree ring for easy adjustment later on
let thickStrokeWidth = 3.0; // set the stroke width value for thick tree ring for easy adjustment later on

let monthRingGap = 7;   // set the gap reserved for each thin ring 
let yearRingGap = 3;   // set the gap reserved for each thick ring
let pithRadius = 18;  // set the radius value for the centered pith for easy access and adjustment

let centerX; // initialize the center point x-coordinate of the tree ring clock - will be used later for overall translate
let centerY; // initialize the center point y-coordinate of the tree ring clock - will be used later for overall translate

// I found that it was pretty tedious to find the outer radius of this digital clock each time I needed it, so I set this variable for quick access to the outer radius of this clock
// outer radius consists of the pith radius, 47 thin ring gap, and 3 year ring gap
let outerRadius = pithRadius + (years * monthsPerYear - 1) * monthRingGap + (years - 1) * yearRingGap;

let barkRectCount = 64; // set the number of rectangular bark pieces for easy adjustment

function setup() {
  createCanvas(840, 840);
  angleMode(RADIANS);
  noLoop(); // I dont want redraw occuring every frame at least for now
  centerX = width / 2; // center the x-coordinate
  centerY = height / 2; // center the y-coordiante so all the shapes stay in middle
  background("rgba(38, 132, 58, 1)"); // set the background color to green fow now to represent grass, will be changing next week for dynamic response to time
}

function draw() {
  
  // set all the colors needed for the tree ring digital clock
  // color palette
  let lightWood = color(210, 176, 135);
  let darkWood = color(120, 85, 60);
  let pithColor = color(184, 150, 116);
  let barkFill = color(76, 58, 46);
  let barkStroke = color(45, 35, 28);

  // translate the origin for all shapes below to the screen center. It is super convenient as I will be handling lots of circles and rectangles
  translate(centerX, centerY);

  // this small section is for creating the tree ring base with a deep brown color
  // all ellipses from now will be using 0,0 origin for consistency
  fill(barkStroke);
  ellipse(0, 0, outerRadius * 2, outerRadius * 2);

  // this small section is for creating the tree pith, which is the small filled circle in the center
  noStroke();
  fill(pithColor);
  ellipse(0, 0, pithRadius * 2, pithRadius * 2);

  // this section is the core part as it draws all the tree rings by using only two for loops.
  // the first for loop is to keep track of the year ring, making my life easier for managing these many rings even though I could do these in one for loop, but I chose not to becuase it can get quite overwhelming when the number of rings increase and hard to debug
  for (let y = 0; y < years; y++) {
  
    // I created this variable becuase I wanted to store and update the year ring radius every time the year increases by 1. Think of it as levels in game, when you reach to a new level, everything you will be getting is based on that level and keep getting accumulated from there
    // so this variable consists of the pith radius, y number of year ring gap, and 12y number of month ring gap
    let yearStartRadius = pithRadius + y * yearRingGap + monthsPerYear * y * monthRingGap;

    // the second for loop as expected will be responsible for the 12 month ring tracking each year (11 thin rings + 1 thick ring)
    // all tree rings will be drawn inside this for loop
    for (let m = 0; m < monthsPerYear; m++){

      // here I set multiple variables to use the m variable from foor loop to gradually adjust the tree rings based on the number of months
      let alpha = m / (monthsPerYear - 1); // I created this alpha variable to be used in lerpColor() function as it holds the progress for lerping from a to b. Because there are m is between 0 and 11 inclusively, so to ensure the alpha stays between 0 and 1, the max value for denominator should be 11, which is monthsPerYear - 1
      let ringColor = lerpColor(lightWood, darkWood, alpha); // Here I set a variable to receive the value for lerpColor(). It will lerp from lightwood gradually to darkwood color for each one year cycle. The reason why I do this is because each year ring will grow from shallow to dark due to seasonal factor. During Spring and Summer, the tree grows fast, and druing Autumn and Winter, the tree grows slowly resulting in a darker color
      let ringRadius = yearStartRadius + m * monthRingGap; // I created this variable to store the final value for each month rings. The final radius for each ring consists of a current year ring radius and m number of month ring gap

      // get ready for drawing rings
      // first need to disable fill and enable stroke and set the stroke color to ringColor preset
      noFill();
      stroke(ringColor);
      // I chose to use an if statement here is because I wanted to find the thick ring within a one year cycle, which is the last ring. It is super easy to find by just isolating the first 11 thin rings and the last ring
      // Because m starts at 0, so it requires a minus 1 for monthsPerYear, so we will be having 0 - 10 (first 11 months) and 11 (last month)
      if (m < monthsPerYear - 1) {
        strokeWeight(thinStrokeWidth); // apply think stroke width to the first 11 thin rings
      } else {
        strokeWeight(thickStrokeWidth); // apply thick stroke width to the last ring of eahc one year cycle
      }
      // draw each ring using arc() function by setting the span to 2PI which is 360 degree
      // I chose to use arc instead of ellipse is because I need arc to dynamically adjust the start and end point of each arc span to show time passage
      // this feature will be implemented in next week
      arc(0, 0, ringRadius * 2, ringRadius * 2, 0, 2 * PI); 
    }
  }

  // -- tree rectangular barks 
  // this section creates all the rectangular barks on the edge of the entire tree. I will be using for loop and random() to generate natural patterns for it
  rectMode(CORNER); // Set the rectangle mode to corner because I want rectangles to follow along the circular edge with one of their sides touching it. I want side on side so corner mode is the best option. Corner mode allows the rectangle to pivot around its top left corner | https://p5js.org/reference/p5/rectMode/
  // set up fill color and stroke color and weight
  stroke(barkStroke);
  strokeWeight(1.4);
  fill(barkFill);

  // I want an organic pattern of rectangular barks that won't look chaotic. Also, I dont want to draw them out one by one using rect(), so I decided to use for loop because for loop is good at handling repeating tasks.
  // in this for loop, i loop through all 64 rectangular barks and slightly offset each of them to create this result, where all 64 rectangles circle around the tree bark
  for (i = 0; i < barkRectCount; i++) {
    // to create this circular placement of rectangles, I used the rotation offset for each rectangle. Because there are 64 of them, each of them will take 1/64 of the 2PI for placement, so that they can evenly space out
    let rotationOffset = (i / barkRectCount) * 2 * PI;
    // now the rectangles are perfectly evenly spaced out around the tree bark, but it is not organic. So I decided to add some randomness to their width and height
    let randomDepth = random(25, 50); // set a random number between 25 and 50 for rectangle height (depth)
    let randomWidth = random(30, 60); // set a random number between 30 and 60 for rectangle width. Now they look pretty organic and real

    // add rotation to each rectangle separately
    push();
    // apply rotation for each rectangle
    rotate(rotationOffset)
    // draw rectangle with x being at the tree bark, y at 0 (stay at the edge), random width between 30 and 60, and random height between 25 and 50
    // because there is already a translation of centerX and centerY so we don't need any translation here
    rect(outerRadius, 0, randomWidth, randomDepth);
    pop();
    // the result looks nice
    // waiting to add animations and interactions next week
  }
}