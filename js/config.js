// make a extern big config file to slim out the objects 
// set the basic values 

configMountain = {
	objTyp: "mountain",
	collisionTyp: "get",
	layer: 1
}

configStarField = {
	objTyp: "starfield",
	collisionTyp: "none",
	layer: 0
}

configSpaceCraft = {
	objTyp: "ship",
	collisionTyp: "check",
	layer: 3
}

configBullets = {
	objTyp: "bullet",
	collisionTyp: "check",
	layer: 2,
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
	scorePoints:100,
	ePoints: [],
	firstExplode: true,
	explodeLength: 64,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

configFuel = {
	objTyp: "enemy",
	collisionTyp: "get",	
	layer: 2,
	scorePoints:100,
	fuelPoints:1,
	ePoints: [],
	firstExplode: true,
	explodeLength: 84,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}
