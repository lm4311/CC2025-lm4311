// I wanted to create Halloween theme patterns for this assignment. The first one I chose to do is the bats swirling around the center, which is the moon and its subtle glow

let luke1Time = 0; // initialize the accumulative time to 0
let luke1BatCount = 9; // initialize the total number of bats

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  // setting up the background and bat flying trails
  background(0, 0, 0, 35);

  // move all objects to the center
  translate(width/2, height/2);

  // moon
  fill(240, 230, 180);
  ellipse(0, 0, 200, 200);

  // outer ring glow
  fill('rgba(240, 230, 180, 0.2)');
  // I used the noise() function over here to create random patterns without causing flickers. It gives a buttersmooth feel of subtle glowing.
  // I used the map() function to restrict the radius of the glow of the moon
  ellipse(0, 0, map(noise(luke1Time), 0, 1, 250, 300), map(noise(luke1Time), 0, 1, 250, 300));

  // I used the for loop over here to mainly generate multiple copies of bats with different angles of self-rotation as well as the rotation around the moon center
  for (let i = 0; i < luke1BatCount; i++) {
    // I created this angle variable to store variations of angles of bat spinning itself based on 'i' and the customized time 'luke1Time'
    let luke1Angle = luke1Time * (0.8 + i * 0.03) + i;
    // this variable sets different radius for each bat rotating around the center
    let luke1Radius = 60 + i * 12;
    // these two variables set up the polar coordinate for the bats' positions so that it simulates the bats swirling around the moon effect
    let luke1X = cos(luke1Angle) * luke1Radius;
    let luke1Y = sin(luke1Angle) * luke1Radius * 0.7;

    // separate transformations of each bat
    push();
    // rotate the bats around the moon
    translate(luke1X, luke1Y);
    // rotate around itself (self-spinning) based on the time and 'i'
    // I used sin() function here to make each bat self-spinning feel more smooth and organic, and I feed millis() to sin function to animate the bats
    rotate(luke1Angle + sin(millis() / 2000) * 0.2);

    // draw the bat body using a circle shape
    fill(30, 30, 35);
    ellipse(0, 0, 12, 8);
    // draw the bat wings using two triangle shapes with each one on each side
    triangle(-6, 0, -20, -5, -12, 2);
    triangle(6, 0, 20, -5, 12, 2);
    pop();
  }

  // accumulate the time value over time inside draw(), which updates every frame
  luke1Time += 0.02;
}
