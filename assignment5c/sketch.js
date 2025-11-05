// I chose to do a spider that can increase and decrease its web string vertically using noise. I think this is a great idea since the noise function really looks well for lines in a dynamic way
function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background("gray");

  // this section draws the web located on the left top corner and right top corner. I used for loops here to iterate the process especially useful for duplicated lines
  stroke(200, 200, 220, 120);
  for (let i = 0; i < 5; i++) {
    // I drew four lines for each different placement of them
    line(0, 0 + i * 16, 120, 0 + i * 8); // first placement that is for top left corner horizontal lines
    line(0 + i * 16, 0, 0 + i * 8, 120); // for top left corner vertical lines
    line(width, 0 + i * 16, width - 120, 0 + i * 8); // for top right corner horizontal lines
    line(width - i * 16, 0, width - i * 8, 120); // for top right corner vertical lines
  }
  noStroke();


  let luke3TopY = 60; // set up the top most point for the web string
  let luke3LengthMin = 100; // this will be the minimum length of the web used for noise()
  let luke3LengthMax = 220; // this will be the maximum length of the web used for noise()
  // here I mapped the noise() to have values between 100 and 220, and it is changing based on millis() updates
  let luke3CurrentLength = map(noise(millis() / 2000), 0, 1, luke3LengthMin, luke3LengthMax);
  // make a dynamic variable that receives dynamic changes from 'luke3CurrentLength'
  let luke3TargetY = luke3TopY + luke3CurrentLength;

  // move spider and spider string to the middle
  translate(width / 2, 0);

  // draw the spider web string using the TopY and the Target Y to make it animated
  stroke(220, 220, 230);
  line(0, luke3TopY, 0, luke3TargetY);
  noStroke();

  // draw the spider body using two stacked ellipses
  fill(30);
  ellipse(0, luke3TargetY, 28, 22); // need to set the y value to target Y so it is moving along with the string
  ellipse(0, luke3TargetY - 10, 18, 14); // need to set the y value to target Y so it is moving along with the string

  // draw the spider legs using four lines with two lines on each side
  // same logic applies here for the y coordinate to set it to target Y so they move along with the web string
  stroke(30);
  line(-18, luke3TargetY - 2, -30, luke3TargetY - 8);
  line(-18, luke3TargetY + 2, -30, luke3TargetY + 8);
  line(18, luke3TargetY - 2, 30, luke3TargetY - 8);
  line(18, luke3TargetY + 2, 30, luke3TargetY + 8);
  noStroke();

  // draw the eyes with two ellipses and set the y to the target y to move along the string
  fill(255, 60, 60);
  ellipse(-5, luke3TargetY - 12, 4, 4);
  ellipse(5, luke3TargetY - 12, 4, 4);
}