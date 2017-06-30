//frs is short for frames
var frs = [];
var currentFrame = 0;
var thickness = 1;
var playMode = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	frs.push(new Frame());
	for(var i = 50; i < 160; i++){
		frameRate(i);
	}
}

function draw() {
	background(255);
	if(playMode === true){
		frs[currentFrame].display(0);
		currentFrame += 1;
		if(currentFrame === frs.length-1){
			currentFrame = 0;
		}
	} else {
		if(currentFrame !== 0){
			frs[currentFrame-1].display(0.9);
		}
		frs[currentFrame].display(0);
		mouseDragged = function(){
		  frs[currentFrame].edit(mouseX,mouseY)
		}
		
		keyPressed = function(){
			if(keyCode === RIGHT_ARROW){
				frs.push(new Frame());
				currentFrame += 1;
			}
		}
		
		keyTyped = function(){
			if(key == "p"){
				currentFrame = 0;
				playMode = true;
				frameRate(20);
			}
		}
	}
	textSize(15);
	fill(0);
	text("By Andre Monteiro",width-150,height-20);
}
