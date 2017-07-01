var Frame = function(){
	this.canvas = [];
	for(var i = 0; i < width*height; i++){
		this.canvas.push(0);
	}
};

Frame.prototype.edit = function(x,y){
	// if(eraserMode === false){
	// 	this.canvas[ (x*height) + y] = 1;
	// } else {
	// 	this.canvas[ (x*height) + y] = 0;
	// }
	for(var i = -1*(thickness-1); i <= (thickness-1); i++){
		for(var j = -1*(thickness-1); j <= (thickness-1); j++){
			if(eraserMode === false){
				this.canvas[ ((x+i)*height) + (y+j)] = 1;
			} else {
				this.canvas[ ((x+i)*height) + (y+j)] = 0;
			}
		}
	}
}

Frame.prototype.display = function(opacity){
	fill(255*opacity);
	stroke(255*opacity);
	for(var x = 0; x < width; x++){
		for(var y = 0; y < height; y++){
			if(this.canvas[ (x*height) + y] === 1){
				ellipse(x,y,1,1);
			}
		}
	}
}
