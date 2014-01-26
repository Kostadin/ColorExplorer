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

function getEnemySpriteCoords(name) {
	var $st = $enemyXml.find('SubTexture[name="' + name + '"]');
	return {
		x: -parseInt($st.attr('x')), 
		y: -parseInt($st.attr('y'))
	};
}

function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			frame = frame % playerRunAnimation.length;
			var sprite = getSpriteCoords(playerRunAnimation[frame]);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "idle": {
			frame = frame % playerIdleAnimation.length;
			var sprite = getSpriteCoords(playerIdleAnimation[frame]);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "jump": {
			frame = frame % playerJumpAnimation.length;
			var sprite = getSpriteCoords(playerJumpAnimation[frame]);
			var info = {
				x: sprite.x,
				y: sprite.y,
				xHelmet: sprite.xHelmet,
				yHelmet: sprite.yHelmet
				};
			break;
			}
		case "fall": {
			frame = frame % playerFallAnimation.length;
			var sprite = getSpriteCoords(playerFallAnimation[frame]);
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

function getEnemyAnimationFrame (frame) {
	frame = frame % enemyAnimation.length;
	var sprite = getEnemySpriteCoords(enemyAnimation[frame]);
	var info = {
		x: sprite.x,
		y: sprite.y
		};
}