function getSpriteCoords(name) {
	var $st = $spriteXml.find('SubTexture[name="' + name + '"]');
	return {x: -parseInt($st.attr('x')), y: -parseInt($st.attr('y'))};
}

function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			//8 frames
			frame = frame % 8;
			var sprite = getSpriteCoords(playerRunAnimation[frame].name);
			var info = {
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
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		case "jump": {
			//1 frame
			var sprite = getSpriteCoords(playerJumpAnimation.name);
			var info = {
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
				x: sprite.x,
				y: sprite.y
				};
			break;
			}
		default: {
			var info = {
				x: 0,
				y: 0
				};
			break;
			}
	}
	
	
	return info;
	
}