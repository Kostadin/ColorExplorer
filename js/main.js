var runGameHandle = null;

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
	if (((screenOriginX<=tile.x)&&(tile.x<screenOriginX+screenWidth))||((screenOriginX<=tile.x+tile.width)&&(tile.x+tile.width<screenOriginX+screenWidth))||
		((screenOriginY<=tile.y)&&(tile.y<screenOriginY+screenHeight))||((screenOriginY<=tile.y+tile.height)&&(tile.y+tile.height<screenOriginY+screenHeight)))
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
	setScreenOrigin(currentLevel);
	$('#level').html('');
	var player = '<div id="player" style="left:'+(p.x-screenOriginX)+'px;top:'+(p.y-screenOriginY)+'px;"/>';
	var helmet = '<div id="helmet" style="left:'+(p.x-screenOriginX)+'px;top:'+(p.y-screenOriginY)+'px;background-color:'+colors[p.color]+';"/>';
	var tiles = '';
	for(var i=0;i<currentLevel.tiles.length;++i){
		var tile = currentLevel.tiles[i];
		if (tile.type==platform){
			tiles += '<div id="tile_'+i+'" class="tile" style="left:'+(tile.x-screenOriginX)+'px;top:'+(tile.y-screenOriginY)+'px;width:'+tile.width+'px;height:'+tile.height+'px;background-color:'+colors[tile.color]+';'+(((p.color!=tile.color)||!tileVisible(tile))?'display:none;':'')+'"/>';
		} else {
			tiles += '<div id="tile_'+i+'" class="tile portal" style="left:'+(tile.x-screenOriginX)+'px;top:'+(tile.y-screenOriginY-portalHeight)+'px;width:'+tile.width+'px;height:'+portalHeight+'px;background-color:white;'+((!tileVisible(tile))?'display:none;':'')+'"/>';
		}
	}
	$('#level').append(player);
	$('#level').append(helmet);
	$('#level').append(tiles);
	$('#level').css({
		display: 'block'
	});
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
			
		var playerFrameInfo = getPlayerAnimationFrame(animationFrame, animationType);
		//var playerFrameInfo = getPlayerAnimationFrame(0, animationType);

		setScreenOrigin(currentLevel);
		
		$('#level').css({
			'background-position': -screenOriginX + 'px ' + '0px',
			'transform-origin': '50% 50%',
			transform: 'scaleX(1)'
		});
			
		//Display
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
		
		$('#helmet').css({
			left: (p.x-screenOriginX + playerFrameInfo.xHelmet)+'px',
			top: (p.y-screenOriginY + playerFrameInfo.yHelmet)+'px'
			});
		for(var i=0;i<currentLevel.tiles.length;++i){
			var tile = currentLevel.tiles[i];
			if (tile.type==platform){
				$('#tile_'+i).css({
					left: (tile.x-screenOriginX)+'px',
					top: (tile.y-screenOriginY)+'px',
					display: (((tile.color==currentColor)&&(tileVisible(tile)))?'block':'none')
				});
			} else {
				$('#tile_'+i).css({
					left: (tile.x-screenOriginX)+'px',
					top: (tile.y-screenOriginY-portalHeight)+'px',
					display: ((tileVisible(tile))?'block':'none')
				});
			}
		}
		//Debug
		$('#debug').html('<p>'+Math.round(p.x)+', '+Math.round(p.y)+'</p>');
		//End determination
		if ((!p.win)&&(p.dead)&&(deadAnimationHandle == null)){
			deadAnimationHandle = setTimeout(function(){
				++currentTry;
				if (currentTry>=maxTries) {
					gameRunning = false;
					clearInterval(runGameHandle);
					runGameInterval = null;
					alert('Game over.');
					currentTry = 0;
					$('#level').hide();
					$('#mainMenu').show();
				} else {
					loadLevel(currentLevelIndex);
				}
				deadAnimationHandle = null;
			},1000);
		} else if ((!p.dead)&&(p.win)&&(winAnimationHandle == null)){
			winAnimationHandle = setTimeout(function(){
				if (currentLevelIndex<levels.length-1){
					++currentLevelIndex;
					winAnimationHandle = null;
					loadLevel(currentLevelIndex);
				} else {
					gameRunning = false;
					clearInterval(runGameHandle);
					runGameInterval = null;
					alert('You win.');
					currentTry = 0;
					$('#level').hide();
					$('#mainMenu').show();
				}
			},1000);
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
		loadLevel(currentLevelIndex);
		$('#mainMenu').hide();
		gameRunning = true;
		runGameHandle = setInterval(runGame,1000/fps);
		//backgroundTrack.play();
	}
}

$(function(){
	$('#btnPlay').click(startGame);
	$('body').on('keydown',function(e){
		var code = e.keyCode;
		if (gameRunning){
			if (code == 32) {
				currentColor = (++currentColor)%colorCount;
				currentColorCSS = colors[currentColor];
			}
		}
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
		}
	});
	$('body').on('keyup',function(e){
		var code = e.keyCode;
		if (code == 37) {
			leftPressed = false;
		} else if (code == 38) {
			upPressed = false;
		} else if (code == 39) {
			rightPressed = false;
		} else if (code == 13) {
			startGame();
		}
	});

});