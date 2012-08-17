starField = function(ctx,layer,h,w) {
	this.init = false;
	this.fieldSet = [];
	this.canvas = ctx;
	this.noLayer = layer+1;
	this.height = h;
	this.width = w*2;
	this.layerSpeed = [null,5,3,2,1];
	this.layerOff = [null,false,false,false,false];
	this.sectorOffset = 0;
	this.init = function() {
		var x,y;
		for(f=1;f<this.noLayer;f++) {
			this.fieldSet[f] = [];
			for(s=0;s<100;s++) {
				x = Math.floor(Math.random()*this.width);
				y = Math.floor(Math.random()*this.height);
				this.fieldSet[f][s] = [x,y];
				}
			}
		}
		
	this.draw = function(layerNo) {
		if(layerNo === 0) {
			for(al=1;al<this.noLayer;al++) {
				if(this.layerOff[al]) continue;
				this.layerToCanvas(al);
				}
			} else if(layerNo.length < this.noLayer) {
				for(ln in layerNo) {
					if(!this.layerOff[ln]) this.layerToCanvas(layerNo[ln]);
					}
				}
		}
		
	this.layerToCanvas = function(layerNo) {
		grey = (this.layerSpeed[layerNo]*50)+5;
		this.canvas.strokeStyle = "rgb("+grey+","+grey+","+grey+")";
		for(lp=0;lp<this.fieldSet[layerNo].length;lp++) {
			if(this.fieldSet[layerNo][lp][0]<-50) this.fieldSet[layerNo][lp][0] = this.width+50;
			this.fieldSet[layerNo][lp][0] -= this.layerSpeed[layerNo];
			if(this.fieldSet[layerNo][lp][0]>this.width+50) continue;
			this.canvas.beginPath();
			this.canvas.moveTo(this.fieldSet[layerNo][lp][0],this.fieldSet[layerNo][lp][1]);
			this.canvas.lineTo(this.fieldSet[layerNo][lp][0]+(.1*this.layerSpeed[layerNo]),this.fieldSet[layerNo][lp][1]);
			this.canvas.stroke();
			}
		}
		
	this.nextSector = function() {
		for(al=1;al<this.noLayer;al++) {
			for(lp=0;lp<this.fieldSet[al].length;lp++) {
				this.fieldSet[al][lp][0] -= 100;
				if(this.fieldSet[al][lp][0]<-50) this.fieldSet[al][lp][0] += this.width+(this.layerSpeed[al]*100);
				}
			}
		}
}
