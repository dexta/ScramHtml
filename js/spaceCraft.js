spaceCraft = function(ctx,x,y,conf) {
	for(c in conf) { this[c] = conf[c];}
	this.X = x;
	this.Y = y;
	this.canvas = ctx;
	this.fuel = 8;
	this.shootLock = 20;
	this.shootLockLength = 40;
	this.shootFired = true;
	
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

		
	this.draw = function(time) {
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
}
