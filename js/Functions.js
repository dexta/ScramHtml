function draw() {
	if(lockDraw) return;lockDraw = true;
	now=new Date;
	thisFrame = 1000 / (now-lastUpdate);
	fps += (thisFrame - fps) / fpsFilter;
	lastUpdate = now;
 	drawLayer = [[],[],[],[],[],[]];
	collisionCheckObjects = [];
	collisionObjects = [];
	hasColReturn = [];
	if(autoFire) keys.fire = true;
	for(var a=0;a<allObj.length;a++) {
		allObj[a].update(tick);
		drawLayer[allObj[a].layer].push(allObj[a]);
		if(allObj[a].explodeEnd || false) { 
			if(allObj[a].objTyp == "enemy" && allObj[a].explodeStart == false) missEnemy++;
			allObj.splice(a,1); continue; 
			}
		if(allObj[a].objTyp == "ship") { 
			allObj[a].movement(keys)
			if(allObj[a].getFire()) { 
				addObject(new friendLaser(ctx,tick,allObj[a].X,allObj[a].Y,configBullets));
				addObject(new friendMissile(ctx,tick,allObj[a].X-5,allObj[a].Y+5,configBullets));
				}
			collisionCheckObjects.push(allObj[a]);
			}
		if(allObj[a].objTyp == "bullet") {
			if(!allObj[a].explodeStart) collisionCheckObjects.push(allObj[a]);
			}
		if(allObj[a].objTyp == "mountain") collisionObjects.push(allObj[a]);
		if(allObj[a].objTyp == "enemy" && allObj[a].explodeStart == false) collisionObjects.push(allObj[a]);
		
		}
	if(tick%100 == 0) { add_enemy(objByTyp.mountain.sectorLength);}
	for(var cco=0;cco<collisionCheckObjects.length;cco++) {
		//if(collisionCheckObjects[cco].objTyp == "ship") continue;
		for(var co=0;co<collisionObjects.length;co++) {
			if(collisionObjects[co].collisionCheck(collisionCheckObjects[cco].collision(),collisionCheckObjects[cco].objTyp)) {
				collisionCheckObjects[cco].explodeStart = true;
				if(collisionObjects[co].objTyp == "enemy") {
					hasColReturn = collisionObjects[co].hasCollision();
					if(hasColReturn || false) enemyToScore.push(hasColReturn);
					}
				}
			} // end collisionObjects
		} // end collisionCheckObjects
	tick++;
	fuelScore--;
	levelCount++;
	lockDraw = false;
}


function bDraw() {
	if(lockDraw) return;
	lockDraw = true;
	clearCTX();
	for(var a=0;a<drawLayer.length;a++) {
		if(drawLayer[a].length == 0) continue;
		for(var ai=0;ai<drawLayer[a].length;ai++) {
			drawLayer[a][ai].draw(tick);
			}
		}
	
	canvasView.clearRect(0,0,WIDTH,HEIGHT);
	canvasView.drawImage(canvasBuffer,0,0,WIDTH,HEIGHT);
	lockDraw = false;
	}


function hudDraw() {
	if(lockDraw) return;
	if(levelNo>6) gameOver("won");
	if(fuelScore<1) gameOver("fuel");
	if(objByTyp.ship.explodeEnd) gameOver("killed");
	if(keys.autoFire) autoFire = (autoFire)? false:true;
	tmpETS = enemyToScore;
	enemyToScore = [];
	for(var e=0;e<tmpETS.length;e++) {
		scoreCount += tmpETS[e][0][1];
		fuelScore += tmpETS[e][1][1];
		}
	var fuelA = Math.floor(fuelScore/500);
	var viewFuel = "";
	for(var f=0;f<15;f++) { 
		if(fuelA>0) { viewFuel += "*";} else { viewFuel += "_"; };
		fuelA--;
	}
	var lSector = "";
	if(levelNo>1) {  for(ls=1;ls<levelNo;ls++) { lSector += "[**]"; }  }
	if(levelCount < (500*levelNo)/2) { lSector += "[*-]"; } else { lSector += "[**]" }
	for(var ls=levelNo;ls<6;ls++) { lSector += "[--]"; }
	if(levelCount > 500*levelNo) {
		levelNo++;
		levelCount = 0;
		levelUp();
		}
	$("#dmove").html("T:"+tick+" lC:"+levelCount+" lN:"+levelNo+" fuelA:"+fuelScore+" Dings Array : "+tmpETS);
	$("#score").html(Math.floor(tick/10)+scoreCount);
	$("#fps").html(""+roto(fps,4));
	$("#fuel").html(viewFuel);
	$("#level").html(lSector);
	draw_time();
	}


function gameOver(reason) {
	intervalSwitsh();
	
	}


function levelUp() {
	scoreCount -= missEnemy*10;
	fuelScore -= missEnemy*5;
	configEnemy["scorePoints"] += levelNo*20; 
	configFuel["scorePoints"] += levelNo*10; 
	configAntenna["scorePoints"] += levelNo*5; 
	objByTyp.ship.shootLockLength -= 9;
	if(levelNo%2 == 0) {
			configFuel["fuelPoints"] -= 50;
		}

	if(levelNo == 2) {
		objByTyp.mountain.colorFill = "rgb(110,90,180)";
		objByTyp.mountain.colorLines = "rgb(50,50,190)";
		objByTyp.ship.shootLockLength = 50;
		}
		
	if(levelNo == 3) {
		scoreCount -= missEnemy*10;
		fuelScore -= missEnemy*10;

		configAntenna["hitPoints"] += 1;
		objByTyp.mountain.colorFill = "rgb(120,75,150)";
		objByTyp.mountain.colorLines = "rgb(40,40,180)";
		objByTyp.ship.shootLockLength = 37;
		}

	if(levelNo == 4) {
		configFuel["hitPoints"] += 1;
		configEnemy["hitPoints"] += 1;
		objByTyp.mountain.colorFill = "rgb(140,50,80)";
		objByTyp.mountain.colorLines = "rgb(70,30,100)";
		objByTyp.ship.shootLockLength = 28;
		}

	if(levelNo == 5) {
		configAntenna["hitPoints"] += 1;
		objByTyp.mountain.colorFill = "rgb(185,25,25)";
		objByTyp.mountain.colorLines = "rgb(85,15,15)";
		objByTyp.ship.shootLockLength = 25;
		}
		
	if(levelNo == 6) {
		configEnemy["hitPoints"] += 1;
		configFuel["hitPoints"] += 1;
		configAntenna["hitPoints"] += 1;
		objByTyp.mountain.colorFill = "rgba(105,25,25,.5)";
		objByTyp.mountain.colorLines = "rgb(55,5,5)";
		objByTyp.ship.shootLockLength = 19;
		}
	}
