function draw() {
	if(lockDraw) return;
	lockDraw = true;
	now=new Date;
	thisFrame = 1000 / (now-lastUpdate);
	fps += (thisFrame - fps) / fpsFilter;
	lastUpdate = now;
	clearCTX();
	myShip.movement(keys)
	if(myShip.getFire()) { 
		console.log("fire true"+tick);
		addObject(2,"fBullet",new friendLaser(ctx,tick,myShip.X,myShip.Y));
		addObject(2,"fBullet",new friendMissile(ctx,tick,myShip.X-5,myShip.Y+5));
		}
	for(var a=0;a<allObj.length;a++) {
		if(allObj[a].length == 0) continue;
		for(var ia=0;ia<allObj[a].length;ia++) {
			allObj[a][ia].update(tick);
			if(allObj[a][ia].explodeEnd || false) allObj[a].splice(ia,1);
			}
		}
	for(var cco=0;cco<collisionCheckObjects.length;cco++) {
		for(var co=0;co<collisionObjects.length;co++) {
			if(collisionCheckObjects[cco] === myShip) continue;
			if(collisionCheckObjects[cco] === "undefind") collisionCheckObjects.splice(cco,1);
			if(collisionObjects[co].collisionCheck(collisionCheckObjects[cco].collision())) {
				collisionCheckObjects[cco].explodeStart = true;
				collisionCheckObjects.splice(cco,1);
				
				}
			} // end collisionObjects
		} // end collisionCheckObjects
	for(var a=0;a<allObj.length;a++) {
		if(allObj[a].length == 0) continue;
		for(var ia=0;ia<allObj[a].length;ia++) {
			allObj[a][ia].draw(tick);
			}
		}
	//ctx.translate(-1,0);
	tick++;
	if(tick%100 == 0) {
		//console.log("switsch "+tick);
		ctx.translate(100,0);
		for(var a=0;a<allObj.length;a++) {
			for(var ia=0;ia<allObj[a].length;ia++) {
				allObj[a][ia].nextSector();
				
				}
			}
		$("#landscape").html(""+objByTyp.mountain[0].line);
		add_enemy();
		}
	lockDraw = false;		
	$("#score").html(tick);
	$("#fps").html(""+roto(fps,4));
	draw_time();
}
