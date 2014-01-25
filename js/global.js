var fps = 30;
var colorCount = 4;
var levels = [];
var currentLevel = null;
var gameRunning = false;
var colors=['red','yellow','green','blue'];
var currentColor = 0;
var currentColorCSS = colors[currentColor];
//Brick types
var platform = 0;
var portal = 1;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;