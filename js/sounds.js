//Audio objects
var backgroundTrack = new Audio("audio/Test.mp3");
//Looping
testTrack.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);