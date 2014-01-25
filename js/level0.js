levels[0]={
	width:4096,
	height:600,
	player: {
		x:0,
		y:-10,
		width:64,
		height:80,
		color:0
	},
	tiles:[{
		type: platform,
		x:0,
		y:100,
		width:128,
		height:18,
		color:0,
		texture:'img/brick0.jpg'
	},{
		type: platform,
		x:128,
		y:200,
		width:128,
		height:18,
		color:1,
		texture:'img/brick0.jpg'
	},{
		type: platform,
		x:256,
		y:300,
		width:128,
		height:18,
		color:2,
		texture:'img/brick0.jpg'
	},{
		type: platform,
		x:384,
		y:400,
		width:128,
		height:18,
		color:3,
		texture:'img/brick0.jpg'
	},{
		type: platform,
		x:512,
		y:500,
		width:128,
		height:18,
		color:0,
		texture:'img/brick0.jpg'
	},{
		type: portal,
		x: 512,
		y: 499,
		width: 128,
		height: 2,
		color:0,
		texture:'img/exit.png'
	}],
	enemies: [{
		x:40,
		y:500,
		width: 50,
		height: 50,
		color:0
	},{
		x:90,
		y:200,
		width: 50,
		height: 50,
		color:2
	},{
		x:100,
		y:300,
		width: 50,
		height: 50,
		color:2
	},{
		x:600,
		y:400,
		width: 50,
		height: 50,
		color:3
	},{
		x:400,
		y:50,
		width: 50,
		height: 50,
		color:1
	}]
};