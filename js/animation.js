function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			//8 frames
			frame = frame % 8;
			var offset = {
				x: playerRunAnimation[frame].xHelmet,
				y: playerRunAnimation[frame].yHelmet,
				src: playerRunAnimation[frame].src
				};
			break;
			}
		case "idle": {
			//4 frames
			frame = frame % 4;
			var offset = {
				x: playerIdleAnimation[frame].xHelmet,
				y: playerIdleAnimation[frame].yHelmet,
				src: playerIdleAnimation[frame].src
				};
			break;
			}
		case "jump": {
			//1 frame
			var offset = {
				x: playerJumpAnimation.xHelmet,
				y: playerJumpAnimation.yHelmet,
				src: playerJumpAnimation.src
				};
			break;
			}
		case "fall": {
			//2 frames
			frame = frame % 2;
			var offset = {
				x: playerFallAnimation[frame].xHelmet,
				y: playerFallAnimation[frame].yHelmet,
				src: playerFallAnimation[frame].src
				};
			break;
			}
		default: {
			var offset = {
				x: 0,
				y: 0,
				src: ""
				};
			break;
			}
	}
	
	
	return offset;
	
}