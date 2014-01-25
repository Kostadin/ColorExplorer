var runGameHandle = null;

function loadLevel(id){
	currentLevel = jQuery.extend(true, {}, levels[0]);//Deep copy
	var p = currentLevel.player;
	currentColor = p.color;
	$('#level').html('');
	
	var player = '<div id="player" style="left:'+p.x+'px;top:'+p.y+'px;background-color:'+colors[p.color]+';"/>';
	var tiles = '';
	for(var i=0;i<currentLevel.tiles.length;++i){
		var tile = currentLevel.tiles[i];
		tiles += '<div id="tile_'+i+'" class="tile" style="left:'+tile.x+'px;top:'+tile.y+'px;width:'+tile.width+'px;height:'+tile.height+'px;background-color:'+colors[tile.color]+';'+((p.color!=tile.color)?'display:none;':'')+'"/>';
	}
	$('#level').append(player);
	$('#level').append(tiles);
}

function runGame(){
	if(gameRunning){
		var p = currentLevel.player;
		//Read player input
		if (rightPressed){
			p.x += 10;
		} else if (leftPressed){
			p.x -= 10;
		}
		//Process world
		
		p.color = currentColor;
		//Display
		$('#player').css({
			left: p.x,
			top: p.y
		});
		for(var i=0;i<currentLevel.tiles.length;++i){
			var tile = currentLevel.tiles[i];
			$('#tile_'+i).css({
				left: tile.x+'px',
				top: tile.y+'px',
				display: ((tile.color==currentColor)?'block':'none')
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
			backgroundTrack.play();
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
			playSound = !playSound;
			backgroundTrack.muted = playSound;
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