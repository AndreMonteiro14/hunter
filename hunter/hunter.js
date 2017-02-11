var Hunter = function(x,y,r,c1,c2,c3){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.r = r;
    this.c = [c1,c2,c3];
};

Hunter.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);    
    this.acceleration.set(0,0);
};

Hunter.prototype.display = function(){
    fill(this.c[0],this.c[1],this.c[2])
    ellipse(this.position.x,this.position.y,this.r*2,this.r*2);    
};

Hunter.prototype.applyForce = function(f){
    var force = p5.Vector.div(f,PI * sq(this.r));
    force.mult(0.001);
    this.acceleration.add(force);
};
