enemyMountain = function(ctx,h,w) {
	this.height = h;
	this.wight = w;
	this.length = Math.floor(w/100);
	this.canvas = ctx;
	this.line = [2,2,3,3,3,4,4,5,5,6,6,5,5,5,3,3,3,2,2,3,4,4,5,5,6,6,3,2,2,6,6,2,2,3,3,2,2,2,2,1];
	this.colorLines = "rgb(255,0,0)";		this.colorFill = "rgb(100,100,200)";
	this.time = 0;
	this.step = 1;
	this.mvWight = 100;
	this.mvHeight = 50;
	
	this.draw = function(t) {
		this.canvas.fillStyle = this.colorFill;
		this.canvas.strokeStyle = this.colorLines;
		//this.canvas.lineWidth = 4;
		this.canvas.beginPath();
		this.canvas.moveTo(-200,this.lineToHeight(0));
		for(mP=0;mP<this.length;mP++) {
			if(mP*this.mvWight > this.wight+(this.mvWight*2)) continue;
			this.canvas.lineTo(mP*this.mvWight,this.lineToHeight(mP));
			}
		this.canvas.lineTo((this.length-1)*this.mvWight,this.height);
		this.canvas.lineTo(0,this.height);
		this.canvas.stroke();
		this.canvas.fill();
		this.canvas.translate(-1,0);
		//this.time ++;
	}
	
	this.nextSector = function() {
		//var tTi = this.line[0];
		var tTi = this.line.splice(0,1);
		this.line.push(tTi[0]);
		}
		
	this.update = function(time) {
		return time; //just a dummy return function 
		}
	
	this.boxTest = function(cPoint,bPoints) {
		if(bPoints[0][1] == bPoints[1][1]) bPoints[1][1] = this.height;
		var x1 = (bPoints[0][0]<bPoints[1][0])? bPoints[0][0]:bPoints[1][0];
		var y1 = (bPoints[0][1]<bPoints[1][1])? bPoints[0][1]:bPoints[1][1];
		var x2 = (bPoints[0][0]>bPoints[1][0])? bPoints[0][0]:bPoints[1][0];
		//y2 = (bPoints[0][1]>bPoints[1][1])? bPoints[0][1]:bPoints[1][1];
		var y2 = this.height;
		//console.log("box Points:");
		//console.log(cPoint,bPoints,x1,y1,x2,y2);
		if(cPoint[0]>x1 && cPoint[1]>y1) {
			if(cPoint[0]<x2 && cPoint[1]<y2) {
				//console.log(cPoint,bPoints,x1,y1,x2,y2);
				return true;
				}
			}
			
		return false;
		}
		
	this.collisionCheck = function(cPoints) {
		for(var c=0;c<cPoints.length;c++) {
			var sP = Math.floor(cPoints[c][0]/this.mvWight);
			var cx = cPoints[c][0]; cy = cPoints[c][1];
			var x1 = sP*this.mvWight;
			var y1 = this.lineToHeight(sP);
			var x2 = (sP+1)*this.mvWight;
			var y2 = this.lineToHeight(sP+1);
			//console.log(cPoints[c],x1,y1,x2,y1);
			blockC = this.boxTest(cPoints[c],[[x1,y1],[x2,y2]]);
			//console.log(blockC);
			if(!blockC) continue;
			//console.log(cPoints[c],x1,y1,x2,y2);
			if((y1==y2) && blockC) return true;
			
			if(y1 < y2) {
				cx = x2-(cx-x1);
				var tA = x1; var tB = x2;
				x1 = tB; x2 = tA;
				}
				var colX = x1+((cy-y1)*((x2-x1)/(y2-y1)));
				if(cx >= colX) return true;
			} // end of all Points for NEXT
			return false;
		} // end of collisionCheck function
		
	this.lineToHeight = function(lNumber) {
		return this.height-(this.line[lNumber]*this.mvHeight);
		}
}
