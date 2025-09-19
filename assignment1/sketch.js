const canvasWidth = 1000;
const canvasHeight = 750;
let lineSpacing = 22;

let earthColor1 = "#E8D8C3";
let earthColor2 = "#D1C6B9";
let earthColor3 = "#B8B09D";
let earthColor4 = "#A69A8D";
let earthColor5 = "#8B7B6A";

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
  fill("rgb(61, 115, 81)");
  rect(0, 0, 230, 150);
  fill("rgb(145, 177, 78)");
  rect(230, 0, 150, 150);
  fill("rgb(59, 110, 79)");
  rect(380, 0, 220, 60);
  fill("rgb(85, 143, 85)");
  rect(600, 0, 220, 60);
  fill("rgb(146, 178, 79)");
  rect(820, 0, 180, 380);
  fill("rgb(146, 178, 79)");
  rect(820, 0, 180, 380);
  fill("rgb(193, 184, 83)");
  rect(380, 60, 220, 320);
  fill("rgb(39, 64, 71)");
  rect(600, 60, 220, 320);
  fill("rgb(152, 165, 49)");
  rect(0, 150, 230, 150);
  fill("rgb(146, 179, 74)");
  rect(0, 300, 230, 450);
  fill("rgb(193, 184, 83)");
  rect(230, 150, 150, 600);
  fill("rgb(88, 143, 76)");
  rect(380, 380, 265, 370);
  fill("rgb(193, 184, 83)");
  rect(645, 380, 265, 370);
  fill("rgb(40, 72, 59)");
  rect(910, 380, 90, 370);

  //layer 2 shapes
  fill("rgb(91, 150, 84)");
  rect(0, 0, 145, 60);
  fill("rgb(41, 72, 67)");
  rect(145, 60, 85, 90);
  fill("rgb(63, 118, 86)");
  rect(705, 60, 115, 100);
  rect(600, 160, 105, 220);
  fill("rgb(61, 112, 81)");
  rect(230, 150, 75);
  rect(305, 225, 75, 155);
  fill("rgb(39, 70, 65)");
  rect(305, 150, 75);
  
  //begin shape
  fill("rgb(84, 140, 77)");
  beginShape();
  vertex(230, 225);
  vertex(305, 225);
  vertex(305, 380);
  vertex(185, 380);
  vertex(185, 300);
  vertex(230, 300);
  endShape(CLOSE);

  fill("rgb(42, 76, 62)");
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
  fill("rgb(80, 129, 73)");
  rect(140, 680, 90, 70);
  fill("rgb(46, 95, 66)");
  rect(380, 680, 265, 70);
  fill("rgb(120, 162, 78)");
  rect(645, 640, 265, 110);
  fill("rgb(77, 132, 74)");
  rect(910, 470, 55, 215);

  // layer 3 shape pattern
  noFill();
  strokeWeight(15);
  stroke("rgb(89, 38, 43)");
  strokeCap(SQUARE);
  arc(145, 200, 125, 80, 0, PI);

  noStroke();
  fill("rgba(34, 35, 37, 0.7)");
  triangle(145, 245, 125, 380, 165, 380);

  //begin shape
  fill("rgb(83, 30, 36)");
  beginShape();
  vertex(125, 380);
  vertex(165, 380);
  vertex(200, 600);
  vertex(100, 600);
  endShape(CLOSE);

  fill("rgb(124, 81, 38)");
  beginShape();
  vertex(260, 435);
  vertex(360, 435);
  vertex(325, 570);
  vertex(360, 710);
  vertex(250, 710);
  vertex(295, 570);
  endShape(CLOSE);

  fill("rgb(71, 44, 35)");
  beginShape();
  vertex(850, 60);
  vertex(960, 60);
  vertex(925, 260);
  vertex(955, 345);
  vertex(855, 345);
  vertex(885, 260);
  endShape(CLOSE);



  // layer 3 shape pattern
  fill("rgb(31, 31, 33)");
  triangle(145, 550, 200, 600, 100, 600);

  noFill();
  strokeWeight(15);
  stroke("rgb(89, 38, 43)");
  arc(310, 530, 170, 90, 0, PI);

  noStroke();
  fill("rgb(139, 97, 55)");
  quad(400, 150, 450, 115, 500, 150, 450, 185);
  fill("rgb(94, 34, 44)");
  triangle(450, 115, 500, 150, 450, 150);
  triangle(400, 150, 450, 185, 450, 150);
  fill("rgb(124, 81, 38)");
  triangle(450, 185, 450, 380, 500, 380);
  triangle(500, 380, 550, 260, 550, 380);
  fill("rgb(88, 31, 40)");
  rect(450, 380, 100, 145);
  fill("rgb(34, 34, 36)");
  triangle(450, 525, 550, 525, 500, 380);
  triangle(550, 525, 600, 525, 600, 380);
  triangle(550, 525, 550, 710, 600, 710);
  fill("rgb(88, 31, 40)");
  triangle(550, 525, 550, 710, 500, 710);

  noFill();
  strokeWeight(16);
  stroke("rgb(143, 175, 74)");
  arc(710, 285, 170, 80, 0, PI);

  noStroke();
  fill("rgb(86, 34, 38)");
  quad(700, 465, 770, 415, 840, 465, 770, 515);
  fill("rgb(32, 33, 37)");
  triangle(700, 465, 770, 415, 770, 465);
  triangle(840, 465, 770, 515, 770, 465);
  triangle(770, 515, 770, 610, 700, 610);
  fill("rgb(86, 34, 38)");
  triangle(770, 515, 770, 610, 840, 610);

  //layer 4 extra detail

  //begin shape lines
  fill("rgb(38, 39, 41)");
  beginShape();
  vertex(855, 83);
  vertex(955, 83);
  vertex(950, 100);
  vertex(860, 100);
  endShape(CLOSE);

  beginShape();
  vertex(862, 120);
  vertex(948, 120);
  vertex(945, 137);
  vertex(865, 137);
  endShape(CLOSE);

  beginShape();
  vertex(869, 157);
  vertex(941, 157);
  vertex(940, 174);
  vertex(870, 174);
  endShape(CLOSE);

  beginShape();
  vertex(876, 194);
  vertex(934, 194);
  vertex(933, 211);
  vertex(877, 211);
  endShape(CLOSE);

  beginShape();
  vertex(881, 223);
  vertex(929, 223);
  vertex(928, 240);
  vertex(882, 240);
  endShape(CLOSE);

  beginShape();
  vertex(888, 260);
  vertex(922, 260);
  vertex(928, 277);
  vertex(882, 277);
  endShape(CLOSE);

  beginShape();
  vertex(874, 292);
  vertex(935, 292);
  vertex(940, 306);
  vertex(869, 306);
  endShape(CLOSE);

  beginShape();
  vertex(864, 319);
  vertex(942, 319);
  vertex(950, 333);
  vertex(860, 333);
  endShape(CLOSE);

  //lines
  stroke("rgb(104, 149, 58)");
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
