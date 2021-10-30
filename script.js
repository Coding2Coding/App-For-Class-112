var prediction1 = "";
var prediction2 ="";

Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function takePicture() {
    Webcam.snap(function (image) {
        document.getElementById("result").innerHTML = "<img src='"+image+"' id='clickedPicture'>";
    });
}

console.log("ml5 version: ", ml5.version);
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dttyiV_n-/model.json", modelLoaded);

function modelLoaded() {
    console.log("inside modelLoaded");
}

function speak() {
    var synthesis = window.speechSynthesis;
    var data1 = "The first prediction is: "+prediction1;
    var data2 = "And the second prediction is: "+prediction2;
    var textToSpeech = new SpeechSynthesisUtterance(data1 + data2);
    synthesis.speak(textToSpeech);
}

function identifyEmotion() {
    var clickedPicture = document.getElementById("clickedPicture");
    classifier.classify(clickedPicture, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("emotionName1").innerHTML = prediction1;
        document.getElementById("emotionName2").innerHTML = prediction2;
        speak();
        if(prediction1 == "Happy") {
            document.getElementById("emoji1").innerHTML = "&#x1F600";
        }
        else if(prediction1 == "Sad") {
            document.getElementById("emoji1").innerHTML = "&#x1F61F";
        }
        else if(prediction1 == "Angry") {
            document.getElementById("emoji1").innerHTML = "&#x1F620";
        }
        else {
            document.getElementById("emoji1").innerHTML = "&#128528";
        }
        if(prediction2 == "Happy") {
            document.getElementById("emoji2").innerHTML = "&#x1F600";
        }
        else if(prediction2 == "Sad") {
            document.getElementById("emoji2").innerHTML = "&#x1F61F";
        }
        else if(prediction2 == "Angry") {
            document.getElementById("emoji2").innerHTML = "&#x1F620";
        }
        else {
            document.getElementById("emoji2").innerHTML = "&#128528";
        }
    }
}