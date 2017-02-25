var hunters = [];
var d = -0.25;
var difficulty = 0.008;
var currentR = 5.5;
var growth = 0.7;
var respawn = true;
var numCircles = 40;
var decoys = true;
var decoyOn = true;
var decoyLife = 200;
var currentDecoy = decoyLife;
var decoyCooldown = 1000;
var currentCooldown = decoyCooldown;
var allowDecoy = true;
var huntX;
var huntY;
var decoyX;
var decoyY;
var goFinal = false;
var showNums = false;
var endless = false;
var newPos1;
var newPos2;
var newR;

function setup() {
    createCanvas(windowWidth,windowHeight); 
    for(var i = 0; i < numCircles; i++){
        hunters.push(new Hunter(random(20,width-20),random(20,height-20),random(currentR-2,currentR*5),random(20,220),random(20,220),random(20,220)));
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
    
    if(mouseX > width-currentR){
        mouseX = width-currentR;
    } 
    
    if(mouseY > height-currentR){
        mouseY = height-currentR;
    }
    textSize(15);
    fill(255);
    text("Decoy Cooldown: " + round(currentCooldown),width-160,height-30);
    text("Current Size: " + round(currentR),width-160,height-10);
    text("Andre Monteiro",10,height-30);
    text("PD: 3",10,height-10);
    if(endless === true){
        text("Endless",width/2-10,height-10);
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
        
        if(dist(hunters[i].position.x,hunters[i].position.y,mouseX,mouseY) < (hunters[i].r+currentR)){
            if(currentR > hunters[i].r){
                currentR += hunters[i].r/TWO_PI * growth;
                hunters.splice(i,1);
                var go = false;
                while(go === false){
                    newPos1 = random(20,width-20);
                    newPos2 = random(20,height-20);
                    if(endless === true){
                        newR  = random(currentR*0.5,currentR*2);
                    } else {
                        newR = random(3,27.5);
                    }
                    if(dist(mouseX,mouseY,newPos1,newPos2) > 1.1*(currentR + newR)){
                        go = true;
                    }
                }
                hunters.push(new Hunter(newPos1,newPos2,newR,random(20,255),random(20,255),random(20,255))); 
            } else {
                fill(255);
                textSize(30);
                text("Thomaz is bad",width/2,height/2);
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
    
    keyTyped = function(){
        if(key == 'w'){
            if(showNums === false){
                showNums = true;
            } else {
                showNums = false;
            }
        } else if(key == 's'){
            endless = true;
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
