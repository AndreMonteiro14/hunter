var Creature = function(x,y,vectors){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.fitness;
    this.dead = false;
    this.reached = false;
    if(vectors === undefined){
        this.vectors = [];
        for(var i = 0; i < lifespan; i++){
            var v = createVector(random(-speed,speed),random(-speed,speed))
            this.vectors.push(v);
        }
    } else {
        this.vectors = vectors;
    }
};

Creature.prototype.display = function(){
    fill(255,20,20,150);
    ellipse(this.position.x,this.position.y,20,20);
}

Creature.prototype.update = function(counting){
    this.acceleration.add(this.vectors[counting]);
    this.acceleration.add(gravity);
    if(this.position.y > height-10){
        this.velocity.y *= -1;
    }

    if(this.position.x < 10 || this.position.x > width-10){
        this.velocity.x *= -1;
    }
    if(this.position.y > height-11){
        this.position.y = height-11;    
    }
    for(var i = 0; i < obstacles.length; i++){
        if(this.position.y-10 < obstacles[i][1]+obstacles[i][3] && this.position.x + 10 > obstacles[i][0] && this.position.x-10 < obstacles[i][0] + obstacles[i][2] && this.position.y+10 > obstacles[i][1]){
            this.velocity.y *= -1.01;    
        }
        
        
        if(this.position.x-10 < obstacles[i][0]+obstacles[i][2] && this.position.y + 10 > obstacles[i][1] && this.position.y-10 < obstacles[i][1] + obstacles[i][3]  && this.position.x+10 > obstacles[i][0]){
            this.velocity.x *= -1.01;
        }
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0,0);
}
