//frs is short for frames
var frs = [];
var currentFrame = 0;
var thickness = 1;
var playMode = false;
var layers = [];
var eraserMode = false;
var drawing = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	frs.push(new Frame());
	//layers.push(new Layer(frs[0]));
}

function draw() {
	background(255);
	noFill();
	ellipse(mouseX,mouseY,thickness,thickness);
	if(playMode === true){
		frs[currentFrame].display(0);
		currentFrame += 1;
		if(currentFrame >= frs.length-1){
			currentFrame = 0;
		}
	} else {
		if(currentFrame !== 0){
			frs[currentFrame-1].display(0.75);
		}
		frs[currentFrame].display(0);
		mouseDragged = function(){
		  frs[currentFrame].edit(mouseX,mouseY);
		}
		
		keyPressed = function(){
			if(keyCode === RIGHT_ARROW){
				if(currentFrame === frs.length-1){
					frs.push(new Frame());
				}
				currentFrame += 1;
			} else if(keyCode === LEFT_ARROW && currentFrame > 0){
				currentFrame -= 1;
			}
		}
		
		keyTyped = function(){
			if(key == "p"){
				frameRate(15);
				currentFrame = 0;
				playMode = true;
			} else if(key == "="){
				thickness += 1;
			} else if(key == "-"){
				thickness -= 1;
			} else if(key == "e"){
				if(eraserMode === false){
					eraserMode = true;
				} else {
					eraserMode = false;
				}
			}
		}
	}
	fill(0);
	textSize(12);
	text("Frame Rate: " + round(frameRate()),width-100,20);
	text("Frame " + (currentFrame+1) + "/" + frs.length,width-100,40);
	text("Thickness: " + thickness,width-100,60);
	if(eraserMode === true){
		text("Eraser Mode On",width-100,80);
	} else {
		text("Eraser Mode Off",width-100,80);
	}
	textSize(15);
	text("By Andre Monteiro",width-150,height-20);
}
