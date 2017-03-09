var scl = 20;
var snake;
var foods = [];
var powerup = [];
var powerup2 = [];
var fr = 10;
var pm = 1;
var keys = [];

function setup() {
    createCanvas(windowWidth,windowHeight);
    snake = new Snake();  
    foods[0] = round(random(1,width/scl-1));
    foods[1] = round(random(1,height/scl-1));
    powerup[0] = round(random(1,width/scl-1));
    powerup[1] = round(random(1,height/scl-1));
    powerup2[0] = round(random(1,width/scl-1));
    powerup2[1] = round(random(1,height/scl-1));
    frameRate(fr);
}

function draw() {
    background(255);
    keyTyped = function(){
        keys.push(key);
        if(keys.length === 3){
            if(keys[0] == bepsis(3)){
                if(keys[1] == bepsis(2)){
                    if(keys[2] == bepsis(1)){
                        pm = 10;
                        fr = 50;
                    }
                }
            }
        }
    }
    strokeWeight(3)
    noFill();
    rect(2,2,width-2,height-2);
    strokeWeight(1)
    snake.display();
    snake.update();
    keyPressed = function(){
        if(keyCode === UP_ARROW){
            snake.dir = [0,-1];
        } else if(keyCode === DOWN_ARROW){
            snake.dir = [0,1];
        } else if(keyCode === LEFT_ARROW){
            snake.dir = [-1,0];
        } else if(keyCode === RIGHT_ARROW){
            snake.dir = [1,0];
        }
    }
    fill(30,200,30);
    rect(foods[0]*scl,foods[1]*scl,scl,scl);
    if(snake.x === foods[0] && snake.y === foods[1]){
        snake.length += (2 * pm);
        foods[0] = round(random(1,width/scl-1));
        foods[1] = round(random(1,height/scl-1));
    }
    
    fill(20,20,255)
    rect(powerup[0]*scl,powerup[1]*scl,scl,scl);
    if(snake.x === powerup[0] && snake.y === powerup[1]){
        fr *= 1.1;
        frameRate(fr);
        powerup[0] = round(random(1,width/scl-1));
        powerup[1] = round(random(1,height/scl-1));
    }

    fill(255,20,255);
    rect(powerup2[0]*scl,powerup2[1]*scl,scl,scl);
    if(snake.x === powerup2[0] && snake.y === powerup2[1]){
        pm *= 1.05;
        powerup2[0] = round(random(1,width/scl-1));
        powerup2[1] = round(random(1,height/scl-1));
    }
    
    if(snake.x > round(width/scl)-1 || snake.x < 0 || snake.y < 0 || snake.y > round(height/scl)-1){
        noLoop();
    }
    
    for(var i = snake.history.length-1; i >= snake.history.length-snake.length; i--){
        if(snake.history[i][0] === snake.x && snake.history[i][1] === snake.y){
            noLoop();
        }
    }
    textSize(15);
    fill(0);
    text("Speed: " + round(fr),width-80,height-20);
    text("Multiplier: " + pm, width-100,height-40)
    text("Andre Monteiro",20,height-40)
    text("Period 3",20,height-20)
    text("Score: " + (snake.length+1), width/2 - 20,height-10)
}
