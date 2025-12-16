// I chose to create a car driving experience game where players can use either the keyboard or their finger to control the car movement to collect objects and avoid hazards.
// This game is developed with the concept of renewable energy and recyclable objects. 
// This game aims to raise players’ awareness of the future environment and protect our environment by using renewable energy and recyclable objects.
// This is a typical top-down view car game that has all the basic features of this game genre, including a scoring system, an energy bar, and a bonus system, as well as a simple collision system.
// This game also touches on the random spawning system and uses the parallax effect for simulating car vertical movement.
// I used multiple classes here for different objects, including cars, items, buildings, trees, and the road, so that they are easy to maintain and change for their own properties and data.
// I also created a main menu and game over UI overlay, as well as a basic gameplay info UI on the top left corner for players to easily know their own game progress.
// I also featured hand gestures for the UI system so that players can select menu options with their hand gestures without the need to use the keyboard.
// The finger needs to be approximately aligned with the car’s horizontal position after swapping hands, taking back control from the keyboard, or restarting the game, to ensure the best gameplay experience.
// For example, if the car is currently on the far left side of the road, your finger should align with it by placing your finger on the left side of your computer screen, and vice versa.
// At the start of every new game, place your finger near the middle of the screen for the best experience. It requires a bit of calibration for the finger to work smoothly across different edge cases. 

// global variables
let road; // create a road variable that stores the data from its own class
let car; // create a car variable that stores the data from its own class
let carLength = 130; // this variable is created for storing the length of the car
let items = []; // an array that stores all the item instances from its own class
let buildings = []; // an array that stores all the building instances from its own class
let trees = []; // // an array that stores all the tree instances from its own class
let score = 0; // this variable helps keep tracking of player score based on time
let energy = 100; // this variable keeps track of the energy remaining for the car
let baseScoreRate = 10; // this variable determines the points per second for players
let energyDrainRate = 5; // this variable determines the amount of energy deducted per second
let bonusTimer = 0; // keeps track of how many milli-seconds left for double points
let mainMenu = true; // boolean variable to determine whether it is in main menu
let howToPlay = false; // boolean variable to determine whether it is in the instruction menu
let gameOver = false; // boolean variable to determine whether it is in the game over state
let playOnce = false; // gate boolean used for one-time execution
let handPoseDoOnce = false; // gate boolean used for one-time execution specifically for hand pose finger tracking position
let roadSpeed = 10; // this sets the y-movement speed of the road stripes and blocks. Trees and buildings will also follow this road speed but at half of its speed.
let myBGM; // stores the background music
let mySFX = []; // stores all gameplay sound effects 
let mySFXUI = []; // stores all UI sound effects
let sfxFiles = ['battery-charge.mp3', 'bonus.mp3', 'nitro-boost.mp3', 'car-crash.mp3', 'game-over.mp3']; // stores the path to gameplay SFX files
let sfxFilesUI = ['selection.mp3', 'confirm-selection.mp3', 'game-start.mp3']; // stores the path to UI SFX files
let menuIndex = 0; // this variable determines which menu option the player is currently selecting. 0 represents 'start game' and 1 represents 'How to Play'
let menuItems = ["Start Game", "How to Play"]; // stores all menu option names

// ml5 hand pose input buffer
// this ensures the hand gesture result will only execute once within 1000ms (1 second), in order to avoid infinite flip flop
let lastActionTime = 0; // initialize the last input time to 0
let delay = 1000; // this is the time threshold we want for each hand gesture input (pinch). Currently set to 1000ms (1 second)

// ml5 hand pose
let handPose; // variable to store the model
let video; // variable to store video frames
let hands = []; // array to store hand poses (up to 2)
let startFingerX = 0; // initialize index finger tip X-postion so that it won't return an error later on

// I used the p5.js sound library. They require to load sound in the preload() function
function preload() {
  // load the background music
  myBGM = loadSound('BGM.mp3');
  // load all gameplay sound effects from their corresponding file paths
  for (let i = 0; i < sfxFiles.length; i++) {
    mySFX[i] = loadSound(sfxFiles[i]);
  }
  // load all UI sound effects from their corresponding file paths
  for (let j = 0; j < sfxFilesUI.length; j++) {
    mySFXUI[j] = loadSound(sfxFilesUI[j]);
  }
}

function setup() {
  createCanvas(1400, 900);

  road = new Road(); // create a new road class instance and store it in this variable
  car = new Car(); // create a new car class instance and store it in this variable
  buildings = []; // create an empty array to store all building class instances
  trees = []; // create an empty array to store all tree class instances
  let numBuildings = 16; // set the total number of buildings to be shown and recycled
  let numTrees = 20; // set the total number of trees to be shown and recycled

  // here I used a for loop to iterate through the total number of buildings and add each building instance created by randomBuilding() to the buildings array
  // I decided to call the randomBuilding() instead of creating new ScenaryBuilding instance here is because there are five parameters for the ScenaryBuilding constructor and it will be much more manageable and easier to debug with its own dedicated function for passing values to the parameters
  // randomBuilding() is also reusable at many different places for creating new instances of ScenaryBuilding. This logic applies to ScenaryTree as well.
  for (let i = 0; i < numBuildings; i++) {
    buildings.push(randomBuilding());
  }
  // same logic applies here
  for (let i = 0; i < numTrees; i++) {
    trees.push(randomTree());
  }

  // ml5 hand pose
  // load the handPose model
  handPose = ml5.handPose();
  // create the capture video that uses the webcam for detecting hands
  video = createCapture(VIDEO);
  // set the video size to 640 by 480
  video.size(640, 480);
  // hide the video so that the screen only shows the game but not the capture video
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  
}

// the first thing I do is to create classes for road, car, items, trees, and buildings
// each of the class will contain their own functions and properties for easy access and modifications
// the road class mainly contains road stripes, road blocks, and road itself as a background. 
// there is only one road object as a whole so there is no need to have any parameters inside the constructor, but I still created it as a class so that it is easier to manage road stripes, road blocks, and road itself altogether.
class Road {
  constructor() {
    // set basic dimensions and relative positions for road objects
    // this is important for later placing road objects in relative positions to each other
    // it is easy to modify road properties later if needed
    this.blockWidth = 40; // sets the road block width to 40
    this.width = width * (2 / 3); // set the road width to two thirds of the canvas width
    this.left = (width - this.width) / 2; // set the left-most position of the road
    this.right = this.left + this.width; // set the right-most position of the road
    this.centerX = width / 2; // set the center position of the road

    this.laneWidth = (this.width - this.blockWidth) / 2; // set the lane width of the road. There are two lanes in total separated by the road block in the center

    let leftLaneStart = this.left; // set the left-most position of the left lane
    let rightLaneStart = this.centerX + this.blockWidth / 2; // set the left-most position of the right lane

    this.leftLaneCenter = leftLaneStart + this.laneWidth / 2; // set the center position of the left lane
    this.rightLaneCenter = rightLaneStart + this.laneWidth / 2; // set the center position of the right lane

    // set the X-position for the four vertical lane stripes
    // becuase there are two lane stripes for each lane, there will be three sub-lanes for each lane if spaced equally
    // therefore the first lane stripe will start from the first one thirds of the lane, and the second lane stripe will start from the two thirds of the lane
    // then I store these four X-positions in an array so later I can iterate through them to assign x positions for each lane stripe
    this.laneStripeX = [
      leftLaneStart + this.laneWidth * 0.33,
      leftLaneStart + this.laneWidth * 0.66,
      rightLaneStart + this.laneWidth * 0.33,
      rightLaneStart + this.laneWidth * 0.66
    ];

    // set the basic dimensions for lane stripes and their vertical spacing
    this.stripeSpacing = 180;
    this.stripeHeight = 50;
    this.stripeWidth = 10;
    // create an empty array to store y-coordinate values for each stripe in a column
    this.laneStripeY = [];
    // becuase I only need the lane stripes to be visible within the canvas, I used a for loop here to create as many y values as possibles within the canvas height with respect to the equal spacing between each adjacent stripe
    // the number of y values here is the number of stripes drawn on the canvas for each stripe column
    // each y value is added to the laneStripeY array
    for (let y = -this.stripeSpacing; y < height + this.stripeSpacing; y += this.stripeSpacing) {
      this.laneStripeY.push(y);
    }

    // set the minimum and maximum height for the road block. 
    // if later I need to change the values of them, I can just change it here instead of searching for all other places
    this.blockMinHeight = carLength * 4;
    this.blockMaxHeight = carLength * 6;

    // set the minimum and maximum vertical gap between road blocks
    this.blockMinGap = carLength * 2;
    this.blockMaxGap = carLength * 3;

    // here I want to initialize all the road blocks and let the first road block positioned at y = -height * 2 and the rest of road blocks will be positioned (carLength * 2 to carLength * 3) vertical distance away from one another.
    // the road blocks will keep being placed until the next road block's y position exceed the height of the canvas
    // this means that some of the road blocks are rendered offscreen and some are rendered onscreen
    // this ensures that when one of the road blocks moves out of the canvas from the bottom, it will be placed at the top of the canvas again but offscreen, so that the players won't notice it is being repositioned
    // -height * 2 ensures that there are at least three road blocks being rendered and won't lead to the issue where the road block is being rendered after its Y-position is supposed to be on the screen
    this.blocks = []; // create an empty array to hold all block instances
    let posY = -height * 2; // set the initial Y-position for the first road block

    // here I decided to use a simple while loop instead of a for loop to iterate through all possible road blocks for their object properties is because the posY incrementation is dynamic, meaning that each iteration would have a different blockheight and gap value, which leads to a different incrementation.
    // https://p5js.org/reference/p5/while/
    // each iteration will result in a random number for blockHeight and gap. This makes the for loop not suitable in this case where the incrementation is changing in each iteration.
    // so while the Y-position is smaller than the canvas height (not being offscreen from bottom), it will assign the new values to the current block's object properties, which is the top-most y coordinate of the block and the height of the block
    // I used the object syntax {} here inside array.push() to avoid nested arrays, which can be messy for declaring game objects and their properties when I need to access them later on
    // https://p5js.org/reference/p5/Object/
    while (posY < height) {
      let blockHeight = random(this.blockMinHeight, this.blockMaxHeight);
      this.blocks.push({yTop: posY, height: blockHeight});
      let gap = random(this.blockMinGap, this.blockMaxGap);
      posY += blockHeight + gap;
    }
  }

  // I want to create a function that can return the x-coordinate of either the left lane center or the right lane center based on the "left" or "right" value passed to the 'side' parameter
  // this makes my life more easier to reset the car position at the game start and to avoid spawning items on the road blocks
  getLaneCenter(side) {
    if (side == "left") {
      return this.leftLaneCenter;
    } else {
      return this.rightLaneCenter;
    }
  }

  // update() function will be primarily responsible for updating the vertical position of different road objects simultaneously in the main draw() function
  // the road objects will be moving from top to bottom through every frame update, and if any of the objects exceed the bottom bound of the canvas, they will be sent back to the top and rendered offscreen
  update() {
    // I created this for loop to iterate through all stripes within a column to update their vertical positions
    // if any lane stripe exceeds the canvas' bottom and is fully offscreen, it will be sent back to the top offscreen at y = - 180
    // to ensure lane stripe spacing stays consistent, the out-of-bound lane stripe needs to wait until its y exceeds (height + 180) to compensate the reset position at y = -180
    for (let i = 0; i < this.laneStripeY.length; i++) {
      this.laneStripeY[i] += roadSpeed; 
      if (this.laneStripeY[i] > height + this.stripeSpacing ) {
        this.laneStripeY[i] = -this.stripeSpacing;
      }
    }

    // similar logic applies to the road block. I used the for loop to iterate through every road block and update each block's y position for vertical movement.
    for (let i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      block.yTop += roadSpeed;

      // if the road block is fully below the screen, it will be sent back to the very top above other road blocks.
      // in this case we will need to take account of the road block's self height and the gap from another road block
      if (block.yTop > height) {
        // initialize the top-most road block to be the first block in the array
        let topmost = this.blocks[0];
        // here I decided to use a linear minimum search with a for loop to determine the top-most road block after each position reset, so that for the next block that will need to reset its position, it can use the correct block's y-coordinate as a reference.
        // this for loop will return the block with the lowest yTop value and set it as the topmost
        for (let j = 1; j < this.blocks.length; j++) {
          if (this.blocks[j].yTop < topmost.yTop) {
            topmost = this.blocks[j];
          }
        }

        // before sending any bottom block back to the top, its height and gap need to be randomized again to ensure replayability
        let h = random(this.blockMinHeight, this.blockMaxHeight);
        let gap = random(this.blockMinGap, this.blockMaxGap);
        block.height = h;
        // sending the bottom block to the top-most position
        block.yTop = topmost.yTop - gap - h;
      }
    }
  }

  // I created this class draw() function to render any road related objects on the canvas.
  // this way makes it easy to debug and maintain especially when I have many different objects to be drawn on canvas
  draw() {
    // city background color
    // base layer
    background(40, 40, 60);
    rectMode(CORNER);
    noStroke();

    // road base is at the center and on top of the base layer
    fill(35);
    rect(this.left, 0, this.width, height);

    // the two road side lines that identify the boundary of the road
    stroke(255);
    strokeWeight(4);
    line(this.left + 10, 0, this.left + 10, height);
    line(this.right - 10, 0, this.right - 10, height);

    // lane stripes
    rectMode(CENTER);
    noStroke();
    fill(255);
    // here I use two for loops to iterate through every stripe and render them on the canvas based on their individual X and Y coordinate retrieved from laneStripeY and laneStripeX arrays
    // the first for loop iterates through each stripe in each individual column
    for (let i = 0; i < this.laneStripeY.length; i++) {
      // the second for loop iterates through the four stripe columns
      for (let j = 0; j < this.laneStripeX.length; j++) {
        // draw the stripe using a rectangle
        rect(this.laneStripeX[j], this.laneStripeY[i], this.stripeWidth, this.stripeHeight);
      }
    }

    fill(230, 200, 60); // fill the color for the road blocks
    // here I use a for loop to iterate through all the blocks in the array and draw each existing road block by assigning their corresponding Y coordinates and height
    for (let i = 0; i < this.blocks.length; i++) {
      // here we treat yTop as the y coordinate at the top most point of the road block. Since I am using rectMode(CENTER), I need to add an additional half height of the block itself to its yTop, so that blockY is the center of the road block
      let blockY = this.blocks[i].yTop + this.blocks[i].height / 2;
      // draw the road block using a rounded-corner rectangle with a constant centerX and width
      rect(this.centerX, blockY, this.blockWidth, this.blocks[i].height, 6);
    }
  }
}

// I created the car class here to assemble all its related data and components at one place
class Car {
  constructor() {
    // this radius is for collision detection using dist() later
    this.radius = 35;
    // this speed is how fast the car can move horizontally
    this.speed = 12;
    // I call a resetPosition() here to mainly initialize the car position when the game is loaded
    this.resetPosition();
  }

  // I created this function to set the x and y position of the car and to be used in other places like restarting the game
  // here I used the randomSide() to randomly choose either "left" or "right" and feed that return value to the getLaneCenter() function.
  // this way everytime the player starts a new game, the car have an equal chance of being on either side of the road, which increases the overall playability
  resetPosition() {
    this.x = road.getLaneCenter(randomSide());
    this.y = height * 0.72;
    // set the boolean variable to false so that the car and finger current position will update every time it starts a new game
    handPoseDoOnce = false;
  }

  // this update() function would work similarly as the road class update() function.
  // it mainly updates the player input with the car position for both keyboard and hand pose
  update() {
    // keyboard controls
    // first we want to see if 'A' or left arrow key is pressed down. If it is true, we make the car move left.
    // https://p5js.org/reference/p5/keyIsDown/
    // https://p5js.org/reference/p5/keyCode/
    if (keyIsDown(65) || keyIsDown(37)) {
      this.x -= this.speed;
    }
    // if the above is false, we check if 'D' or right arrow key is pressed down. If it is true, we make the car move right.
    if (keyIsDown(68) || keyIsDown(39)) {
      this.x += this.speed;
    }
    // we use this if statement to see if any hands have been detected through the webcam to improve code efficiency
    // hand pose logics will only be executed once any hands are detected
    if (hands.length > 0){
      // set the index finger's tip to a corresponding data point from the hand pose
      let indexTip = hands[0].keypoints[8];
      // if any hands reappear through the webcam or the game restarts, the current position of the car will be set to current car X position.
      // the beginning x position of the index finger will be reset to current index finger's X position, so that the hand pose control will follow the car's new position instantly
      if (!handPoseDoOnce) {
        this.currentPosition = this.x;
        startFingerX = indexTip.x;
        // the last step is to set the gate boolean back to true to avoid infinitely setting car's current position and the starting X-position of the index finger
        // we only need to set it once as a calibration process
        handPoseDoOnce = true;
      }
      // here I calculate how far the finger has moved from its starting position and store that value inside deltaX
      let deltaX = indexTip.x - startFingerX;

      // here I used the relative distance of how far the finger has moved within the video frame width to the left and the video frame to the right, to map to the canvas width to the left and to the right.
      // I chose this specific width to ensure smoothness and responsiveness for the hand pose control. If the allowed travel width is small, it will cause the car to move slower along the finger, which makes the game experience worse.
      // since I noticed the car is moving the opposite way of the finger when I set them the same scale (from negative to positive), I adjusted the movement value so that the finger movement maps the opposite direction against the car, which solves the camera reflection issue.
      let movement = map(deltaX, video.width, -video.width, -width, width);

      // this additional step is to ensure the car horizontal movement is smoothed since I noticed small glitch and lag during the gameplay when the ml5 hand pose is on
      // so I store the car's current position and its horizontal movement to the targetX, and this will be the lerp target that the car keeps trying to reach
      let targetX = this.currentPosition + movement;
      // and then I keep updating the lerp() function and assign the lerped value back to the car's horizontal position
      // 0.3 for the alpha value is at the sweet spot, which is responsive enough but not too fast
      this.x = lerp(this.x, targetX, 0.3);
    } else {
      // if there is no hand detected, we will allow the game system to re-evaluate the car's current position and update the starting position of the index finger whenever any hand is detected again
      // this avoids instability and instant shift for the car if any hands were lost for tracking by webcam
      handPoseDoOnce = false;
    }

    // since the car's movement range can go out of the bound of the canvas, I used the constrain() function here to limit the car's X coordinate to be within road's left-most boundary + 45 and road's right-most boundary - 45.
    // since the car's radius is 35, 45 is enough for the bound margin to avoid shifting the car out of the road.
    this.x = constrain(this.x, road.left + 45, road.right - 45);
  }

  // this draw function draws the basic shapes for the car
  draw() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);

    // car main body
    noStroke();
    fill(60, 180, 230);
    rect(0, 0, 70, carLength, 18);

    // car roof
    fill(210);
    rect(0, -5, 50, 80, 12);

    // front window
    fill(190, 230, 255);
    rect(0, -40, 46, 20, 10);

    // back window
    fill(190, 230, 255);
    rect(0, 30, 46, 18, 8);

    // roof lines
    stroke(230);
    strokeWeight(2);
    line(-20, -15, 20, -15);
    line(-20, 10, 20, 10);

    // headlights
    noStroke();
    fill(255, 255, 180, 200); 
    ellipse(-20, -carLength/2 + 5, 15, 5); // left headlight
    ellipse(20, -carLength/2 + 5, 15, 5);  // right headlight

    // here I create glow effect with bigger transparent ellipses for each headlight
    fill(255, 255, 180, 60);
    ellipse(-20, -carLength/2 + 5, 30, 10);
    ellipse(20, -carLength/2 + 5, 30, 10);

    // tail lights
    fill(255, 0, 0, 200);
    ellipse(-20, carLength/2 - 10, 12, 8); // left tail light
    ellipse(20, carLength/2 - 10, 12, 8);  // right tail light

    // here I create glow effect with bigger transparent ellipses for each taillight
    fill(255, 0, 0, 80);
    ellipse(-20, carLength/2 - 10, 25, 15);
    ellipse(20, carLength/2 - 10, 25, 15);

    fill(60, 180, 230);

    // left mirror
    push();
    rotate(radians(-20));
    rect(-30, -carLength/4, 12, 5, 3);
    pop();

    // right mirror
    push();
    rotate(radians(20));
    rect(30, -carLength/4, 12, 5, 3);
    pop();

    pop();
  }
}

// here I create an item class for each interactable item on the road
// the basic logic is still defining basic properties in the constructor and update every item's position in the update() function
// then draw each item on the canvas using draw() and update the shape's coordinates correspondingly
class Item {
  constructor(kind, x, y) {
    this.kind = kind; // set the item kind; is it bad or good or neutral
    this.x = x; // take in the x-coordinate parameter value
    this.y = y; // take in the y-coordinate parameter value

    // I want to make the size of different types of interactable item differ, so I decided to use if statement to identify each item and set their base radius correspondingly
    if (kind == "charge") {
      this.baseRadius = 28;
    } else if (kind == "rock") {
      this.baseRadius = 34;
    } else if (kind == "garbage") {
      this.baseRadius = 26;
    } else {
      this.baseRadius = 24;
    }

    // I want to give each rock a random shape but with 9 vertex so I decided to store those in the rockVertex array container
    // later in the draw() loop I can iterate through these points and draw the shape with random vertex positions along the circle radius since I am using polar coordinates
    if (this.kind == "rock") {
      this.rockVertex = [];
      let vertex = 9;
      let step = TWO_PI / vertex;
      for (let i = 0; i < vertex; i++) {
        let r = this.baseRadius * random(0.7, 1.1);
        let posX = r * cos(i * step);
        let posY = r * sin(i * step);
        this.rockVertex.push({ x: posX, y: posY });
      }
    }
  }

  update() {
    // update the vertical position of each item
    this.y += roadSpeed;
  }

  draw() {
    push();
    translate(this.x, this.y);

    // here I used if statements to draw shapes for each kind of interactable items
    if (this.kind == "charge") {
      noStroke();

      // outer circle
      fill(0, 190, 255);
      ellipse(0, 0, this.baseRadius * 2, this.baseRadius * 2);
      
      // eletricity icon
      fill(255, 255, 0);
      beginShape();
      vertex(-4, -6);
      vertex(2, -20);
      vertex(0, -4);
      vertex(8, -4);
      vertex(2, 10);
      vertex(-1, 1);
      endShape(CLOSE);
      
    } else if (this.kind == "rock") {
      fill(100);
      beginShape();
      // using precomputed rock vertex values from the array to draw the shape for rock
      for (let i = 0; i < this.rockVertex.length; i++) {
        vertex(this.rockVertex[i].x, this.rockVertex[i].y);
      }
      endShape(CLOSE);

    } else if (this.kind == "garbage") {
      noStroke();
      fill(30, 190, 80);
      ellipse(0, 0, this.baseRadius * 2, this.baseRadius * 2);

      // simple centered triangle
      noFill();
      stroke(255);
      strokeWeight(4);
      triangle(0, -10, 12, 8, -12, 8);
    }

    pop();
  }
}

// here I decided to create a SceneryBuilding class so I can spawn many building instances randomly and keep the code maintained and controlled

class SceneryBuilding {
  // pass in all parameter values to this class's instance
  constructor(x, y, w, h, side) {
    this.x = x; // x-coordinate
    this.y = y; // y-coordinate
    this.w = w; // width of the building
    this.h = h; // height of the building
    this.side = side; // left or right side of the city
  }

  update() {
    // this updates the vertical position of the building based on half of the road speed
    this.y += roadSpeed * 0.5;
    // if the building exceeds the canvas bottom boundary, it will be assigned new values for its properties by receiving from the randomBuilding() function
    if (this.y - this.h / 2 > height) {
      let building = randomBuilding();
      this.x = building.x;
      this.y = building.y;
      this.w = building.w;
      this.h = building.h;
      this.side = building.side;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);

    // outer rectangle for building basic structure
    fill(90, 90, 130);
    noStroke();
    rect(0, 0, this.w, this.h);

    // roof
    fill(60, 60, 90);
    rect(0, -this.h / 2, this.w * 0.9, 10);

    // windows is a bit tricky since there will be many of them. So I decided to use a for loop to iterate through the total number of windows defined by columns and rows
    fill(235, 235, 170);
    let rows = 6;
    let cols = 3;
    // divide the horizontal space in between windows
    let spaceX = this.w / (cols + 1);
    // divide the vertical space in between windows
    let spaceY = this.h / (rows + 1);
    // now we loop through all the rows and columns to create evenly spaced windows across the building, respecting spaceX for horizontal and spaceY for vertical
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        let windowX = -this.w / 2 + j * spaceX;
        let windowY = -this.h / 2 + i * spaceY;
        rect(windowX, windowY, 10, 14, 2);
      }
    }

    pop();
  }
}

// since I want to place multiple trees randomly on the sides, I decided to create a class for tree specifically so it wil just create instances of itself and share main logics in the same class
class SceneryTree {
  // in constructor I pass in the parameter values to each SceneryTree instance
  constructor(x, y, w, h, side) {
    this.x = x; // x-coordinate
    this.y = y; // y-coordinate
    this.w = w; // width
    this.h = h; // height
    this.side = side; // left side or right side of the city
  }

  update() {
    // in this update(), I update the vertical position of the tree based on half of the road speed
    // I want to create this kind of delay effect for the sideways to show difference between road and sidewalks
    this.y += roadSpeed * 0.5;
    // if any of the trees exceed the bottom screen boundary, they will be recreated by calling the randomTree() function that I created to conveniently assign trees with new properties. This ensures randomness avoids repetitiveness.
    if (this.y - this.h / 2 > height) {
      let tree = randomTree();
      // here we reassign this tree instance's properties from the values generated from randomTree()
      this.x = tree.x;
      this.y = tree.y;
      this.side = tree.side;
      this.w = tree.w;
      this.h = tree.h;
    }
  }
  draw() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);

    // tree branch
    noStroke();
    fill(90, 60, 30);
    rect(0, this.h * 0.5, this.w * 0.3, this.h * 0.3);

    // tree leaves
    fill(20, 120, 40);
    ellipse(0, 0, this.w * 1.4, this.h * 0.7);

    pop();
  }
}

// I created this customized function to randomly return a string value that can either be left or right with an equal chance
// becuase I need to assign this randomized side value in multiple places, I decided to create this function for cleaner and modular implementation
function randomSide() {
  // each side has an equal chance of 50%
  if (random(1) < 0.5) {
    return "left";
  } else {
    return "right";
  }
}

// I created this customized function to map the "side" value to its own x-coordinate for the buildings and trees to spawn
// I randomize the x-coordinate values and set it within the margin bound of each side. I set the margin to be 60 is because the max value of building width is 120, so to avoid the building exceeding the road border, I set the x-coordinate of the buildings and trees 60 units away from the road border.
function sideX(side) {
  if (side === "left") {
    // return the left side randomized x-coordinate value 
    return random(60, road.left - 60); // 60 is half of 120 for max building width
  } else {
    // return the right side randomized x-coordinate value
    return random(road.right + 60, width - 60);
  }
}

// I created this customized function to randomize the value for side, width, height, x and y-coordinate of a building instance
// the main purpose of this function is to return a new building instance with newly assigned propety values
function randomBuilding() {
  let side = randomSide();
  let w = random(60, 120);
  let h = random(160, 260);
  let x = sideX(side);
  let y = random(-height * 1.5, -130); // 130 is half of 260 from building height
  return new SceneryBuilding(x, y, w, h, side);
}

// same logic applies here except it is for spawning a tree instance with newly randomized property values
function randomTree() {
  let side = randomSide();
  let x = sideX(side);
  let y = random(-height * 1.5, -130);
  let w = random(30, 45);
  let h = random(70, 110);
  return new SceneryTree(x, y, w, h, side);
}

// main draw loop for the game system
// updates every frame

function draw() {
  // I used deltaTime here to ensure frame rate independency for the game system
  // divided deltaTime by 1000 to convert it to seconds
  let dt = deltaTime / 1000 ;

  // I used this if statement to make sure the logics below are only excecuted when the game system is not currently in a "game over" state
  if (!gameOver) {
    // call the update() function for each road instance
    road.update();
    
    // call the update() function for each building and tree instance
    // I used the for loop for buildings array and trees array to iterate through every instance and call update() on them
    for (let i = 0; i < buildings.length; i++) {
      buildings[i].update();
    }
    for (let i = 0; i < trees.length; i++) {
      trees[i].update();
    }

    // here I used another if statement to check if the game system is currently not in the "main menu" state. Logics below should be excecuted only when mainMenu state is false.
    // the main reason I gate the logics below is that they lean towards the gameplay functions which are not needed in the main menu state
    if (!mainMenu) {
      // call the spawnItems() function to keep spawning the interactable objects
      spawnItems();
      // update the control inputs for car only when not in the main menu
      // I don't want the players to be able to move the car in the main menu
      car.update();

      // I used the for loop here to call update() on every interactable item
      for (let i = items.length - 1; i >= 0; i--) {
        items[i].update();
        // if any item instance exceeds the screen bottom border, it will be spliced from the array to avoid memory leak issue and efficiency
        if (items[i].y - items[i].baseRadius > height) {
          items.splice(i, 1);
        }
      }

      // call the checkCollisions() function to update the collisions between interactable items and the car
      checkCollisions();

      // here I set the energy value to keep getting subtracted by the energyDrainRate multiplied by deltatime in seconds to keep the energy value updated
      // multiply energyDrainRate by dt can avoid getting affected by frame fluctuation issues
      energy = energy - energyDrainRate * dt;
    
      // here I check if the energy value is smaller or equal to 0, which means the energy is used up, then the gameOver state will become true
      if (energy <= 0) {
        gameOver = true;
      }

      // here I check if the bonue timer is bigger than 0, which means that the player has activated the bonus timer
      if (bonusTimer > 0) {
        // I used the max() function here to constrain the value to be positive because any value that will fall below 0 will take 0 as the output due to max()
        bonusTimer = max(0, bonusTimer - deltaTime / 1000);
        // when it is in the bonus state, the player's score will now increment 2 times faster based on the baseScoreRate
        score += baseScoreRate * dt * 2;
        // set the road speed to 15 to increase the car vertical movement speed during bonus time
        roadSpeed = 15;
      } else {
        // if the player is no longer in the bonus state, player's score will restore back to baseScoreRate
        score += baseScoreRate * dt;
        // set the road speed back to 10, which is the original speed 
        roadSpeed = 10;
      }
    }
    
  }
  // logics below will execute constantly in all game states
  // they are mainly for background decoration purposes only

  // call the draw() function on road and car to keep them visible on the canvas at all time
  road.draw();
  car.draw();

  // here I used three for loops to iterate through trees, buildings, and items instances and draw them on the canvas
  for (let i = 0; i < trees.length; i++) {
    trees[i].draw();
  }
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].draw();
  }
  for (let i = 0; i < items.length; i++) {
    items[i].draw();
  }

  // draw the game info UI on the top left corner of the screen
  drawUI();

  // here I used if statement to check if the game is in the game over state. Game over logics will be excecuted below when the game is over
  if (gameOver) {
    // call the drawGameOver() to draw the corresponding UI on top of the canvas
    drawGameOver();
    // here I used the boolean variable playOnce to ensure the sound effect functions only excecute once when the game is over
    if (!playOnce) {
      // temporarily pause the background music
      myBGM.pause();
      // I only want the crash sfx to trigger when the car hits any blocks instead of using up all energy. Hence I used this if statement to make sure this crash sfx only plays when the energy is not used up
      if (energy > 0) {
        // play index 3 sfx from the sound effect array
        mySFX[3].play();
        // lower the index 3 sfx volume to half of its original
        mySFX[3].amp(0.5);
      }
      // play the game over sfx
      mySFX[4].play();
      // set the playOnce boolean variable back to true immediately after the first excecution
      playOnce = true;
    }
  }

  // if the game is currently in the main menu state, then draw the main menu UI.
  if (mainMenu) {
    drawMainMenu();
    // if the player enters the instruction menu, then draw the how to play UI.
    if (howToPlay) {
      drawHowToPlay();
    }
  }

  // here I want to make sure the gameplay background music plays when it is not currently playing and the game is not over
  if (!myBGM.isPlaying() && !gameOver) {
    myBGM.play(); // play the background music
    myBGM.amp(0.2); // set the volume to 0.2 times of its original
    playOnce = false; // set the gate variable to false
  }
}

// Helper function for gameplay system

// I created this customized function for spawning random interactable objects
// this helper function is the core for making the game feel balanced and fun by controlling how frequent the interactable items should appear
function spawnItems() {
  // I used this if statement to control the spawn randomness and frequency by comparing a randomly generated number (0-1) to 0.03. An interactable item will only be spawned when this number is smaller than 0.03.
  // because this function runs in the main draw loop that updates every frame, the 0.03 threshold is the value that I tested that works the best for a balanced gameplay.
  if (random(1) < 0.03) {
    let side = randomSide(); // assign a random side of the road for this item instance
    let laneCenter = road.getLaneCenter(side); // get the lane center x-coordinate of that specific side of the road
    let spawnRange = road.laneWidth * 0.35; // set the spawn range to 0.35 times of the lane width (either left lane or right lane)
    let x = random(laneCenter - spawnRange, laneCenter + spawnRange); // set the x-coordinate of the spawned item instance to a random number around the laneCenter by the amount of spawnRange
    let y = -40; // set the initial y-coordinate of spawned item instance to -40 which will appear offscreen

    // I tried to randomly assign an item kind to each instance by using random(1) and comparing it to a preset threshold. I tweaked the threshold for each item kind to ensure fun and smooth gameplay
    let possibility = random(1); // let the possibility value to be any number in between 0 and 1
    let kind;
    // if the possibility value is any number below 0.25, the item will become a charge cell
    if (possibility < 0.25) {
      kind = "charge";
    // if the value is any number bigger than 0.25 but smaller than 0.4, the item will become a recycable item
    } else if (possibility < 0.4) {
      kind = "garbage";
    // if the value is any number bigger than 0.4, the item will become a rock obstacle
    } else {
      kind = "rock";
    }

    // after setting up the item property value, I add the newly created item class instance to the items array
    items.push(new Item(kind, x, y));
  }
}

// I created this customized function to check collisions between interactable items/road blocks and car
// this is another crucial gameplay helper function I implemented in the main draw loop that keeps updating to check for collisions
// all major collision code can be modified and maintained in this helper function
function checkCollisions() {
  // here I used a for loop to iterate through all interactable items from the last item to the first item in the array.
  // the reason why I chose to do a reverse for loop is that I splice the interactable item that exceeds the very bottom of the screen in the main draw loop. To avoid ordering issue from splicing items in an array, the safest way to iterate through the array is to loop from behind
  for (let i = items.length - 1; i >= 0; i--) {
    // I used a dist() function here inside an if statement to determine if any item instances are overlapping with the car
    if (dist(items[i].x, items[i].y, car.x, car.y) < items[i].baseRadius + car.radius) {
      // here I used an if statement to check if this item instance is a charge cell
      if (items[i].kind == "charge") {
        // if it is a charge cell, it charges up the energy bar by 25 units. I used a min() function here to ensure the energy value can never exceed 100, which is the maximum value for energy bar.
        // if energy + 25 exceeds 100, it will always return 100
        energy = min(100, energy + 25);
        mySFX[0].play(); // plays the charge up sfx
      } else if (items[i].kind == "garbage") {
        // if this item instance belongs to a recycable item, it will add an additional 5 seconds to the current bonus timer
        bonusTimer += 5;
        mySFX[1].play(); // play the index 1 sound effect
        mySFX[2].play(); // play the index 2 sound effect
        mySFX[2].amp(0.2); // lower the volume by 0.2 times the original
      } else if (items[i].kind == "rock") {
        // if this item instance is a rock obstacle, it sets the current game state to game over equals to true
        gameOver = true;
      }
      // after this item instance collides with the car, it is spliced from the current array to avoid memory leak issues and optimize performance
      items.splice(i, 1);
    }
  }

  // here I check the collision between road blocks and car by first examining if the car is horizontally within the middle road block's width
  let blockLeft = road.centerX - road.blockWidth / 2; // get the middle road block's left-most x-coordinate
  let blockRight = road.centerX + road.blockWidth / 2; // get the middle road block's right-most x-coordinate

  // here I used an if statement to check if the left or right side of the car is overlapping with the middle road block
  if (car.x + car.radius > blockLeft && car.x - car.radius < blockRight) {
    // if the car is overlapping horizontally with the middle block column, I want to check if any of the road block is vertically overlapping with the car as well since the car completely collides with the road block when both x and y-coordinate overlaps.
    // here I set three y-coordinate checkpoints for the car. One at the front, one at the middle, and one at the back. This ensures the collision between road block and car is accurate.
    let frontY = car.y - carLength / 2;
    let midY   = car.y;
    let backY  = car.y + carLength / 2;
    // make all three checkpoints into a single array for collision check
    let sampleY = [frontY, midY, backY];

    // here I used a for loop to iterate through all three checkpoints and call collideWithBlock() on each of them to see if the car is completely colliding with the road block
    for (let i = 0; i < sampleY.length; i++) {
      if (collideWithBlock(sampleY[i])) {
        // if they are colliding, the game over state becomes true
        gameOver = true;
      }
    }
  }
}

// I created this customized function to check if the car is colliding with the road block in the middle
// this gameplay helper function returns boolean value of whether they are colliding or not
// this function checks if a y-coordinate of the car is within any road block's vertical range
function collideWithBlock(y) {
  // I used a for loop here iterate through all road blocks and get their top border y-coordinate and their height
  for (let i = 0; i < road.blocks.length; i++) {
    let top = road.blocks[i].yTop; // the top y-coordinate of the road block instance is yTop
    let bottom = road.blocks[i].yTop + road.blocks[i].height; // the bottom y-coordinate of the road block instance is yTop + its height
    // if the car y-coordinate is within the road block's top and bottom vertical range, this helper function will return true for colliding with the road block, otherwise return false
    if (y >= top && y <= bottom) {
      return true;
    }
  }
  return false;
}

// I created this isPinching() function to contain all ml5 hand pose pinching logic in this place
function isPinching() {
  // only run the code when there is hand being detected
  if (hands.length > 0){
    let indexTip = hands[0].keypoints[8]; // store the index tip from the ml5 hand pose data points
    let thumbTip = hands[0].keypoints[4]; // store the thumb tip from the ml5 hand pose data points
    let pinch = dist(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y); // calculate the distance between index tip and thumb tip
    // if the index and thumb tips are close enough for pinching, this function returns true for pinching. Otherwise return false
    if (pinch < 20) {
      return true;
    }
  }
  return false;
}

// this keyPressed() function mainly detects key inputs from the player for menu UI selection 
function keyPressed() {
  // if the game is over and the player presses 'r' key, the game will restart and play the game start sound effect
  if (gameOver && (key == 'r' || key == 'R')) {
    restartGame();
    mySFXUI[2].play();
    mySFXUI[2].amp(0.7);
  }

  // if the game is currently in the main menu state and not in the instruction menu, it will be allowed to receive 'w' and 's' key for navigating between options in the main menu
  // I don't want the player to be able to navigate the main menu options while in the instruction menu
  // main menu options are identified by menu index. the first option is index 0 and the second option is index 1.
  if (mainMenu && !howToPlay) {
    // https://p5js.org/reference/p5/keyCode/
    if (keyCode == UP_ARROW || key == 'w' || key == 'W') {
      // navigate to the option above
      menuIndex -= 1;
      // plays menu UI sound effect only when the selection changes to another option successfully, not staying on the same option
      if (menuIndex >= 0) {
        mySFXUI[0].play();
      }
      // I want to make sure that the UI option selection will not go out of order when the player spams on either up or down arrow when choosing between options
      // I used the constrain() to limit the menu option index to its minimum and maximum value
      menuIndex = constrain(menuIndex, 0, menuItems.length - 1);
    // https://p5js.org/reference/p5/keyCode/
    } else if (keyCode == DOWN_ARROW || key == 's' || key == 'S') {
      // navigate to the option below
      menuIndex += 1;
      // plays menu UI sound effect only when the selection changes to another option successfully, not staying on the same option
      if (menuIndex < menuItems.length) {
        mySFXUI[0].play();
      }
      // same logic applies here for using constrain() after incrementing the menu index
      menuIndex = constrain(menuIndex, 0, menuItems.length - 1);
    } 
  }

  // if the player is in the main menu and presses ENTER key, the game UI system will check what current menu index it is and execute different logics based on it.
  if (mainMenu && keyCode == ENTER) {
    // if the current option is start game, it changes the current main menu state to false and plays the start game UI sound effect
    if (menuIndex == 0) {
      startGame();
      mySFXUI[2].play();
      mySFXUI[2].amp(0.7);
    // if the current option is how to play and it is not in the instruction menu yet, it changes howToPlay to true which activates the secondary instruction menu and plays the UI sound effect.
    } else if (menuIndex == 1) {
      if (!howToPlay) {
        howToPlay = true;
        mySFXUI[1].play();
      // if it is currently in the instruction menu, it toggles howToPlay back to false, which disables the instruction menu
      } else {
        howToPlay = false;
      }
    }
  }
}

// I created this customized function for restarting the game, which resets all accumulative values and sound effects that impact the gameplay
function restartGame() {
  score = 0; // reset to 0 
  energy = 100; // reset to 100
  bonusTimer = 0; // reset to 0
  items = []; // reset to an empty array
  gameOver = false; // reset to false for game over
  car.resetPosition(); // reset the car's position
  // here I used a for loop to iterate through all the gameplay sound effects and see if any of them are still playing. Stop any playing sound effects to prevent chaos in sound effect overlay under frequent game restart.
  for (let i = 0; i < mySFX.length; i++) {
    if (mySFX[i].isPlaying()) {
      mySFX[i].stop();
    }
  }
}

// this customized function for starting a game is very simple. Starting a new game will set the main menu state to false
function startGame() {
  mainMenu = false;
}

// callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// Game UI helper functions
// draws the gameplay UI on the top left corner of the screen
function drawUI() {
  push();
  rectMode(CORNER);

  // background base overlay
  noStroke();
  fill(0, 150);
  rect(10, 10, 300, 100, 10);

  // draws the text 'Power' on the canvas on top of the base overlay
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP); // align the text to top left corner | https://p5js.org/reference/p5/textAlign/
  text("Power", 20, 18);

  let barX = 20; // set the x-coordinate for the power bar
  let barY = 42; // set the y-coordinate for the power bar
  let barWidth = 230; // set the power bar width
  let barHeight = 20; // set the power bar height

  // draw the power bar stroke
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(barX, barY, barWidth, barHeight, 5);

  // power bar fill
  // map the power bar fill width from energy value (0-100) to energy bar width (0-230)
  let energyBarWidth = map(energy, 0, 100, 0, barWidth);
  noStroke();
  fill(80, 220, 120);
  rect(barX, barY, energyBarWidth, barHeight, 5);

  // draw the score UI on the canvas
  fill(255);
  textSize(18);
  text("Score: " + floor(score), 20, 72); // I used floor() here to ensure the score value is always an integer | https://p5js.org/reference/p5/floor/

  // only draw the bonus points UI on the canvas when the bonus timer is activated
  if (bonusTimer > 0) {
    fill(255, 255, 0);
    textSize(14);
    text("DOUBLE POINTS: " + floor(bonusTimer) + "s", 160, 18); // I also used floor() here to ensure the bonus timer in seconds is always an integer
  }

  pop();
}

// draw the game over UI overlay
function drawGameOver() {
  push();
  rectMode(CORNER);

  // draw the background blur for full screen overlay
  fill(0, 200);
  rect(0, 0, width, height);

  // draw the UI text on the canvas
  textAlign(CENTER);
  fill(255);
  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 30);

  textSize(24);
  text("Score: " + floor(score), width / 2, height / 2 + 5);
  text("Press R or pinch to restart", width / 2, height / 2 + 40);
  pop();

  // detects hand pose for pinching
  if (isPinching()){
    // pinching restarts the game and plays UI sound effect
    restartGame();
    mySFXUI[2].play();
    mySFXUI[2].amp(0.7);
  }
}

// draws the main menu
function drawMainMenu() {
  background(0, 150);

  // title
  textAlign(CENTER);
  fill(0, 255, 255);
  textSize(72);
  text("ELECTRIC RUSH", width / 2, height / 2 - 160);

  // subtitle
  textSize(28);
  fill(200);
  text("Drive the future clean", width / 2, height / 2 - 110);

  // hint
  textSize(16);
  fill(150);
  text("Use ↑ / ↓ or W / S to select options, ENTER or pinch to confirm selection", width / 2, height - 40);

  // menu items
  // here I used a for loop to iterate through all menu options and position them in their relative locations.
  // based on what the current menu index is, a selection symbol will appear for that selected menu option
  for (let i = 0; i < menuItems.length; i++) {
    let y = height / 2 + i * 40;
    if (i == menuIndex) {
      fill(0, 255, 255);
      textSize(32);
      text("> " + menuItems[i] + " <", width / 2, y);
    } else {
      fill(220);
      textSize(28);
      text(menuItems[i], width / 2, y);
    }
  }

  // here I used this if statement to prevent the pinching logics to be executed multiple times for selection
  // if I don't add a threshold time for input action delay, pinching will run multiple times that negatively affects the player experience
  if (isPinching() && !howToPlay && millis() - lastActionTime > delay) {
    lastActionTime = millis();
    if (menuIndex == 0) {
      startGame();
      mySFXUI[2].play();
      mySFXUI[2].amp(0.7);
    } else if (menuIndex == 1) {
      howToPlay = true;
      mySFXUI[1].play();
    }
  }
}

// draw the instruction menu on the canvas
function drawHowToPlay() {
  push();
  background(8, 8, 20);

  textAlign(CENTER, TOP);

  // title
  fill(0, 255, 255);
  textSize(40);
  text("HOW TO PLAY", width / 2, height * 0.17);

  // body text
  // divide the text body into two columns
  let leftX = width * 0.12; // left column
  let rightX = width * 0.55; // right column
  let topY = height * 0.3; // top most row
  let lineSpacing = 32; // line spacing

  textAlign(LEFT, TOP);
  fill(255);

  // initialize the starting point for the text blocks using y-coordinate
  let y = topY;
  let yRight = topY;

  // controls - keyboard
  textSize(24);
  text("Controls – Keyboard:", leftX, y);
  y += 1.5 * lineSpacing;
  textSize(18);
  text("• A = move left", leftX, y); 
  y += lineSpacing;
  text("• D = move right", leftX, y); 
  y += lineSpacing * 1.4;

  // controls - hand tracking
  textSize(24);
  text("Controls – Hand Tracking:", leftX, y); 
  y += 1.4 * lineSpacing;
  textSize(18);
  text("• Use your index fingertip to move the car left and right.", leftX, y); 
  y += lineSpacing;
  text("• Only one hand should be visible to the camera.", leftX, y); 
  y += lineSpacing;
  text("• Using two hands can cause bad tracking and gameplay.", leftX, y); 
  y += lineSpacing;
  text("• The finger needs to be aligned with the car’s horizontal position", leftX, y); 
  y += lineSpacing;
  text("  after swapping hands, taking back control from the keyboard,", leftX, y);
  y += lineSpacing;
  text("  or restarting the game.", leftX, y);

  // menu selection
  textSize(24);
  text("Menu Selection:", rightX, yRight); 
  yRight += 1.5 * lineSpacing;
  textSize(18);
  text("• Press ENTER to confirm menu options.", rightX, yRight); 
  yRight += lineSpacing;
  text("• Or pinch (index + thumb) to confirm.", rightX, yRight); 
  yRight += lineSpacing * 1.4;

  // objectives & items
  textSize(24);
  text("Objectives:", rightX, yRight); 
  yRight += 1.4 * lineSpacing;
  textSize(18);
  text("• Collect Charge Cells to keep your electric car powered.", rightX, yRight); 
  yRight += lineSpacing;
  text("• Collect Recyclables to double points and boost speed", rightX, yRight); 
  yRight += lineSpacing;
  text("  for 5 seconds (effects are accumulative).", rightX, yRight); 
  yRight += lineSpacing;
  text("• Dodge rocks and avoid the middle road blocks.", rightX, yRight); 
  yRight += lineSpacing;
  text("• Crashing will break your car and end the run.", rightX, yRight); 
  yRight += lineSpacing;
  text("• The longer you drive, the higher your score.", rightX, yRight); 
  yRight += lineSpacing;
  text("• Use Recyclables to boost your score faster.", rightX, yRight); 

  // bottom hint
  textAlign(CENTER, TOP);
  fill(200);
  textSize(16);
  text("Press ENTER or pinch to go back to the main menu", width / 2, height * 0.8);
  pop();

  // ml5 hand pose detection for pinching in instruction menu 
  // still implements the input delay to avoid multiple executions
  if (isPinching() && millis() - lastActionTime > delay) {
    lastActionTime = millis();
    howToPlay = false;
  }
}