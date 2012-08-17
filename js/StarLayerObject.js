starField = function(ctx,layer,h,w) {
	this.init = false;
	this.fieldSet = [];
	this.canvas = ctx;
	this.layerSpeed = layer;
	this.height = h;
	this.width = w;
	this.sectorOffset = 0;
	this.sumOfStars = 100-(layer*10)
	for(s=0;s<this.sumOfStars;s++) {
		x = Math.floor(Math.random()*(layer*65000))%this.width;
		y = Math.floor(Math.random()*(65000))%this.height;
		this.fieldSet.push([x,y]);
		}
		
	this.update = function(time) {
		return time; //just a dummy return function 
		}
	
	this.draw = function(time) {
		grey = (this.layerSpeed*50)+5;
		this.canvas.strokeStyle = "rgb("+grey+","+grey+","+grey+")";
		for(lp=0;lp<this.fieldSet.length;lp++) {
			if(this.fieldSet[lp][0]<-5) this.fieldSet[lp][0] += this.width;
			this.fieldSet[lp][0] -= this.layerSpeed;
			if(this.fieldSet[lp][0]>this.width+50) continue;
			this.canvas.beginPath();
			this.canvas.moveTo(this.fieldSet[lp][0],this.fieldSet[lp][1]);
			this.canvas.lineTo(this.fieldSet[lp][0]+(.1*this.layerSpeed),this.fieldSet[lp][1]);
			this.canvas.stroke();
			}
		}	
		
	this.nextSector = function() {
		for(lp=0;lp<this.fieldSet.length;lp++) {
			this.fieldSet[lp][0] -= 100;
			//if(this.fieldSet[lp][0]<-50) this.fieldSet[lp][0] += this.width;
			}
		}
}
