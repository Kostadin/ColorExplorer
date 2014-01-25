function getSpriteCoords(name) {
	var $st = $spriteXml.find('SubTexture[name="' + name + '"]');
	return {x: "-" + $st.attr('x'), y: "-" + $st.attr('y')};
}

function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			//8 frames
			frame = frame % 8;
			var sprite = getSpriteCoords(playerRunAnimation[frame].name);
			var info = {
				xHelmet: playerRunAnimation[frame].xHelmet,
				yHelmet: playerRunAnimation[frame].yHelmet,
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		case "idle": {
			//4 frames
			frame = frame % 4;
			var sprite = getSpriteCoords(playerIdleAnimation[frame].name);
			var info = {
				xHelmet: playerIdleAnimation[frame].xHelmet,
				yHelmet: playerIdleAnimation[frame].yHelmet,
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		case "jump": {
			//1 frame
			var sprite = getSpriteCoords(playerJumpAnimation.name);
			var info = {
				xHelmet: playerJumpAnimation.xHelmet,
				yHelmet: playerJumpAnimation.yHelmet,
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		case "fall": {
			//2 frames
			frame = frame % 2;
			var sprite = getSpriteCoords(playerFallAnimation[frame].name);
			var info = {
				xHelmet: playerFallAnimation[frame].xHelmet,
				yHelmet: playerFallAnimation[frame].yHelmet,
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		default: {
			var info = {
				xHelmet: 0,
				yHelmet: 0,
				x: 0,
				y: 0
				};
			break;
			}
	}
	
	
	return info;
	
}