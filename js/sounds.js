//Audio objects
var backgroundTrack = new Audio("audio/Miles_The_Harp_updated_loop_with_fx.mp3");
//Looping
backgroundTrack.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var wilhelm = new Audio("audio/WilhelmScream.mp3");

var gameOver = new Audio("audio/Game_Over.mp3");