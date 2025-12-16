// drunk walk

let myDrunks = []; // empty array

let numberOfDrunks = 100;

function setup() {
	createCanvas(500, 500);
	background(100);

	for (let i = 0; i < numberOfDrunks; i++) {
		let x = random(width);
		let y = random(height);
		let diameter = random(20, 50);
		let range = random(3, 7);
		let myDrunk = new Drunk(x, y, diameter, range);
		myDrunks.push(myDrunk);
	}
}

function draw() {
	for (let i = 0; i < myDrunks.length; i++) {
		myDrunks[i].move();
		myDrunks[i].display();
	}
}

function mousePressed() {
	let anyHovering = false;
	
	for (let i = 0; i < myDrunks.length; i++) {
		if (myDrunks[i].hovering == true) {
			myDrunks.splice(i, 1);
			anyHovering = true;
		}
	}
	
	if(anyHovering==false){
		let diameter = random(20, 50);
		let range = random(3, 7);
		let myDrunk = new Drunk(mouseX,mouseY,diameter,range);
		myDrunks.push(myDrunk);
	}
}

class Drunk {
	constructor(x, y, diameter, range) {  
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.range = range;
		this.hovering = false; // variable that keeps track of whether mouse is hovering
	}

	move() {
		this.x = this.x + random(-this.range, this.range);
		this.y = this.y + random(-this.range, this.range);
	}

	display() {
		let mouseDist = dist(mouseX, mouseY, this.x, this.y);
		if (mouseDist < this.diameter / 2) { // is mouse hovering over the circle?
			fill('black');
			this.hovering = true; // set to true if hovering
		} else {
			fill('white');
			this.hovering = false; // set to false if not hovering
		}

		circle(this.x, this.y, this.diameter);
	}


}
