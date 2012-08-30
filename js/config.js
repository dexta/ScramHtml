// make a extern big config file to slim out the objects 
// set the basic values 

configMountain = {
	objTyp: "mountain",
	collisionTyp: "get",
	layer: 1,
	lastTick: 0
}

configStarField = {
	objTyp: "starfield",
	collisionTyp: "none",
	layer: 0,
	lastTick: 0
}

configSpaceCraft = {
	objTyp: "ship",
	collisionTyp: "check",
	layer: 3,
	lastTick: 0
}

configBullets = {
	objTyp: "bullet",
	collisionTyp: "check",
	layer: 2,
	lastTick: 0,
	firstExplode: true,
	explodeLength: 42,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

configEnemy = {
	objTyp: "enemy",
	collisionTyp: "get",
	layer: 2,
	lastTick: 0,	
	scorePoints:150,
	fuelPoints:0,
	hitPoints:1,
	ePoints: [],
	firstExplode: true,
	explodeLength: 42,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

configFuel = {
	objTyp: "enemy",
	collisionTyp: "get",	
	layer: 2,
	lastTick: 0,
	scorePoints:50,
	fuelPoints:400,
	hitPoints:1,
	ePoints: [],
	firstExplode: true,
	explodeLength: 84,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

configAntenna = {
	objTyp: "enemy",
	collisionTyp: "get",	
	layer: 2,
	lastTick: 0,
	scorePoints:75,
	fuelPoints:2,
	hitPoints:1,
	ePoints: [],
	firstExplode: true,
	explodeLength: 23,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

window.requestAnimFrame = (function()
{
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback, /* DOMElement */ element)
            {
                window.setTimeout(callback, 1000 / 60); // 16 ms = ~60 fps
            };
})();
