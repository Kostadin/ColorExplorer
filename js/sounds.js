//Audio objects
var backgroundTrack = new Audio("audio/Test.mp3");
//Looping
backgroundTrack.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);