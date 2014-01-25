function getSpriteCoords(name) {
	var $st = $spriteXml.find('SubTexture[name="' + name + '"]');
	var $ht = $helmetXml.find('SubTexture[name="' + name + '"]');
	return {
		x: -parseInt($st.attr('x')), 
		y: -parseInt($st.attr('y')),
		xHelmet: -parseInt($ht.attr('x')), 
		yHelmet: -parseInt($ht.attr('y'))
	};
}

function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			//8 frames
			frame = frame % 8;
			var sprite = getSpriteCoords(playerRunAnimation[frame].name);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "idle": {
			//4 frames
			frame = frame % 8;
			var sprite = getSpriteCoords(playerIdleAnimation[frame].name);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "jump": {
			//1 frame
			var sprite = getSpriteCoords(playerJumpAnimation.name);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "fall": {
			//2 frames
			frame = frame % 2;
			var sprite = getSpriteCoords(playerFallAnimation[frame].name);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		default: {
			var info = {
				x: 0,
				y: 0,
				xHelmet: 0,
				yHelmet: 0
				};
			break;
			}
	}
	
	
	return info;
	
}