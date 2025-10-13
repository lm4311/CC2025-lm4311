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
let daysPerMonth;

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

let RingColorContainer;
let RingRadiusContainer;
let mContainer;
let tempContainer = 0;
let canReset = true;
let conditionalThreshold = 0;
let currentMonthRing;
let currentYearRing;
let ringRadii = [];

function setup() {
  createCanvas(840, 840);
  angleMode(RADIANS); // I'm more comfortable using radians when working with circles, and there will be a lot involving angles, so I decided to change the angle mode to radians. | https://p5js.org/reference/p5/angleMode/
  centerX = width / 2; // center the x-coordinate
  centerY = height / 2; // center the y-coordiante so all the shapes stay in middle
  background("rgba(38, 132, 58, 1)"); // set the background color to green fow now to represent grass, will be changing next week for dynamic response to time
  currentMonthRing = month() - 3;
  currentYearRing = 1;
}

function draw() {

  text(`${currentMonthRing}`, 10, 30);
  
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

  let initialMonth = month() - 5;
  let initialDay = day();

  if (initialMonth == 1 || initialMonth == 3 || initialMonth == 5 || initialMonth == 7 || initialMonth == 8 || initialMonth == 10 || initialMonth == 12) {
    daysPerMonth = 31;
  } else if (initialMonth == 2) {
    daysPerMonth = 28;
  } else {
    daysPerMonth = 30;
  }

  let initialMonthProgress = initialDay / daysPerMonth;

  // this section is the core part as it draws all the tree rings by using only two for loops.
  // the first for loop is to keep track of the year ring, making my life easier for managing these many rings even though I could do these in one for loop, but I chose not to becuase it can get quite overwhelming when the number of rings increase and hard to debug
  for (let y = 0; y < 1; y++) {
  
    // I created this variable becuase I wanted to store and update the year ring radius every time the year increases by 1. Think of it as levels in game, when you reach to a new level, everything you will be getting is based on that level and keep getting accumulated from there
    // so this variable consists of the pith radius, y number of year ring gap, and 12y number of month ring gap
    let yearStartRadius = pithRadius + y * yearRingGap + monthsPerYear * y * monthRingGap;

    // the second for loop as expected will be responsible for the 12 month ring tracking each year (11 thin rings + 1 thick ring)
    // all tree rings will be drawn inside this for loop
    for (let m = 0; m <= initialMonth; m++){

      // here I set multiple variables to use the m variable from foor loop to gradually adjust the tree rings based on the number of months
      let alpha = m / (monthsPerYear - 1); // I created this alpha variable to be used in lerpColor() function as it holds the progress for lerping from a to b. Because there are m is between 0 and 11 inclusively, so to ensure the alpha stays between 0 and 1, the max value for denominator should be 11, which is monthsPerYear - 1
      let ringColor = lerpColor(lightWood, darkWood, alpha); // Here I set a variable to receive the value for lerpColor(). It will lerp from lightwood gradually to darkwood color for each one year cycle. The reason why I do this is because each year ring will grow from shallow to dark due to seasonal factor. During Spring and Summer, the tree grows fast, and druing Autumn and Winter, the tree grows slowly resulting in a darker color | https://p5js.org/reference/p5/lerpColor/
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
      if (m == initialMonth) {
        arc(0, 0, ringRadius * 2, ringRadius * 2, 0, initialMonthProgress * TWO_PI);
        RingColorContainer = ringColor;
        RingRadiusContainer = ringRadius;
        mContainer = m;
      } else {
        arc(0, 0, ringRadius * 2, ringRadius * 2, 0, TWO_PI); 
      }
    }
  }

  let secondsProgressPerMinute = millis() % 10000 / 10000;
  let secondsProgressPerMinuteOffset = (initialMonthProgress + secondsProgressPerMinute) * TWO_PI;
  stroke(RingColorContainer);
  if (secondsProgressPerMinuteOffset <= TWO_PI - conditionalThreshold) {
    arc(0, 0, RingRadiusContainer * 2, RingRadiusContainer * 2, initialMonthProgress * TWO_PI, secondsProgressPerMinuteOffset); 
  } else {
    arc(0, 0, RingRadiusContainer * 2, RingRadiusContainer * 2, initialMonthProgress * TWO_PI, TWO_PI);
    if (canReset == true){
      tempContainer = secondsProgressPerMinute;
      canReset = false;
    }
    conditionalThreshold = TWO_PI;
    secondsProgressPerMinute = secondsProgressPerMinute - tempContainer;

    for (let y = 0; y < currentYearRing; y++) {
  
      // I created this variable becuase I wanted to store and update the year ring radius every time the year increases by 1. Think of it as levels in game, when you reach to a new level, everything you will be getting is based on that level and keep getting accumulated from there
      // so this variable consists of the pith radius, y number of year ring gap, and 12y number of month ring gap
      let yearStartRadius = pithRadius + y * yearRingGap + monthsPerYear * y * monthRingGap;

      // the second for loop as expected will be responsible for the 12 month ring tracking each year (11 thin rings + 1 thick ring)
      // all tree rings will be drawn inside this for loop
      for (let m = mContainer; m < (ringRadii.length + initialMonth + 2); m++){

        // here I set multiple variables to use the m variable from foor loop to gradually adjust the tree rings based on the number of months
        let alpha = m / (monthsPerYear - 1); // I created this alpha variable to be used in lerpColor() function as it holds the progress for lerping from a to b. Because there are m is between 0 and 11 inclusively, so to ensure the alpha stays between 0 and 1, the max value for denominator should be 11, which is monthsPerYear - 1
        let ringColor = lerpColor(lightWood, darkWood, alpha); // Here I set a variable to receive the value for lerpColor(). It will lerp from lightwood gradually to darkwood color for each one year cycle. The reason why I do this is because each year ring will grow from shallow to dark due to seasonal factor. During Spring and Summer, the tree grows fast, and druing Autumn and Winter, the tree grows slowly resulting in a darker color | https://p5js.org/reference/p5/lerpColor/
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
        arc(0, 0, ringRadius * 2, ringRadius * 2, 0, secondsProgressPerMinute * TWO_PI); 
        if (secondsProgressPerMinute == 0){
          console.log("Next Ring");
          console.log(secondsProgressPerMinute);
          if(canReset){
            ringRadii.push(ringRadius);
            canReset = false;
          }
          
          console.log(ringRadii.length);
        }
      }
    }
  }

  
}