var song = "";
leftWristX = 0;
RightWristX = 0;
RightWristY = 0;
leftWristY = 0;
scoreleftwrist = 0;
scoreRightwrist = 0;

function setup(){
    canvas = createCanvas(400 , 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose' , gotPoses);
}
function preload(){
    song = loadSound("music.mp3");
}
function draw(){
 image(video, 0 , 0 , 400 , 400 );

 fill("#FF0000");
 stroke("#FF0000");

 if(scoreleftwrist > 0.2){

 
 
 circle(leftWristX , leftWristY , 20);
 Innumberleftwrist = Number(leftWristY);
 remove_decimals_of_left_wrist = floor(Innumberleftwrist);
 volume = remove_decimals_of_left_wrist/500;
 console.log("volume = " + volume);
 document.getElementById("volume").innerHTML = "VOLUME = " + volume;
 song.setVolume(volume);
 }
 if(scoreRightwrist > 0.2){
//for drawing a circle to identify right wrist
 circle(RightWristX , RightWristY , 20);
 //for setting the speed of the song
 if(RightWristY>0 && RightWristY<=100){
    song.rate(0.5);
    document.getElementById("speed").innerHTML = "SPEED = 0.5x";
 }
 else if(RightWristY>100 && RightWristY<=200){
    song.rate(1);
    document.getElementById("speed").innerHTML = "SPEED = 1x";
 }
 else if(RightWristY>200 && RightWristY<=300){
    song.rate(1.5);
    document.getElementById("speed").innerHTML = "SPEED = 1.5x";

 }
 else if(RightWristY>300 && RightWristY<=400){
    song.rate(2);
    document.getElementById("speed").innerHTML = "SPEED = 2x";
 }
 else if(RightWristY>400 && RightWristY<=500){
    song.rate(2.5);
    document.getElementById("speed").innerHTML = "SPEED = 2.5x";
 }
 }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("speed").innerHTML = "SPEED = 1x";
}
function modelLoaded(){
    console.log("posenet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log(" score of the left wrist = " + scoreleftwrist);
        console.log(" score of the right wrist = " + scoreRightwrist);

        leftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("X coordinate of left wrist : " + leftWristX + "y coordinate of left wrist" + leftWristY);
        console.log("X coordinate of right wrist : " + RightWristX + "y coordinate of right wrist" + RightWristY); 
        
    }
}