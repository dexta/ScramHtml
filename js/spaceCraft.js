spaceCraft = function(ctx,x,y,conf) {
	for(c in conf) { this[c] = conf[c];}
	this.X = x;
	this.Y = y;
	this.canvas = ctx;
	this.fuel = 8;
	this.shootLock = 20;
	this.shootLockLength = 60;
	this.shootFired = true;
	this.firstExplode = true;
	this.ePoints = [];
	this.explodeLength = 123;
	this.explodeCount = 0;
	this.explodeStart = false;
	this.explodeEnd = false;
	this.movement = function(keys) {
		this.shootLock++;
		if(keys.left) this.X -= 1;
		if(keys.right) this.X += 1;
		if(keys.up) this.Y -= 2;
		if(keys.down) this.Y += 2;
		if(keys.fire && this.shootLock > this.shootLockLength) {
			this.shootLock = 0;
			this.shootFired = false;
			}
		this.X += 1;
		}
		
	this.update = function(time) {
		this.X -= 1;
		return time; //just a dummy return function 
		}
	this.draw = function(t) {
		if(!this.explodeStart) { this.cast(); }else{ this.explode(t);}
		}
		
	this.cast = function(time) {
		//this.movement(keys);
		this.canvas.fillStyle = "rgb(100,100,200)";
		this.canvas.strokeStyle = "rgb(250,250,250)";
		this.canvas.lineWidth = 3;
		this.canvas.beginPath();
		this.canvas.moveTo(this.X,this.Y);
		this.canvas.lineTo(this.X-30,this.Y-10);
		this.canvas.lineTo(this.X-30,this.Y+10);
		this.canvas.lineTo(this.X,this.Y);
		this.canvas.stroke();
		this.canvas.fill();
		this.canvas.lineWidth = 2;
		}
		
	this.nextSector = function() {
		this.X -= 100;
		}
		
	this.getFire = function() {
		if(this.shootFired) return false;
		this.shootFired = true;
		return true;
		}
		
	this.collision = function() {
		return [[this.X,this.Y],[this.X-30,this.Y-10],[this.X-30,this.Y+10]];
		}
		
	
	this.explode = function(t) {
		if(!this.firstExplode) {
			this.explodeDraw(t);
			} else {
			this.explodeInit(t,64,4,10,2); // time, elements, radius, random +/-,steps between elements
			}
		}
	
	this.explodeInit = function(t,eNo,r,rnd,step) {
		var rad = 2*Math.PI/eNo; //10 elements
		var radius = r;
		var rStart = Math.floor(Math.random()*65536)%rnd;
		for(var a=eNo/2;a<eNo;a+=step) {
			var x = this.X+radius*Math.cos(rad*a);
			var y = this.Y+radius*Math.sin(rad*a);
			var xx = this.X+.001*Math.cos(rad*a);
			var yy = this.Y+.001*Math.sin(rad*a);
			this.ePoints.push(new ballistic(x,y,x-xx,y-yy,t));
			}
		this.firstExplode = false;	
		}
	
	this.explodeDraw = function(t) {
		if(this.explodeCount>this.explodeLength) { this.explodeEnd = true; return; }
		if(this.explodeCount==9) this.explodeInit(t,42,2,2,1);
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
		
	this.drawPoints = function() {
		// move to global 
		this.canvas.font = ((20+(this.explodeCount/5)))+"px 'optimer'"; 
		this.canvas.strokeStyle = "rgb(250,250,50)";
		this.canvas.strokeText('Burn In !!!1!!1', this.X, this.Y);
		}
}
