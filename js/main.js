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
	currentLevel = jQuery.extend(true, {}, levels[0]);//Deep copy
	var p = currentLevel.player;
	currentColor = p.color;
	p.vel = [0,0];
	p.canJump = false;
	setScreenOrigin(currentLevel);
	$('#level').html('');
	var player = '<div id="player" style="left:'+(p.x-screenOriginX)+'px;top:'+(p.y-screenOriginY)+'px;"/>';
	var helmet = '<div id="helmet" style="left:'+(p.x-screenOriginX)+'px;top:'+(p.y-screenOriginY)+'px;background-color:'+colors[p.color]+';"/>';
	var tiles = '';
	for(var i=0;i<currentLevel.tiles.length;++i){
		var tile = currentLevel.tiles[i];
		tiles += '<div id="tile_'+i+'" class="tile" style="left:'+(tile.x-screenOriginX)+'px;top:'+(tile.y-screenOriginY)+'px;width:'+tile.width+'px;height:'+tile.height+'px;background-color:'+colors[tile.color]+';'+(((p.color!=tile.color)||tileVisible(tile))?'display:none;':'')+'"/>';
	}
	$('#level').append(player);
	$('#level').append(helmet);
	$('#level').append(tiles);
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
		} else if (leftPressed){
			p.vel[0] -= maxSideSpeed;
			animationType = "run";
		} else {
			p.vel[0] = 0;
		}
		if ((upPressed)&&(p.canJump)){
			p.vel[1] += initialJumpSpeed;
			alert('I can jump!');
		}
		var playerFrameInfo = getPlayerAnimationFrame(animationFrame, animationType);

		//Process world
		p.color = currentColor;
		p.vel = addVectors(p.vel,gravity);
		runPhysics();
		setScreenOrigin(currentLevel);
		//Display
		$('#player').css({
			left: (p.x-screenOriginX)+'px',
			top: (p.y-screenOriginY)+'px'
		});
		$('#helmet').css({
			left: (p.x-screenOriginX + playerFrameInfo.x)+'px',
			top: (p.y-screenOriginY + playerFrameInfo.y)+'px',
			'background-color': colors[p.color]
		});
		for(var i=0;i<currentLevel.tiles.length;++i){
			var tile = currentLevel.tiles[i];
			$('#tile_'+i).css({
				left: (tile.x-screenOriginX)+'px',
				top: (tile.y-screenOriginY)+'px',
				display: (((tile.color==currentColor)&&(tileVisible(tile)))?'block':'none')
			});
		}
	}else{	
		clearInterval(runGameHandle);
		runGameInterval = null;
	}
}

$(function(){
	$('#btnPlay').click(function(){
		if (!gameRunning){
			loadLevel(0);
			$('#mainMenu').hide();
			gameRunning = true;
			runGameHandle = setInterval(runGame,1000/fps);
			//backgroundTrack.play();
		}
	});
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
		}
	});
});