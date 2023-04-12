img="";
objects=[];
Status=""

function preload(){
alarm=loadSound("ALALRM.mp3");

}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
random_number=random(255);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Objects are being detected";
}


function modelLoaded(){


console.log("Model Loaded");
Status=true;
}

function gotResults(error,results){
if(error){console.log(error)};
if(results){
    console.log(results);
objects=results;



}


}


function draw(){
image(video,0,0,380,380);


if(Status!=""){
    objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
        r=random(255);
        g=random(255);
        b=random(255);

        document.getElementById("status").innerHTML = "Objects are detected";
         
        stroke(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+percent+"%",objects[i].x+55,objects[i].y+55);
        noFill();
        rect(objects[i].x+55,objects[i].y+55,objects[i].width,objects[i].height);

        if(objects[i].label=="person"){
            alarm.stop();
            
            document.getElementById("baby_status").innerHTML="Baby detected";
                    
            }
            else{
            document.getElementById("baby_status").innerHTML="Baby Not detected";
            alarm.play();
            alarm.rate(1)
            alarm.setVolume(1);
            
            }
    }

}


}