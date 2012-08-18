enemyObj = function(ctx,start,x,y,h,w) {
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
	}
	this.collision = function() {
		return [[this.X,this.Y]];
		}		
}


enemyMissile = function(canvas,start,x,y,h,w) {
	this.constructor(canvas,start,x,y,h,w);
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
		this.collisionCheck = function(cPoints) {
			return;
			}
}

enemyMissile.prototype = new enemyObj();
