var Frame = function(){
	this.canvas = [];
	for(var i = 0; i < width*height; i++){
		this.canvas.push(0);
	}
};

Frame.prototype.edit = function(x,y){
	this.canvas[ (x*height) + y] = 1;
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
