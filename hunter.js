var Snake = function(){
    this.x = round(width/2/scl);
    this.y = round(height/2/scl);
    this.history = [];
    this.length = 0;
    this.dir = [0,1];
}

Snake.prototype.display = function(){
    this.length = round(this.length);
    fill(255,0,0,200);
    rect(this.x*scl,this.y*scl,scl,scl);
    for(var i = this.history.length-1; i >= this.history.length-this.length; i--){
        rect(this.history[i][0]*scl,this.history[i][1]*scl,scl,scl);
    }
}

Snake.prototype.update = function(){
    this.length = round(this.length);
    this.history.push([this.x,this.y]);
    this.x += this.dir[0];
    this.y += this.dir[1];
}
