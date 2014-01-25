function getPlayerAnimationFrame(frame, animation) {
	switch (animation) {
		case "run": {
			//8 frames
			frame = frame % 8;
			var info = {
				xHelmet: playerRunAnimation[frame].xHelmet,
				yHelmet: playerRunAnimation[frame].yHelmet,
				src: playerRunAnimation[frame].src
				};
			break;
			}
		case "idle": {
			//4 frames
			frame = frame % 4;
			var info = {
				xHelmet: playerIdleAnimation[frame].xHelmet,
				yHelmet: playerIdleAnimation[frame].yHelmet,
				src: playerIdleAnimation[frame].src
				};
			break;
			}
		case "jump": {
			//1 frame
			var info = {
				xHelmet: playerJumpAnimation.xHelmet,
				yHelmet: playerJumpAnimation.yHelmet,
				src: playerJumpAnimation.src
				};
			break;
			}
		case "fall": {
			//2 frames
			frame = frame % 2;
			var info = {
				xHelmet: playerFallAnimation[frame].xHelmet,
				yHelmet: playerFallAnimation[frame].yHelmet,
				src: playerFallAnimation[frame].src
				};
			break;
			}
		default: {
			var info = {
				xHelmet: 0,
				yHelmet: 0,
				src: ""
				};
			break;
			}
	}
	
	
	return info;
	
}