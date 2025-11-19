let video;
let bodyPose;
let poses = [];
let connections;
let leftWrist;
let rightWrist;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        textSize(20);
        text(j, keypoint.x, keypoint.y);
        //circle(keypoint.x, keypoint.y, 10);
      }
    }
  }

  if (poses.length > 0){
    leftWrist = poses[0].keypoints[9];
    rightWrist = poses[0].keypoints[10];
    let centerX = lerp(leftWrist.x, rightWrist.x, 0.5);
    let centerY = lerp(leftWrist.y, rightWrist.y, 0.5);
    let circleD = dist(leftWrist.x, leftWrist.y, rightWrist.x, rightWrist.y);
    circle(centerX, centerY, circleD * 0.75);
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}