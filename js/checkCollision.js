checkCollision = function() {
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
}
