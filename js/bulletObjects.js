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
	this.explodeStart = false;
	this.balli = new ballistic(x,y,0,0,start);
	this.update = function(t) {
		//this.balli.update(t);
		//this.X = this.balli.x0;
		//this.Y = this.balli.y0;
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
		//this.balli.x0 -= 100;
		this.X -= 100;
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
			} else {
			var rad = 2*Math.PI/5; //10 elements
			var radius = 3;
			for(var a=0;a<5;a++) {
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
	
friendMissile.prototype = new spaceObj();

friendLaser = function(canvas,start,x,y) {
	this.constructor(canvas,start,x,y);
	this.ePoints = [];
	this.firstExplode = true;
	this.explodeStart = false;
	this.update = function(t) {
		this.X += 3;
		return [this.X,this.Y];
		}
	this.collision = function() {
		return [[this.X,this.Y]];
		}		
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
	this.nextSector = function() {
		this.X -= 100;
		}
	this.cast = function() {
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
			} else {
			var rad = 2*Math.PI/5; //10 elements
			var radius = 3;
			for(var a=0;a<5;a++) {
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
