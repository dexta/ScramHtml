enemyObj = function(ctx,start,x,y,h,w,conf) {
	for(c in conf) { this[c] = conf[c];}
	this.canvas = ctx;
	this.start = start;
	this.X = x;
	this.Y = y;
	this.height = h;
	this.width = w;
	// some defaults
	this.scorePoints = 100;
	this.ePoints = [];
	this.firstExplode = true;
	this.explodeLength = 42;
	this.explodeCount = 0;
	this.explodeStart = false;
	this.explodeEnd = false;
	this.nextSector = function() {
		if(!this.explodeStart) {
			this.X -= 100;
		}else{ 
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].x0 -= 100;
				}
			}
		if(this.X < -100 || this.X > this.width*1.5 || this.Y < -50 || this.Y > this.height*1.5) this.explodeEnd = true;
	}
	this.collision = function() {
		return [[this.X,this.Y]];
		}
	this.collisionCheck = function(cPoints) { 
		return false;
		}
}


enemyMissile = function(canvas,start,x,y,h,w,conf) {
	this.constructor(canvas,start,x,y,h,w,conf);
	this.onFly = false;
	
	
	this.update = function(t) {
		//this.X -= 1;
		return [this.X,this.Y];
		}
	
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	
	this.collision = function() {
		return "over written";
		}
	this.getPolygon = function() {
		var poly = [];
		var tTri = [];var x3,y3;
		poly.push([[this.X-7,this.Y],[this.X,this.Y-30],[this.X,this.Y]]);
		poly.push([[this.X,this.Y-30],[this.X+7,this.Y],[this.X,this.Y]]);
		return poly;
		}
		
	this.cast = function() {
		ctx.fillStyle = "rgb(200,190,190)";
		ctx.strokeStyle = "rgb(20,190,190)";
		ctx.beginPath();
		ctx.moveTo(this.X,this.Y-30);
		ctx.lineTo(this.X-7,this.Y-1)
		ctx.lineTo(this.X,this.Y-5)
		ctx.lineTo(this.X+7,this.Y-1)
		ctx.lineTo(this.X,this.Y-30)
		ctx.fill();
		ctx.stroke();
		}
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
			ctx.fillStyle = "rgb(255,150,150)";
			ctx.strokeStyle = "rgb(250,150,150)";
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].update(t);
				ctx.beginPath();
				ctx.moveTo(this.ePoints[a].x0+(-1*this.ePoints[a].vx0),this.ePoints[a].y0+(-1*this.ePoints[a].vy0));
				ctx.lineTo(this.ePoints[a].x0,this.ePoints[a].y0);
				ctx.fill();
				ctx.stroke();
				//console.log("expl. point"+a+" kord "+this.ePoints[a].x0+" - "+this.ePoints[a].y0);
				}
			this.explodeCount++;
			} else {
			var rad = 2*Math.PI/36; //10 elements
			var radius = 2;
			var rStart = Math.floor(Math.random()*65536)%7;
			for(var a=17+rStart;a<29+rStart;a+=3) {
				var x = this.X+radius*Math.cos(rad*a);
				var y = this.Y+radius*Math.sin(rad*a);
				var xx = this.X+.1*Math.cos(rad*a);
				var yy = this.Y+.1*Math.sin(rad*a);
				this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
				}
			this.firstExplode = false;	
			}
		}
		
}

enemyMissile.prototype = new enemyObj();


enemyFuel = function(canvas,start,x,y,h,w,conf) {
	this.constructor(canvas,start,x,y,h,w,conf);
	this.update = function(t) {
		//this.X -= 1;
		return [this.X,this.Y];
		}
	
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	
	this.collision = function() {
		return "over written";
		}
	this.getPolygon = function() {
		var poly = [];
		var tTri = [];var x3,y3;
		poly.push([[this.X-7,this.Y],[this.X,this.Y-30],[this.X,this.Y]]);
		poly.push([[this.X,this.Y-30],[this.X+7,this.Y],[this.X,this.Y]]);
		return poly;
		} // copy from Rocket please change
	
	this.cast = function() {
		ctx.fillStyle = "rgb(100,155,100)";
		ctx.strokeStyle = "rgb(10,125,10)";
		ctx.beginPath();
		ctx.moveTo(this.X-10,this.Y-5);
		ctx.lineTo(this.X-10,this.Y-5);
		ctx.lineTo(this.X-15,this.Y-15);
		ctx.lineTo(this.X-10,this.Y-20);
		ctx.lineTo(this.X-5,this.Y-25);
		ctx.lineTo(this.X+5,this.Y-25);
		ctx.lineTo(this.X+10,this.Y-20);
		ctx.lineTo(this.X+15,this.Y-15);
		ctx.lineTo(this.X+10,this.Y-5);
		ctx.fill();
		ctx.stroke();
		ctx.strokeStyle = "rgb(100,155,100)";
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.moveTo(this.X-15,this.Y);
		ctx.lineTo(this.X-10,this.Y-5);
		ctx.lineTo(this.X+10,this.Y-5);
		ctx.lineTo(this.X+15,this.Y);
		ctx.stroke();
		
		ctx.beginPath();		
		ctx.strokeStyle = "rgb(100,125,100)";
		ctx.lineWidth = 2;
		ctx.moveTo(this.X-3,this.Y-6);
		ctx.lineTo(this.X-3,this.Y-20);
		ctx.lineTo(this.X+5,this.Y-20);
		ctx.moveTo(this.X-3,this.Y-12);
		ctx.lineTo(this.X+2,this.Y-12);	
		ctx.stroke();
		}
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
			ctx.fillStyle = "rgb(255,150,150)";
			ctx.strokeStyle = "rgb(250,150,150)";
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].update(t);
				ctx.beginPath();
				ctx.moveTo(this.ePoints[a].x0+(-1*this.ePoints[a].vx0),this.ePoints[a].y0+(-1*this.ePoints[a].vy0));
				ctx.lineTo(this.ePoints[a].x0,this.ePoints[a].y0);
				ctx.fill();
				ctx.stroke();
				//console.log("expl. point"+a+" kord "+this.ePoints[a].x0+" - "+this.ePoints[a].y0);
				}
			this.explodeCount++;
			} else {
			var rad = 2*Math.PI/36; //10 elements
			var radius = 2;
			var rStart = Math.floor(Math.random()*65536)%7;
			for(var a=17+rStart;a<29+rStart;a+=3) {
				var x = this.X+radius*Math.cos(rad*a);
				var y = this.Y+radius*Math.sin(rad*a);
				var xx = this.X+.1*Math.cos(rad*a);
				var yy = this.Y+.1*Math.sin(rad*a);
				this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
				}
			this.firstExplode = false;	
			}
		}	
}

enemyFuel.prototype = new enemyObj();


enemyAntenna = function(canvas,start,x,y,h,w,conf) {
	this.constructor(canvas,start,x,y,h,w,conf);
	this.update = function(t) {
		//this.X -= 1;
		return [this.X,this.Y];
		}
	
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	
	this.collision = function() {
		return "over written";
		}
	
	
	this.getPolygon = function() {
		var poly = [];
		var tTri = [];var x3,y3;
		poly.push([[this.X-7,this.Y],[this.X,this.Y-30],[this.X,this.Y]]);
		poly.push([[this.X,this.Y-30],[this.X+7,this.Y],[this.X,this.Y]]);
		return poly;
		} // copy from Rocket please change
	
	this.cast = function() {
		ctx.fillStyle = "rgb(184,84,84)";
		ctx.strokeStyle = "rgb(142,42,42)";
		ctx.lineWidth = 4;
		
		ctx.beginPath();
		ctx.moveTo(this.X,this.Y);
		ctx.lineTo(this.X,this.Y-30);
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.X,this.Y-15,11,0,1*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.X,this.Y-23,6,0,1*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.X,this.Y-29,3,0,1*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.lineWidth = 2;
		//ctx.moveTo(this.X-10,this.Y-5);
		//ctx.lineTo(this.X-10,this.Y-5);
		//ctx.lineTo(this.X-15,this.Y-15);
		//ctx.lineTo(this.X-10,this.Y-20);
		//ctx.lineTo(this.X-5,this.Y-25);
		//ctx.lineTo(this.X+5,this.Y-25);
		//ctx.lineTo(this.X+10,this.Y-20);
		//ctx.lineTo(this.X+15,this.Y-15);
		//ctx.lineTo(this.X+10,this.Y-5);
		//ctx.fill();
		//ctx.stroke();
		//ctx.strokeStyle = "rgb(100,155,100)";
		//ctx.beginPath();
		//ctx.lineWidth = 4;
		//ctx.moveTo(this.X-15,this.Y);
		//ctx.lineTo(this.X-10,this.Y-5);
		//ctx.lineTo(this.X+10,this.Y-5);
		//ctx.lineTo(this.X+15,this.Y);
		//ctx.stroke();
		
		//ctx.beginPath();		
		//ctx.strokeStyle = "rgb(100,125,100)";
		//ctx.lineWidth = 2;
		//ctx.moveTo(this.X-3,this.Y-6);
		//ctx.lineTo(this.X-3,this.Y-20);
		//ctx.lineTo(this.X+5,this.Y-20);
		//ctx.moveTo(this.X-3,this.Y-12);
		//ctx.lineTo(this.X+2,this.Y-12);	
		//ctx.stroke();
		}
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
			ctx.fillStyle = "rgb(255,150,150)";
			ctx.strokeStyle = "rgb(250,150,150)";
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].update(t);
				ctx.beginPath();
				ctx.moveTo(this.ePoints[a].x0+(-1*this.ePoints[a].vx0),this.ePoints[a].y0+(-1*this.ePoints[a].vy0));
				ctx.lineTo(this.ePoints[a].x0,this.ePoints[a].y0);
				ctx.fill();
				ctx.stroke();
				//console.log("expl. point"+a+" kord "+this.ePoints[a].x0+" - "+this.ePoints[a].y0);
				}
			this.explodeCount++;
			} else {
			var rad = 2*Math.PI/36; //10 elements
			var radius = 2;
			var rStart = Math.floor(Math.random()*65536)%7;
			for(var a=17+rStart;a<29+rStart;a+=3) {
				var x = this.X+radius*Math.cos(rad*a);
				var y = this.Y+radius*Math.sin(rad*a);
				var xx = this.X+.1*Math.cos(rad*a);
				var yy = this.Y+.1*Math.sin(rad*a);
				this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
				}
			this.firstExplode = false;	
			}
		}
		
	}
		
enemyAntenna.prototype = new enemyObj();

