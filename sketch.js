var dataX = [7,11.5,9,9.5,9,12,11,12,7.5,7.5];
var dataY = [16,20,17,17.5,17.5,20,18,19.5,17.5,16]; 
var highX = 15;
var highY = 25;
var lowX = 5;
var lowY = 10;
var dataDiameter = 10;
var m = 0;
var b = 0;
var n = dataX.length;
var sum = [0,0,0,0,0];
var r = 20;

function setup() { 
  createCanvas(windowWidth,windowHeight);
	background(220);
	
	for(var i = 0; i < dataX.length; i++){
		dataX[i] = map(dataX[i],lowX,highX,0,width);
		dataY[i] = map(dataY[i],lowY,highY,0,height);
	}
	
	for(var i = 0; i < dataX.length; i++){
		fill(0);
		ellipse(dataX[i],height-dataY[i],dataDiameter,dataDiameter);
		sum[0] += dataX[i];
		sum[1] += dataY[i];
		sum[2] += sq(dataX[i]);
		sum[3] += sq(dataY[i]);
		sum[4] += dataX[i] * dataY[i];
	}
	b = ( (sum[1] * sum[2]) - (sum[0]*sum[4]) ) / ( (n * sum[2]) - sq(sum[0]) )
	m = ( (n * sum[4]) - (sum[0] * sum[1]) ) / ( (n * sum[2]) - sq(sum[0]) )
	print("y = " + m + "x + " + b);
	line(0,(height-b),width,(height-(width*m + b)));
}
