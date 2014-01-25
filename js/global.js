var fps = 30;
var colorCount = 4;
var screenWidth = 1024;
var screenHeight = 600;
var screenOriginX = 0;
var screenOriginY = 0;
var levels = [];
var currentLevel = null;
var gameRunning = false;
var colors=['red','yellow','green','blue'];
var currentColor = 0;
var currentColorCSS = colors[currentColor];
var playSound = true;
//Brick types
var platform = 0;
var portal = 1;
var leftPressed = false;
var rightPressed = false;
