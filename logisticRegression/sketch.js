var training;
var learning_rate=0.001;
var n_iters=100;
var weights = [0,0];
var bias = 0;
var classNameDict = {"Class1": 0,
                 "Class2": 1};

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('#canvascontainer');
    canvas.mousePressed(addPoints);
    radio = createRadio();
    radio.option("Class1");
    radio.option("Class2");
    radio.value("Class1");
    // Data will be entered by user clicking
    training = [];

    temp = [[1,1],[2,2],[3,3]];
    temp2 = [0,1,2];
    console.log(math.dot(temp,temp2));
}

function addPoints() {
    // Add a data point
    training.push([createVector(mouseX / width, mouseY / height),classNameDict[className]]);
}

function sigmoid(X){
    
    let x1 = X.map(x => console.log(x[0]));
    let x2 = X.map(x => console.log(x[0]));
    let ans = [];
    for(let i=0; i<x1.length; i++){
        ans[i] = [x1[i], x2[i]];
    }   
    return ans;
}

function gradDescent(){

    let X = []
    let Y = []
    for(let i=1; i<training.length; i++){
        X[i-1] = [training[i][0].x,training[i][0].y];
        Y[i-1] = classNameDict[training[i][1]];
    }
    for(let i =0; i<=n_iters; i++){
        console.log(math.dotMultiply(X,weights));
        let y_pred = math.add(math.dotMultiply(X,weights),bias);
        console.log(y_pred);
        y_pred = sigmoid(y_pred);
        let error = Y.map((y,i) => y-y_pred[i]);
        dw = (1/X.length) * math.dot(X,error);
        db = (1/X.length) * math.sum(error);
        weights += learning_rate * dw;
        bias += learning_rate * db;
    }
}

function draw() {
  
    var classSelected = radio.value();
    if (classSelected == "Class1"){
        className = "Class1";
    }
    else{
        className = "Class2";
    }
    background(200);
    // Draw everything
    drawPoints();
    drawLine();
    if(training.length >= 4){gradDescent();}
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
    
    for (var i = 0; i < training.length; i++) {
        if(training[i][1] == "Class1"){
            stroke("green");
            fill("green");
        }
        else{
            stroke("red");
            fill("red");
        }
        ellipse(training[i][0].x * width, training[i][0].y * height, 4, 4);
    }
}
