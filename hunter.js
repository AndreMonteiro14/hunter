var Frame = function(){
	this.marks = [];
};

Frame.prototype.edit = function(x,y){
	if(eraserMode === false){
		this.marks.push(new Array(x,y,thickness));
	} else {
		for(var k = 0; k < this.marks.length; k++){
			if(dist(x,y,this.marks[k][0],this.marks[k][1]) < thickness){
				this.marks.splice(k,1);
			}
		}
	}
}

Frame.prototype.display = function(opacity){
	loadPixels();
	fill(255*opacity);
	stroke(255*opacity);
	for(var i = 0; i < this.marks.length; i++){
		ellipse(this.marks[i][0],this.marks[i][1],this.marks[i][2],this.marks[i][2]);
	}
}
