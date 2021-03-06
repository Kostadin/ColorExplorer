﻿var runGameHandle = null;

function setScreenOrigin(level){
	var ox = screenOriginX;
	var oy = screenOriginY;
	screenOriginX = Math.min(Math.max(level.player.x-(screenWidth/2),0), level.width-screenWidth);
	screenOriginY = Math.min(Math.max(level.player.y-(screenHeight/2),0), level.height-screenHeight);
	if ((ox!=screenOriginX)||(oy!=screenOriginY)){
		console.log('screenOriginX = '+screenOriginX+' screenOriginY = '+screenOriginY);
	}
}

function tileVisible(tile){
	if ((((screenOriginX<=tile.x)&&(tile.x<screenOriginX+screenWidth))||((screenOriginX<=tile.x+tile.width)&&(tile.x+tile.width<screenOriginX+screenWidth)))&&
		(((screenOriginY<=tile.y)&&(tile.y<screenOriginY+screenHeight))||((screenOriginY<=tile.y+tile.height)&&(tile.y+tile.height<screenOriginY+screenHeight))))
		return true;
	else
		return false;
}

function loadLevel(id){
	currentLevelIndex = id;
	currentLevel = jQuery.extend(true, {}, levels[id]);//Deep copy
	var p = currentLevel.player;
	currentColor = p.color;
	p.vel = [0,0];
	p.canJump = false;
	p.dead = false;
	p.win = false;
	p.killed = false;
	if (currentLevel.enemies==undefined){
		currentLevel.enemies=[];
	}
	setScreenOrigin(currentLevel);
	$('#level').html('');

	var player = '<div id="player" style="left:'+(p.x-screenOriginX+playerDivOffsetX)+'px;top:'+(p.y-screenOriginY+playerDivOffsetY)+'px;"/>';
	var tiles = '';
	var enemies = '';
	for(var i=0;i<currentLevel.tiles.length;++i){
		var tile = currentLevel.tiles[i];
		if (tile.type==platform){
			tiles += '<div id="tile_'+i+'" class="tile" style="left:'+(tile.x-screenOriginX+(-(platformWidth-tile.width)/2))+'px;top:'+(tile.y-screenOriginY+platformDivOffsetY)+'px;width:'+platformWidth+'px;height:'+platformHeight+'px;background-image:'+colorBackgrounds[tile.color]+';background-repeat:no-repeat;'+(((p.color!=tile.color)||!tileVisible(tile))?'display:none;':'')+'"/>';
		} else {
			tiles += '<div id="tile_'+i+'" class="tile portal" style="left:'+(tile.x-screenOriginX+(-(portalWidth-tile.width)/2))+'px;top:'+(tile.y-screenOriginY-portalHeight)+'px;width:'+portalWidth+'px;height:'+portalHeight+'px;'+((!tileVisible(tile))?'display:none;':'')+'"/>';
		}
	}
	for (var i=0;i<currentLevel.enemies.length;++i){
		var enemy = currentLevel.enemies[i];
		enemy.vel = [0,0];
		enemies += '<div id="enemy_'+i+'" class="enemy '+colors[enemy.color]+'Enemy" style="left:'+(enemy.x+enemyDivOffsetX)+'px;top:'+(enemy.y+enemyDivOffsetY)+'px"></div>';
	}
	$('#level').append(player);
	$('#level').append(tiles);
	$('#level').append(enemies);
	$('#level').css({
		display: 'block'
	});
	leftPressed = false;
	upPressed = false;
	rightPressed = false;
}

function runGame(){
	if(gameRunning){
		//Count frames
		gameFrame++;

		animationFrame = Math.floor(gameFrame / animationRatio);
		
		//Player variables
		var p = currentLevel.player;
		var animationType = "idle";
		//Read player input
		if (rightPressed){
			p.vel[0] += maxSideSpeed;
			animationType = "run";
			playerFacing = "right";
		} else if (leftPressed){
			p.vel[0] -= maxSideSpeed;
			animationType = "run";
			playerFacing = "left";
		} else {
			p.vel[0] = 0;
		}
		if ((upPressed)&&(p.canJump)){
			p.vel[1] += initialJumpSpeed;
			//alert('I can jump!');
		}
		
		//Process world
		p.color = currentColor;
		p.vel = addVectors(p.vel,gravity);
		runPhysics();
		
		//Check if jumping or falling
		if (p.vel[1] > 0)
			animationType = "fall";
		
		if (p.vel[1] < 0)
			animationType = "jump";
			
		var playerFrameInfo = getPlayerAnimationFrame(animationFrame, animationType, colors[currentColor]);
		var enemyFrameInfo = getEnemyAnimationFrame(animationFrame);
		
		setScreenOrigin(currentLevel);
		
		//Display
		
		//Background parallax
		$('#level').css({
			'background-position': (-screenOriginX / parallaxRatio) + 'px ' + '0px , 0px 0px',
		});

		//Player
		if (playerFacing == "right") {
			$('#player').css({
				left: (p.x-screenOriginX+playerDivOffsetX)+'px',
				top: (p.y-screenOriginY+playerDivOffsetY)+'px',
				'background-position': playerFrameInfo.x + 'px ' + playerFrameInfo.y + 'px',
				'transform-origin': '50% 50%',
				transform: 'scaleX(1)'
			});
		}
		else {
			//Must flip image when facing left
			$('#player').css({
				left: (p.x-screenOriginX+playerDivOffsetX)+'px',
				top: (p.y-screenOriginY+playerDivOffsetY)+'px',
				'background-position': playerFrameInfo.x + 'px ' + playerFrameInfo.y + 'px',
				'transform-origin': '50% 50%',
				transform: 'scaleX(-1)'
			});
		}
		//Platforms
		for(var i=0;i<currentLevel.tiles.length;++i){
			var tile = currentLevel.tiles[i];
			if (tile.type==platform){
				$('#tile_'+i).css({
					left: (tile.x-screenOriginX+(-(platformWidth-tile.width)/2))+'px',
					top: (tile.y-screenOriginY+platformDivOffsetY)+'px',
					display: (((tile.color==currentColor)&&(tileVisible(tile)))?'block':'none')
				});
				/*
				var op = parseFloat($('#tile_'+i).css('opacity'));
				var orig = op;
				if (p.color==tile.color){
					op = Math.min(1,op+opacityTransitionPerFrame);
				} else {
					if (p.color==((tile.color+1)%colorCount)){
						op = Math.max(0,op-opacityTransitionPerFrame);
					} else {
						op = 0;
						$('#tile_'+i).css({
							display: 'none'
						});
					}
				}
				if (orig!=op){
					$('#tile_'+i).css('opacity',op);
				}
				*/
			} else {
				$('#tile_'+i).css({
					left: (tile.x-screenOriginX+(-(portalWidth-tile.width)/2))+'px',
					top: (tile.y-screenOriginY-portalHeight)+'px',
					display: ((tileVisible(tile))?'block':'none')
				});
			}
		}
		//Enemies
		for (var i=0;i<currentLevel.enemies.length;++i){
			var enemy = currentLevel.enemies[i];
			enemy.vel = [0,0];
			$('#enemy_'+i).css({
					left: (enemy.x-screenOriginX+enemyDivOffsetX)+'px',
					top: (enemy.y-screenOriginY+enemyDivOffsetY)+'px',
					display: (((enemy.color==currentColor)&&(tileVisible(enemy)))?'block':'none'),
					'background-position': enemyFrameInfo.x + 'px ' + enemyFrameInfo.y + 'px'
				});
		}
		//Debug
		//$('#debug').html('<p>'+Math.round(p.x)+', '+Math.round(p.y)+'</p>');
		//End determination
		if ((!p.win)&&(p.dead)&&(deadAnimationHandle == null)){
			//console.log('Dead '+(new Date()).getSeconds());
			gameRunning = false;
			clearInterval(runGameHandle);
			runGameInterval = null;
			if (p.killed){
				$('#player').css('background-image','url("img/sprite/deathSheet.png")');
				currentExplodeFrame = 0;
				explodeAnimationHandle = setInterval(function(){
					if (currentExplodeFrame < playerDeathAnimation.length){
						var playerDeathFrameInfo = getPlayerDeathAnimationFrame(currentExplodeFrame);
						
						$('#player').css( 'background-position', playerDeathFrameInfo.x + 'px ' + playerDeathFrameInfo.y + 'px');
						if (currentExplodeFrame == 5) {
							playerDeath.currentTime = 0;
							playerDeath.play();
						}
						currentExplodeFrame++;
					} else {
						playerDeath.pause();
						clearInterval(explodeAnimationHandle);
						explodeAnimationHandle = null;
					}
				},(deathDelayMS - 60) / (Math.round(fps / 2)));
			}
			deadAnimationHandle = setTimeout(function(){
				++currentTry;
				if (currentTry>=maxTries) {
					//Stop BGM
					backgroundTrack.currentTime = 0;
					backgroundTrack.pause();
					currentTry = 0;
					currentLevelIndex = 0;
					$('#level').hide();
					$('#gameOver').show();
					gameOver.currentTime = 0;
					gameOver.play();
					setTimeout(function(){
						$('#gameOver').hide();
						$('#mainMenu').show();
						mainTheme.currentTime = 0;
						mainTheme.play();
						gameOver.pause();
					},gameOverDelayMS);
				} else {
					loadLevel(currentLevelIndex);
					gameRunning = true;
					runGameHandle = setInterval(runGame,1000/fps);
				}
				deadAnimationHandle = null;
			},deathDelayMS);
		} else if ((!p.dead)&&(p.win)&&(winAnimationHandle == null)){
			//console.log('Win '+(new Date()).getSeconds());
			gameRunning = false;
			clearInterval(runGameHandle);
			runGameInterval = null;
			winAnimationHandle = setTimeout(function(){
				if (currentLevelIndex<levels.length-1){
					//Stop BGM
					backgroundTrack.currentTime = 0;
					backgroundTrack.pause();
					++currentLevelIndex;
					$('#level').hide();
					$('#levelNumber').html(currentLevelIndex+1);
					$('#mainMenu').hide();
					mainTheme.pause();
					$('#transition').show();
					setTimeout(function(){
						$('#transition').hide();
						loadLevel(currentLevelIndex);
						gameRunning = true;
						runGameHandle = setInterval(runGame,1000/fps);
						backgroundTrack.play();
					},transitionScreenDelayMS);
				} else {
					//Stop BGM
					backgroundTrack.currentTime = 0;
					backgroundTrack.pause();
					currentTry = 0;
					currentLevelIndex = 0;
					$('#level').hide();
					$('#youWin').show();
					setTimeout(function(){
						$('#youWin').hide();
						$('#mainMenu').show();
						mainTheme.currentTime = 0;
						mainTheme.play();
					},youWinDelayMS);
				}
				winAnimationHandle = null;
			},winDelayMS);
		}
	}else{	
		clearInterval(runGameHandle);
		runGameInterval = null;
	}
}

function startGame(){
	if (!gameRunning){
		currentTry = 0;
		currentLevelIndex = 0;
		$('#levelNumber').html(currentLevelIndex+1);
		$('#mainMenu').hide();
		mainTheme.pause();
		$('#transition').show();
		setTimeout(function(){
			$('#transition').hide();
			loadLevel(currentLevelIndex);
			gameRunning = true;
			runGameHandle = setInterval(runGame,1000/fps);
			backgroundTrack.play();
		},transitionScreenDelayMS);
	}
}

function shuffle(array) {
	var currentIndex = array.length
	var temporaryValue;
	var randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

$(function(){
	var credits = ['Kostadin Vodenicharov - Dev', 'Neven Iliev - Dev', 'Todor Imreorov -  Graphics' , 'Ilko Birov - Music', 'Jordan Panov - Concept Level Design'];
	shuffle(credits);
	var logstr = 'Credits\n-------\n';
	for (var i=0;i<credits.length;++i){
		$('#creditsNames').append('<p>'+credits[i]+'</p>');
		logstr+=credits[i]+'\n';
	}
	console.log(logstr);
	$('#btnPlay').click(startGame);
	$('#credits').click(function(){
		$('#credits').hide();
		$('#mainMenu').show();
		mainTheme.currentTime = 0;
		mainTheme.play();
	});
	$('#btnCredits').click(function(){
		$('#mainMenu').hide();
		mainTheme.pause();
		$('#credits').show();
	});
	$('body').on('keydown',function(e){
		var code = e.keyCode;
		if (code == 37) {
			leftPressed = true;
		} else if (code == 38) {
			upPressed = true;
		} else if (code == 39) {
			rightPressed = true;
		}
		//M for muting
		if (e.which == 77 || e.which == 109) {
			muteSound = !muteSound;
			backgroundTrack.muted = muteSound;
			wilhelm.muted = muteSound;
			gameOver.muted = muteSound;
			playerDeath.muted = muteSound;
			mainTheme.muted = muteSound;
		}
	});
	setTimeout(function(){
		$('body').on('keyup',function(e){
			var code = e.keyCode;
			if (gameRunning){
				if (code == 32) {
					currentColor = (++currentColor)%colorCount;
					currentColorCSS = colors[currentColor];
				}
			}
			if (code == 37) {
				leftPressed = false;
			} else if (code == 38) {
				upPressed = false;
			} else if (code == 39) {
				rightPressed = false;
			} else if ((code == 13)&&($('#mainMenu').css('display')=='block')) {
				startGame();
			}
		});
	},100);
});