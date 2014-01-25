var gravityPerSec = 100;
var gravity = [0,gravityPerSec/fps];
var maxDropSpeedPerSec = 1000;
var maxDropSpeed = maxDropSpeedPerSec/fps;
var maxSideSpeedPerSec = 256;
var maxSideSpeed = maxSideSpeedPerSec/fps;
var maxJumpSpeedPerSec = -1000;
var maxJumpSpeed = maxJumpSpeedPerSec/fps;
var initialJumpSpeed = -1000/fps;

function addVectors(a,b){
	return [a[0]+b[0],a[1]+b[1]]
}

function collision(p,t){
	var points = [[p.x,p.y],[p.x+p.width,p.y],[p.x,p.y+p.height],[p.x+p.width,p.y+p.height],
				  [t.x,t.y],[t.x+t.width,t.y],[t.x,t.y+t.height],[t.x+t.width,t.y+t.height]];
	var bounds = [[t.x,t.x+t.width,t.y,t.y+t.height],[p.x,p.x+p.width,p.y,p.y+p.height]];
	for(var i=0;i<points.length;++i){
		var point = points[i];
		var bound = bounds[Math.floor(i/4)];
		if ((bound[0]<=point[0])&&(point[0]<bound[1])&&(bound[2]<point[1])&&(point[1]<bound[3])){
			return true;
		}
	}
	return false;
}

function runPhysics(){
	var p = currentLevel.player;
	p.canJump = false;
	//Cap the velocity
	if (p.vel[0]>maxSideSpeed){
		p.vel[0] = maxSideSpeed;
	} else if (p.vel[0]<-maxSideSpeed){
		p.vel[0] = -maxSideSpeed;
	}
	if (p.vel[1]>maxDropSpeed){
		p.vel[1] = maxDropSpeed;
	} else if (p.vel[1]<maxJumpSpeed){
		p.vel[1] = maxJumpSpeed;
	}
	var startVel = [p.vel[0],p.vel[1]];
	var startPos = {
		x: p.x,
		y: p.y,
		width: p.width,
		height: p.height
	};
	var maxDim = Math.max(Math.abs(p.vel[0]),Math.abs(p.vel[1]));
	var stepVel= [p.vel[0]/maxDim,p.vel[1]/maxDim];
	var currPos = [p.x,p.y];
	var currVel = [p.vel[0],p.vel[1]];
	for(var step=0;step<maxDim;++step){
		var hTouch = false;
		var vTouch = false;
		var stepStartPos = [currPos[0],currPos[1]];
		var hVel = [stepVel[0],0];
		var vVel = [0,stepVel[0]];
		currPos = addVectors(currPos,stepVel);
		for (var i=0;i<currentLevel.tiles.length;++i){
			var tile = currentLevel.tiles[i];
			if (tile.type==platform){
				var option = 0;
				while (collision({x:currPos[0],y:currPos[1],width:p.width,height:p.height},tile)){
					if (option == 0){
						currPos[1] -= stepVel[1];
						vTouch = true;
					} else if (option == 1) {
						currPos[1] += stepVel[1];
						currPos[0] -= stepVel[0];
						vTouch = false;
						hTouch = true;
					} else if (option == 2) {
						currPos[1] -= stepVel[1];
						vTouch = true;
						hTouch = true;
					}
					if (option < 3) {
						option++;
					} else{
						break;
					}
				}
				if (hTouch){
					stepVel[0] = 0;
					p.vel[0] = 0;
				}
				if (vTouch){
					stepVel[1] = 0;
					p.vel[1] = 0;
					p.canJump = true;
				}
			}
		}
		p.x = currPos[0];
		p.y = currPos[1];
	}
}