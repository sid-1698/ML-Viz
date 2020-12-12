var training;
var learning_rate=0.001;
var n_iters=100;
var weights = 0;
var bias = 0;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('#canvascontainer');
    canvas.mousePressed(addPoints);
    // lrSlider = select('#lrslider');
    // Data will be entered by user clicking
    training = [];
}

function addPoints() {
    // Add a data point
    training.push(createVector(mouseX / width, mouseY / height));
}

function gradDescent(){

    let X = []
    let Y = []
    for(let i=1; i<training.length; i++){
        X[i-1] = training[i].x
        Y[i-1] = training[i].y
    }
    for(let i =0; i<=n_iters; i++){
        let y_pred = X.map(x => x*weights+bias);
        let error = Y.map((y,i) => y-y_pred[i]);
        dw = (1/X.length) * math.dot(X,error);
        db = (1/X.length) * math.sum(error);
        weights += learning_rate * dw;
        bias += learning_rate * db;
    }
}

function draw() {
    background(200);
    // Draw everything
    drawPoints();
    drawLine();
    if(training.length >= 2){gradDescent();}
}

// Draw the current line
function drawLine() {
  // Draw a line between any two points (use min and max x)
  var x1 = 0;
  var y1 = weights * x1 + bias;
  var x2 = 1;
  var y2 = weights * x2 + bias;
  line(x1 * width, y1 * height, x2 * width, y2 * height);
}

function drawPoints() {
    stroke(0);
    fill(0);
    for (var i = 0; i < training.length; i++) {
      ellipse(training[i].x * width, training[i].y * height, 4, 4);
    }
}
