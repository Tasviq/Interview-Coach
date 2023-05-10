var seconds = 5;
var countdown = setInterval(function() {
  seconds--;
  document.getElementById("countdown").textContent = seconds;
  if (seconds <= 0) {
    clearInterval(countdown);

    // Hide the countdown element
    document.getElementById("countdown").style.display = "none";

    setTimeout(function() {
      // Show the "Next Question" button
      document.getElementById("nextQuestionBtn").style.display = "inline-block";
    }, 1500);

    // ask the first question and play webcam to begin
    askQuestion();
  }
}, 1000);

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium')
  .then(response => response.json())
  .then(data => {
    // do something with the data
    console.log(data.results);
  })
  .catch(error => console.error(error));

// retrieve interview type from local storage
const interviewType = localStorage.getItem("interviewType");
var questions;
if (interviewType === "b") {
  questions = ["Tell me a little bit about yourself.", "What are your strengths?", "What are your weaknesses?", "Describe a problem that you solved under pressure."];
} else if (interviewType === "c"){
  questions = ["Define polymorphism.", "What are hash tables?", "Describe some shortest path-finding algorithms", "How do you use multi-threading?"];
} else if (interviewType === "t"){
  questions = ["Coming soon."];
}


var currentQuestionIndex = 0;

function askQuestion() {
  // get the video element
  var video = document.getElementById("videoElement");
  // use the MediaDevices.getUserMedia() method to access the camera; stream object is created if permission granted. Video = true means on.
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      video.srcObject = stream;
      setTimeout(function() {
        // create a new SpeechSynthesisUtterance object
        var msg = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
        // use the default voice
        msg.voice = speechSynthesis.getVoices()[0];
        // speak the text
        speechSynthesis.speak(msg);
      }, 1000);
    })
    .catch(function(error) {
      console.error("Error accessing the camera: ", error);
    });
}

document.getElementById("nextQuestionBtn").addEventListener("click", function() {
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length -1) {
    // All questions have been asked
    document.getElementById("nextQuestionBtn").style.display = "none";
  }
  askQuestion();
});
