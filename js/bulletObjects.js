spaceObj = function(canvas,start,x,y) {
	this.ctx = canvas;
	this.start = start;
	this.X = x;
	this.Y = y;
}

ballistic = function(x,y,vx,vy,t) {
	this.AY = 0.081; // beschleunigung per pixel
	this.x0 = x;this.y0 = y;this.vx0 = vx; this.vy0 = vy; this.t0 = t;
	this.update = function(t) {
		var dt = t - this.t0;
		this.x0 -= this.vx0 * dt;
		this.y0 = this.vy0 * dt + .5*this.AY*Math.pow(dt,2)+this.y0; 
		this.vy0 = this.AY * dt + this.vy0;
		this.t0 = t;
		}
	}
	
friendMissile = function(canvas,start,x,y) {
	this.constructor(canvas,start,x,y);
	this.ePoints = [];
	this.firstExplode = true;
	this.explodeLength = 42;
	this.explodeCount = 0;
	this.explodeStart = false;
	this.explodeEnd = false;
	this.balli = new ballistic(x,y,0,0,start);
	this.update = function(t) {
		this.X += 1;
		this.Y += 2;
		return [this.X,this.Y];
		}
	this.collision = function() {
		return [[this.X,this.Y]];
		}
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	this.nextSector = function() {
		if(!this.explodeStart) {
			this.X -= 100;
		}else{ 
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].x0 -= 100;
				}
			}
		}	
	this.cast = function() {
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.strokeStyle = "rgb(250,0,0)";
		ctx.beginPath();
		ctx.moveTo(this.X,this.Y);
		ctx.lineTo(this.X,this.Y-9)
		ctx.lineTo(this.X-1,this.Y-6)
		ctx.lineTo(this.X,this.Y)
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
	
friendMissile.prototype = new spaceObj();

friendLaser = function(canvas,start,x,y) {
	this.constructor(canvas,start,x,y);
	this.ePoints = [];
	this.firstExplode = true;
	this.explodeLength = 42;
	this.explodeCount = 0;
	this.explodeStart = false;
	this.explodeEnd = false;
	this.update = function(t) {
		
			this.X += 3;
			return [this.X,this.Y];
		
		}
	this.collision = function() {
		return [[this.X,this.Y]];
		}		
	this.draw = function(t) {
		if(!this.explodeStart) { return this.cast(); }else{ return this.explode(t);}
		}
	this.nextSector = function() {
		if(!this.explodeStart) {
			this.X -= 100;
		}else{ 
			for(var a=0;a<this.ePoints.length;a++) {
				this.ePoints[a].x0 -= 100;
				}
			}
		}
	this.cast = function() {
		if(this.X>2000) this.explodeEnd = true;
		ctx.fillStyle = "rgb(255,255,0)";
		ctx.strokeStyle = "rgb(250,10,0)";
		ctx.beginPath();
		ctx.moveTo(this.X,this.Y);
		ctx.lineTo(this.X-15,this.Y+1)
		ctx.lineTo(this.X-15,this.Y-1)
		ctx.lineTo(this.X,this.Y)
		ctx.fill();
		ctx.stroke();
		}
	this.explode = function(t) {
		if(!this.firstExplode) {
			if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
			var cU = Math.floor(255*(this.explodeCount/this.explodeLength));
			var cD = 255-cU;
			//console.log(cU,cD);
			ctx.fillStyle = "rgb(255,"+cU+",0)";
			ctx.strokeStyle = "rgb(255,"+cU+",0)";
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
			var rad = 2*Math.PI/64; //10 elements
			var radius = 2+(Math.floor(Math.random()*65536)%3);
			var rStart = Math.floor(Math.random()*65536)%5;
			for(var a=39+rStart;a<59+rStart;a+=4) {
				var x = this.X+radius*Math.cos(rad*a);
				var y = this.Y+radius*Math.sin(rad*a);
				var xx = this.X+.1*Math.cos(rad*a);
				var yy = this.Y+.1*Math.sin(rad*a);
				this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
				this.firstExplode = false;
				}
			}
		}
	}
	
friendLaser.prototype = new spaceObj();
