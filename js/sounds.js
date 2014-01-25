//Audio objects
var backgroundTrack = new Audio("audio/Melodikon_Basic_Background_1.mp3");
//Looping
backgroundTrack.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var wilhelm = new Audio("audio/WilhelmScream.mp3");