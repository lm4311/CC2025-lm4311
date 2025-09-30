let S = 32;    // cell size

function setup() {
  createCanvas(832, 640);
  noFill();
  stroke(240);
  strokeWeight(2);
  randomSeed(5); // remove this line if you want a new look each run
}

function draw() {
  background(16);
  if (mouseIsPressed == true){
    fill("red");
  }
  const cols = ceil(width / S);
  const rows = ceil(height / S);

  for (let j = 0; j < rows; j++) {
    // chaos goes 0 → 1 from top to bottom
    const t = map(j, 0, rows - 1, 0, 1);

    for (let i = 0; i < cols; i++) {
      // base position (center of the cell)
      const cx = i * S + S * 0.5;
      const cy = j * S + S * 0.5;

      // simple chaos controls
      const jitter = t * S * 0.4;                 // position drift
      const rot    = t * random(-PI, PI);         // rotation grows with t
      const span   = map(t, 0, 1, 0, HALF_PI);   // arc lengthens with t

      // small chance to skip tiles near the bottom
      if (random() < t * 0.15) continue;

      push();
      
      translate(cx + random(-jitter, jitter), cy + random(-jitter, jitter) - 25);

      // start ordered: alternate orientation like a checkerboard
      let additiveRot;
      if ((i + j) % 2 === 0) {
        additiveRot = 0;            // even cells: 0°
      } else {
        additiveRot = radians(270);      // odd cells: 90°
      }

      const totalRot = additiveRot + rot; // add the random rotation you already computed
      rotate(totalRot);

      // arc diameter changes a bit with chaos
      const d = S * map(t, 0, 1, 1.0, 1.25);

      arc(0, 0, d, d, radians(-90), span);

      pop();
    }
  }
  noLoop();

}