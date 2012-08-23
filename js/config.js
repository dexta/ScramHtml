// make a extern big config file to slim out the objects 
// set the basic values 

configMountain = {
	objTyp: "mountain",
	layer: 1
}

configStarField = {
	objTyp: "starfield",
	layer: 0
}

configSpaceCraft = {
	objTyp: "ship",
	layer: 3
}

configBullets = {
	objTyp: "bullet",
	layer: 2,
	firstExplode: true,
	explodeLength: 42,
	explodeCount: 0,
	explodeStart: false,
	explodeEnd: false
}

configEnemy = {
	objTyp: "enemy",
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
