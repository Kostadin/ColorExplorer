function helmetOffset(frame, animation) {
	switch (animation) {
		case "run": {
			var offset = {
				x: playerRunAnimation[frame].xHelmet,
				y: playerRunAnimation[frame].yHelmet
				};
			break;
			}
		case "idle": {
			var offset = {
				x: playerIdleAnimation[frame].xHelmet,
				y: playerIdleAnimation[frame].yHelmet
				};
			break;
			}
		default: {
			var offset = {
				x: 0,
				y: 0
				};
			break;
			}
	}
	
	
	return offset;
	
}