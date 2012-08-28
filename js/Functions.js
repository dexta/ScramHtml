function draw() {
	if(lockDraw) return;
	lockDraw = true;
	now=new Date;
	thisFrame = 1000 / (now-lastUpdate);
	fps += (thisFrame - fps) / fpsFilter;
	lastUpdate = now;
	drawLayer = [[],[],[],[],[],[]];
	collisionCheckObjects = [];
	collisionObjects = [];
	if(tick%100 == 0) { 	add_enemy(objByTyp.mountain.sectorLength); 		$("#landscape").html(""+objByTyp.mountain.line); }
	for(var a=0;a<allObj.length;a++) {
		allObj[a].update(tick);
		drawLayer[allObj[a].layer].push(allObj[a]);
		if(allObj[a].explodeEnd || false) { allObj.splice(a,1); continue; }
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

	for(var cco=0;cco<collisionCheckObjects.length;cco++) {
		//if(collisionCheckObjects[cco].objTyp == "ship") continue;
		for(var co=0;co<collisionObjects.length;co++) {
			if(collisionObjects[co].collisionCheck(collisionCheckObjects[cco].collision(),collisionCheckObjects[cco].objTyp)) {
				collisionCheckObjects[cco].explodeStart = true;
				if(collisionObjects[co].objTyp == "enemy") collisionObjects[co].explodeStart = true;
				}
			} // end collisionObjects
		} // end collisionCheckObjects

	tick++;
	
	if(tick%100 == 0) {
		//console.log("switsch "+tick);
		
		//for(var a=0;a<allObj.length;a++) {
				//allObj[a].nextSector();		
		//	}

		//add_enemy(objByTyp.mountain.sectorLength);
		}
	
	lockDraw = false;		
	$("#score").html(tick);
	$("#fps").html(""+roto(fps,4));
	draw_time();
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
