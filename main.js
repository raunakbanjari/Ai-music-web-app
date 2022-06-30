happy = "";
harry = "";

rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist = 0;
harry_song = "";

function preload(){
    happy = loadSound("happy.mp3");
    harry = loadSound("harry.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,400,400);
    fill('red');
    stroke('red');
    harry_song = harry.isPlaying();
    console.log(harry_song);
    if(scoreleftWrist > 0.2){
        circle(leftWristX -170 , leftWristY-60 , 20);
        happy.stop();
        if(harry_song == false){
            harry.play();
            harry.loop()
            console.log("playing harry potter theme song");
            document.getElementById("song").innerHTML = "SONG NAME : HARRY POTTER THEME SONG";
        }
        
    }


}
function modelLoaded(){
    console.log("POSENET IS INITIALIZED");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("x coordinate of right wrist : " + rightWristX + " y coordinate of right wrist : " + rightWristY);
        console.log("x coordinate of left wrist : " + leftWristX + " y coordinate of left wrist : " + leftWristX);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
    }
}