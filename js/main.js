var runGameHandle = null;

function loadLevel(id){
	currentLevel = jQuery.extend(true, {}, levels[0]);//Deep copy
	currentColor = colors[currentLevel.startingColor];
	$('#level').html('');
	var p = currentLevel.player;
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
		//Read player input
		//Process world
		//Display
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
		}
	});
	$('body').on('keypress',function(evt){
		
	});
});