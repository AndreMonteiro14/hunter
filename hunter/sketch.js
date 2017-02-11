var hunters = [];
var d = -0.25;
var difficulty = 0.008;
var currentR = 5;
var growth = 0.6;
var respawn = true;
var numCircles = 40;
var decoys = true;
var decoyOn = true;
var decoyLife = 200;
var currentDecoy = decoyLife;
var decoyCooldown = 1200;
var currentCooldown = decoyCooldown;
var allowDecoy = true;
var huntX;
var huntY;
var decoyX;
var decoyY;
var goFinal = false;

function setup() {
    createCanvas(1000,650); 
    for(var i = 0; i < numCircles; i++){
        hunters.push(new Hunter(random(20,width-20),random(20,height-20),random(currentR-2,currentR*5),random(20,230),random(20,230),random(20,230)));
    }
}

function draw() {
    background(0);
    if(decoys === false){
        huntX = mouseX;
        huntY = mouseY;
    } else {
        if(decoyOn === false || allowDecoy === false || goFinal === false){
            huntX = mouseX;
            huntY = mouseY;
        } else {
            huntX = decoyX;
            huntY = decoyY;
            fill(255);
            ellipse(decoyX,decoyY,20,20);
            currentDecoy--;
        }
    }
    
    if(mouseX > width){
        mouseX = width;
    } 
    
    if(mouseY > height){
        mouseY = height;
    }
    
    for(var i = hunters.length-1; i > -1; i--){
        hunters[i].update();
        hunters[i].display();
        var fe = p5.Vector.sub(hunters[i].position,createVector(huntX,huntY));
        if(hunters[i].r < currentR){
            fe.mult(-d);    
        } else {
            fe.mult(d);
        }
        hunters[i].applyForce(fe);
        if(hunters[i].position.x < hunters[i].r*2 || hunters[i].position.x > width - hunters[i].r*2){
            hunters[i].velocity.x *= -0.8;
        }
        
        if(hunters[i].position.y < hunters[i].r*2 || hunters[i].position.y > height - hunters[i].r*2){
            hunters[i].velocity.y *= -0.8;
        }
        
        if(dist(hunters[i].position.x,hunters[i].position.y,mouseX,mouseY) < hunters[i].r+currentR){
            if(currentR > hunters[i].r){
                currentR += hunters[i].r/TWO_PI * growth;
                hunters.splice(i,1);
                hunters.push(new Hunter(random(20,width-20),random(20,height-20),random(4,30),random(20,255),random(20,255),random(20,255))); 
            } else {
                noLoop();
            }
        }
    }
    
    keyPressed = function(){
        if(key == ' '){
            goFinal = true;
            decoyX = mouseX;
            decoyY = mouseY;
        }    
    }
    
    if(currentDecoy < 1){
        allowDecoy = false;
        goFinal = false;
    }
    
    if(allowDecoy === false){
        currentCooldown--;
        if(currentCooldown < 1){
            allowDecoy = true;
            currentCooldown = decoyCooldown;
            currentDecoy = decoyLife;
        }
    }
    fill(255);
    ellipse(mouseX,mouseY,currentR*2,currentR*2)
    d -= difficulty; 
}
