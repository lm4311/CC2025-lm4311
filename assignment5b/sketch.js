// I created this ghosts marching effect for in a horizontal pattern
let luke2GhostCount = 6;
let luke2GhostX = []; // container for the ghost x coordinate
let luke2GhostY = []; // container for the ghost y coordinate
let luke2GhostSpeed = []; // container for the ghost speed

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100); // I will be using HSB to create this spooky color for the ghosts
  // I used this for loop to assign each ghost array variables a random number within a specific range
  for (let i = 0; i < luke2GhostCount; i++) {
    // here I assign the x coordinate a random number between -200 and 400 so there will be less blank areas when the ghosts are marching
    luke2GhostX[i] = random(-200, 400);
    // same thing but for the y coordinate with any number between 0 and 200
    luke2GhostY[i] = random(200);
    // same thing for the speed between 0.6 and 1.2
    luke2GhostSpeed[i] = random(0.6, 1.2);
  }
  noStroke();
}

function draw() {
  background(0, 0, 0);

  // I used this for loop to assign each ghost a position Y with random noise using map() to restrain the numbers between 120 and 300. This way they wont bounce out
  for (let j = 0; j < luke2GhostCount; j++) {
    let luke2PosY = map(noise(luke2GhostY[j] + millis() / 2000), 0, 1, 120, 300);
    let luke2PosX = luke2GhostX[j];

    // here I draw their bodies using an ellipse and a rectangle
    fill(0, 0, 100, 70);
    ellipse(luke2PosX, luke2PosY, 60, 70);
    rect(luke2PosX - 30, luke2PosY, 60, 26, 10);

    // here is for the eyes and mouths using three ellipses
    fill(0, 0, 20, 90);
    ellipse(luke2PosX - 10, luke2PosY - 5, 6, 8);
    ellipse(luke2PosX + 10, luke2PosY - 5, 6, 8);
    ellipse(luke2PosX, luke2PosY + 10, 10, 6);

    // here I make each ghost x coordinate increase every frame by the speed amount stored in the speed array
    luke2GhostX[j] += luke2GhostSpeed[j];
    // if the x coordinate goes out of the bount then we want that to reset to the start -60. I also initialize the Y and speed for that specific ghost
    if (luke2GhostX[j] > width + 50) {
      luke2GhostX[j] = -60;
      luke2GhostY[j] = random(1000);
      luke2GhostSpeed[j] = random(0.6, 1.2);
    }
  }
}
