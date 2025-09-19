const canvasWidth = 1000;
const canvasHeight = 750;
let lineSpacing = 22;

let earthcolor1 = "#D9B44A";
let earthcolor2 = "#A67C2D";
let earthcolor3 = "#6B4F2A";
let earthcolor4 = "rgba(0, 0, 0, 0.7)";
let earthcolor5 = "rgba(0, 0, 0, 0.5)";

let waterColor1 = "#A7C6ED";
let waterColor2 = "#6B9AC4";
let waterColor3 = "#4A8D9D";     
let waterColor4 = "#2B6B7A";
let waterColor5 = "#1D4D5A";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
}

function draw() {
  console.log(mouseX + " " + mouseY);
  const scaleFactor = min(width / canvasWidth, height / canvasHeight );
  scale(scaleFactor);
  noStroke();

  //base shapes
  fill(waterColor3);
  rect(0, 0, 230, 150);
  fill(waterColor2);
  rect(230, 0, 150, 150);
  fill(waterColor3);
  rect(380, 0, 220, 60);
  fill(waterColor2);
  rect(600, 0, 220, 60);
  fill(waterColor3);
  rect(820, 0, 180, 380);
  fill(waterColor1);
  rect(380, 60, 220, 320);
  fill(waterColor5);
  rect(600, 60, 220, 320);
  fill(waterColor2);
  rect(0, 150, 230, 150);
  fill(waterColor2);
  rect(0, 300, 230, 450);
  fill(waterColor1);
  rect(230, 150, 150, 600);
  fill(waterColor2);
  rect(380, 380, 265, 370);
  fill(waterColor1);
  rect(645, 380, 265, 370);
  fill(waterColor5);
  rect(910, 380, 90, 370);

  //layer 2 shapes
  fill(waterColor2);
  rect(0, 0, 145, 60);
  fill(waterColor5);
  rect(145, 60, 85, 90);
  fill(waterColor4);
  rect(705, 60, 115, 100);
  rect(600, 160, 105, 220);
  fill(waterColor4);
  rect(230, 150, 75);
  rect(305, 225, 75, 155);
  fill(waterColor5);
  rect(305, 150, 75);
  
  //begin shape
  fill(waterColor3);
  beginShape();
  vertex(230, 225);
  vertex(305, 225);
  vertex(305, 380);
  vertex(185, 380);
  vertex(185, 300);
  vertex(230, 300);
  endShape(CLOSE);

  fill(waterColor5);
  beginShape();
  vertex(185, 300);
  vertex(185, 380);
  vertex(40, 380);
  vertex(40, 680);
  vertex(140, 680);
  vertex(140, 750);
  vertex(0, 750);
  vertex(0, 300);

  endShape(CLOSE);

  //layer 2 shapes
  fill(waterColor3);
  rect(140, 680, 90, 70);
  fill(waterColor4);
  rect(380, 680, 265, 70);
  fill(waterColor2);
  rect(645, 640, 265, 110);
  fill(waterColor3);
  rect(910, 470, 55, 215);

  // layer 3 shape pattern
  noFill();
  strokeWeight(15);
  stroke(earthcolor3);
  strokeCap(SQUARE);
  arc(145, 200, 125, 80, 0, PI);

  noStroke();
  fill(earthcolor5);
  triangle(145, 245, 125, 380, 165, 380);

  //begin shape
  fill(earthcolor1);
  beginShape();
  vertex(125, 380);
  vertex(165, 380);
  vertex(200, 600);
  vertex(100, 600);
  endShape(CLOSE);

  fill(earthcolor2);
  beginShape();
  vertex(260, 435);
  vertex(360, 435);
  vertex(325, 570);
  vertex(360, 710);
  vertex(250, 710);
  vertex(295, 570);
  endShape(CLOSE);

  fill(earthcolor3);
  beginShape();
  vertex(850, 60);
  vertex(960, 60);
  vertex(925, 260);
  vertex(955, 345);
  vertex(855, 345);
  vertex(885, 260);
  endShape(CLOSE);



  // layer 3 shape pattern
  fill(earthcolor3);
  triangle(145, 550, 200, 600, 100, 600);

  noFill();
  strokeWeight(15);
  stroke(earthcolor3);
  arc(310, 530, 170, 90, 0, PI);

  noStroke();
  fill(earthcolor1);
  quad(400, 150, 450, 115, 500, 150, 450, 185);
  fill(earthcolor3);
  triangle(450, 115, 500, 150, 450, 150);
  triangle(400, 150, 450, 185, 450, 150);
  fill(earthcolor1);
  triangle(450, 185, 450, 380, 500, 380);
  triangle(500, 380, 550, 260, 550, 380);
  fill(earthcolor3);
  rect(450, 380, 100, 145);
  fill(earthcolor4);
  triangle(450, 525, 550, 525, 500, 380);
  triangle(550, 525, 600, 525, 600, 380);
  triangle(550, 525, 550, 710, 600, 710);
  fill(earthcolor3);
  triangle(550, 525, 550, 710, 500, 710);

  noFill();
  strokeWeight(16);
  stroke(waterColor2);
  arc(710, 285, 170, 80, 0, PI);

  noStroke();
  fill(earthcolor2);
  quad(700, 465, 770, 415, 840, 465, 770, 515);
  fill(earthcolor4);
  triangle(700, 465, 770, 415, 770, 465);
  triangle(840, 465, 770, 515, 770, 465);
  triangle(770, 515, 770, 610, 700, 610);
  fill(earthcolor3);
  triangle(770, 515, 770, 610, 840, 610);

  //layer 4 extra detail

  //begin shape lines
  fill(earthcolor2);
  beginShape();
  vertex(855, 83);
  vertex(955, 83);
  vertex(954, 100);
  vertex(858, 100);
  endShape(CLOSE);

  beginShape();
  vertex(860, 120);
  vertex(950, 120);
  vertex(948, 137);
  vertex(865, 137);
  endShape(CLOSE);

  beginShape();
  vertex(866, 157);
  vertex(945, 157);
  vertex(940, 174);
  vertex(870, 174);
  endShape(CLOSE);

  beginShape();
  vertex(872, 194);
  vertex(936, 194);
  vertex(933, 211);
  vertex(877, 211);
  endShape(CLOSE);

  beginShape();
  vertex(878, 223);
  vertex(932, 223);
  vertex(928, 240);
  vertex(882, 240);
  endShape(CLOSE);

  beginShape();
  vertex(885, 260);
  vertex(924, 260);
  vertex(932, 277);
  vertex(878, 277);
  endShape(CLOSE);

  beginShape();
  vertex(874, 292);
  vertex(935, 292);
  vertex(942, 306);
  vertex(868, 306);
  endShape(CLOSE);

  beginShape();
  vertex(864, 319);
  vertex(945, 319);
  vertex(952, 333);
  vertex(858, 333);
  endShape(CLOSE);

  //lines
  stroke(waterColor3);
  strokeWeight(4)
  line(670, 640, 670, 750);
  line(670 + lineSpacing, 640, 670 + lineSpacing, 750);
  line(670 + lineSpacing * 2, 640, 670 + lineSpacing * 2, 750);
  line(670 + lineSpacing * 3, 640, 670 + lineSpacing * 3, 750);
  line(670 + lineSpacing * 4, 640, 670 + lineSpacing * 4, 750);
  line(670 + lineSpacing * 5, 640, 670 + lineSpacing * 5, 750);
  line(670 + lineSpacing * 6, 640, 670 + lineSpacing * 6, 750);
  line(670 + lineSpacing * 7, 640, 670 + lineSpacing * 7, 750);
  line(670 + lineSpacing * 8, 640, 670 + lineSpacing * 8, 750);
  line(670 + lineSpacing * 9, 640, 670 + lineSpacing * 9, 750);
  line(670 + lineSpacing * 10, 640, 670 + lineSpacing * 10, 750);
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
