noseX=0;
noseY=0;
difference = 0;
rightWristX=0;
leftWristX =0;

function setup(){
canvas = createCanvas(400,300)
canvas.position(750,150);
video=createCapture(VIDEO);
video.size(400,300);
video.position(150,150)

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose", gotPoses)

}

function modelLoaded(){
    console.log("PoseNet is initialized")
}

function gotPoses(results){

    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX =" + noseX +" noseY =" + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = Math.floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + " rightWristX =" + rightWristX);
    }
}

function draw(){
    background("grey");

    document.getElementById("size").innerHTML = "The size of the shape is "+difference+"px"
    fill("red")
    stroke("red");
    
    var shape = document.getElementById("dropdown").value;

    if(shape == "Circle"){
        circle(noseX,noseY,difference)
    }
    else if(shape == "Square"){
        square(noseX,noseY,difference)
    }
    else if(shape == "Rectangle"){
        breadth = difference*0.5
        rect(noseX,noseY,difference,breadth)
    }
    else if(shape == "Triangle"){
        diff = difference/2
        x1 = noseX - diff;
        y = noseY + diff;
        x3 = noseX + diff;
        triangle(x1,y,noseX,noseY,x3,y)
    }
    else {
        translate(noseX,noseY);
        for(i = 0; i < 10; i++){
            ellipse(0,30,20,difference);
            rotate(PI/5);
        }
    }
}

