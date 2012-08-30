enemyObj = function(ctx,start,x,y,h,w,conf) {
	for(c in conf) { this[c] = conf[c];}
	this.canvas = ctx;
	this.start = start;
	this.X = x;
	this.Y = y;
	this.height = h;
	this.width = w;
	// some defaults
	this.ePoints = [];
	this.firstExplode = true;
	this.explodeCount = 0;
	this.explodeStart = false;
	this.explodeEnd = false;
	this.nextSector = function() {
		this.X -= 100;
		if(this.explodeStart) {
		for(var a=0;a<this.ePoints.length;a++) {
			this.ePoints[a].x0 -= 100;
			}
		}
		
	}
	this.collision = function() {
		return [[this.X,this.Y]];
		}
	this.collisionCheck = function(cPoints) { 
		return false;
		}
		
	this.explodeInit = function(t,eNo,r,rnd,step) {
		var rad = 2*Math.PI/eNo; //10 elements
			var radius = r;
			var rStart = Math.floor(Math.random()*65536)%rnd;
			for(var a=17+rStart;a<29+rStart;a+=step) {
				var x = this.X+radius*Math.cos(rad*a);
				var y = this.Y+radius*Math.sin(rad*a);
				var xx = this.X+.1*Math.cos(rad*a);
				var yy = this.Y+.1*Math.sin(rad*a);
				this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
				}
		this.firstExplode = false;	
		}
	
	this.explodeDraw = function(t) {
		if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
		this.canvas.fillStyle = "rgb(255,150,150)";
		this.canvas.strokeStyle = "rgb(250,150,150)";
		for(var a=0;a<this.ePoints.length;a++) {
			this.ePoints[a].update(t);
			this.canvas.beginPath();
			this.canvas.moveTo(this.ePoints[a].x0+(-1*this.ePoints[a].vx0),this.ePoints[a].y0+(-1*this.ePoints[a].vy0));
			this.canvas.lineTo(this.ePoints[a].x0,this.ePoints[a].y0);
			this.canvas.fill();
			this.canvas.stroke();
			//console.log("expl. point"+a+" kord "+this.ePoints[a].x0+" - "+this.ePoints[a].y0);
			}
		this.drawPoints();
		this.explodeCount++;
		}
	
	this.update = function(t) {
		this.X -= 1;
		if(this.X < -100 || this.X > this.width*1.5 || this.Y < -50 || this.Y > this.height*1.5) this.explodeEnd = true;
		return [this.X,this.Y];
		}
	
	this.drawPoints = function() {
		// move to global 
		this.canvas.font = ((30-(this.explodeCount/2)))+"px 'optimer'"; 
		this.canvas.strokeStyle = "rgb(250,250,50)";
		this.canvas.strokeText(''+this.scorePoints, this.X, this.Y);
		}
		
	this.hasCollision = function() {
		this.hitPoints--;
		if(this.hitPoints == 0) {
			this.explodeStart = true;
			return [["score",this.scorePoints],["fuel",this.fuelPoints]];
			}
		return false;
		}
}


enemyMissile = function(ctx,start,x,y,h,w,conf) {
	this.constructor(ctx,start,x,y,h,w,conf);
	this.onFly = false;
	
	this.update = function(t) {
		if(this.onFly) this.Y -= 1;
		this.X -= 1;
		if(this.X < -50 || this.X > this.width*1.2 || this.Y < -50 || this.Y > this.height*1.2) this.explodeEnd = true;
		return [this.X,this.Y];
		}
	
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	
	this.cast = function() {
		this.canvas.fillStyle = "rgb(200,190,190)";
		this.canvas.strokeStyle = "rgb(20,190,190)";
		this.canvas.lineWidth = 2;
		this.canvas.beginPath();
		this.canvas.moveTo(this.X,this.Y-30);
		this.canvas.lineTo(this.X-7,this.Y-1)
		this.canvas.lineTo(this.X,this.Y-5)
		this.canvas.lineTo(this.X+7,this.Y-1)
		this.canvas.lineTo(this.X,this.Y-30)
		this.canvas.fill();
		this.canvas.stroke();
		}
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			this.explodeDraw(t);
			} else {
			this.explodeInit(t,36,2,7,3); // time, elements, radius, random +/-,steps between elements
			}
		}
		
	this.boxTest = function(points,typOf) {
		if(typOf == "ship" && points[0]>this.X-100) this.onFly = true;
		if(points[0]>this.X-7 && points[1]>this.Y-30) {
			if(points[0]<this.X+7 && points[1]<this.Y) {
				return true;
				}
			}
		return false;
		}	
		
	this.collisionCheck = function(cPoints,typOf) { 
		for(var c=0;c<cPoints.length;c++) {
			if(this.boxTest(cPoints[c],typOf)) return true;
			}
		return false;	
		}
}

enemyMissile.prototype = new enemyObj();


enemyFuel = function(ctx,start,x,y,h,w,conf) {
	this.constructor(ctx,start,x,y,h,w,conf);
	
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
		this.canvas.fillStyle = "rgb(100,155,100)";
		this.canvas.strokeStyle = "rgb(10,125,10)";
		this.canvas.lineWidth = 2;
		this.canvas.beginPath();
		this.canvas.moveTo(this.X-10,this.Y-5);
		this.canvas.lineTo(this.X-10,this.Y-5);
		this.canvas.lineTo(this.X-15,this.Y-15);
		this.canvas.lineTo(this.X-10,this.Y-20);
		this.canvas.lineTo(this.X-5,this.Y-25);
		this.canvas.lineTo(this.X+5,this.Y-25);
		this.canvas.lineTo(this.X+10,this.Y-20);
		this.canvas.lineTo(this.X+15,this.Y-15);
		this.canvas.lineTo(this.X+10,this.Y-5);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.strokeStyle = "rgb(100,155,100)";
		this.canvas.beginPath();
		this.canvas.lineWidth = 4;
		this.canvas.moveTo(this.X-15,this.Y);
		this.canvas.lineTo(this.X-10,this.Y-5);
		this.canvas.lineTo(this.X+10,this.Y-5);
		this.canvas.lineTo(this.X+15,this.Y);
		this.canvas.stroke();
		
		this.canvas.beginPath();		
		this.canvas.strokeStyle = "rgb(100,125,100)";
		this.canvas.lineWidth = 2;
		this.canvas.moveTo(this.X-3,this.Y-6);
		this.canvas.lineTo(this.X-3,this.Y-20);
		this.canvas.lineTo(this.X+5,this.Y-20);
		this.canvas.moveTo(this.X-3,this.Y-12);
		this.canvas.lineTo(this.X+2,this.Y-12);	
		this.canvas.stroke();
		}
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			this.explodeDraw(t);
			} else {
			this.explodeInit(t,36,4,4,2); // time, elements, radius, random +/-,steps between elements
			}
		}
	
	this.boxTest = function(points) {
		if(points[0]>this.X-15 && points[1]>this.Y-25) {
			if(points[0]<this.X+15 && points[1]<this.Y) {
				return true;
				}
			}
		return false;
		}	
		
	this.collisionCheck = function(cPoints,typeOf) { 
		
		for(var c=0;c<cPoints.length;c++) {
			if(this.boxTest(cPoints[c])) return true;
			}
		return false;	
		}	
}

enemyFuel.prototype = new enemyObj();


enemyAntenna = function(ctx,start,x,y,h,w,conf) {
	this.constructor(ctx,start,x,y,h,w,conf);
	
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
		this.canvas.fillStyle = "rgb(184,84,84)";
		this.canvas.strokeStyle = "rgb(142,42,42)";
		this.canvas.lineWidth = 4;
		
		this.canvas.beginPath();
		this.canvas.moveTo(this.X,this.Y);
		this.canvas.lineTo(this.X,this.Y-30);
		this.canvas.stroke();
		this.canvas.lineWidth = 1;
		this.canvas.beginPath();
		this.canvas.arc(this.X,this.Y-15,11,0,1*Math.PI);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.beginPath();
		this.canvas.arc(this.X,this.Y-23,6,0,1*Math.PI);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.beginPath();
		this.canvas.arc(this.X,this.Y-29,3,0,1*Math.PI);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.lineWidth = 2;
		}
	
		this.explode = function(t) {
		if(!this.firstExplode) {
			this.explodeDraw(t);
			} else {
			this.explodeInit(t,42,1,9,4); // time, elements, radius, random +/-,steps between elements
			}
		}
	
	this.boxTest = function(points) {
		if(points[0]>this.X-11 && points[1]>this.Y-30) {
			if(points[0]<this.X+11 && points[1]<this.Y) {
				return true;
				}
			}
		return false;
		}	
		
	this.collisionCheck = function(cPoints,typeOf) { 
		for(var c=0;c<cPoints.length;c++) {
			if(this.boxTest(cPoints[c])) return true;
			}
		return false;	
		}	
	}
		
enemyAntenna.prototype = new enemyObj();

