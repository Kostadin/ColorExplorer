﻿var fps = 30;
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
var muteSound = false;
//Animation counter
var animationFrame = 0;
var gameFrame = 0;
var animationRatio = 3;
//Brick types
var platform = 0;
var portal = 1;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var currentTry = 0;
var maxTries = 3;
var deadAnimationHandle = null;
var currentLevelIndex = 0;
var $spriteXml = $('<TextureAtlas imagePath="sheet.png"><SubTexture name="die01.png" x="250" y="321" width="125" height="107"/><SubTexture name="die02.png" x="250" y="214" width="125" height="107"/>	<SubTexture name="die03.png" x="250" y="107" width="125" height="107"/><SubTexture name="die04.png" x="250" y="0" width="125" height="107"/><SubTexture name="die05.png" x="375" y="428" width="125" height="107"/><SubTexture name="die06.png" x="125" y="321" width="125" height="107"/><SubTexture name="die07.png" x="125" y="214" width="125" height="107"/><SubTexture name="die08.png" x="125" y="107" width="125" height="107"/><SubTexture name="fall.png" x="125" y="0" width="125" height="107"/><SubTexture name="idle01.png" x="0" y="428" width="125" height="107"/><SubTexture name="idle02.png" x="0" y="321" width="125" height="107"/><SubTexture name="jump.png" x="0" y="214" width="125" height="107"/><SubTexture name="run01.png" x="0" y="107" width="125" height="107"/><SubTexture name="run02.png" x="0" y="0" width="125" height="107"/><SubTexture name="run03.png" x="125" y="428" width="125" height="107"/><SubTexture name="run04.png" x="375" y="321" width="125" height="107"/><SubTexture name="run05.png" x="375" y="214" width="125" height="107"/><SubTexture name="run06.png" x="375" y="107" width="125" height="107"/><SubTexture name="run07.png" x="375" y="0" width="125" height="107"/><SubTexture name="run08.png" x="250" y="428" width="125" height="107"/></TextureAtlas>');
