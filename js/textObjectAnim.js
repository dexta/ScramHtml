var textAnimID; var textAnimPause = true;
var textObj = []; var textTick = 0;

textAnimObject = function(start,x,y,text,conf) {
	this.Start = start;
	this.EndX = x+100;
	this.EndY = y;
	this.viewStart = start+1;
	this.viewEnd = start+380;
	this.X = x;
	this.Y = y;
	this.vX = 1;
	this.vY = 0;
	this.Text = text;
	this.Font = " 'optimer'";
	this.FontSize = "64px";
	this.Color = "rgb(150,150,220)";
	for(c in conf) { this[c] = conf[c];}
	
	this.update = function(time,textCTX) {
		if(this.Start>time) return;
		
		if( ((this.vX<0) && (this.EndX<this.X)) || ((this.vX>0) && (this.EndX>this.X)) ) this.X += this.vX;
		if( ((this.vY<0) && (this.EndY<this.Y)) || ((this.vY>0) && (this.EndY>this.Y)) ) this.Y += this.vY;
		
		if(this.viewStart>time || this.viewEnd>time) {	
			textCTX.font = this.FontSize+this.Font;
			textCTX.strokeStyle = this.Color;
			textCTX.strokeText(this.Text,this.X,this.Y);
			}
		}
	
	}
	
boxAnimObject = function(start,x,y,conf) {
	this.Start = start;
	this.EndX = x+100;
	this.EndY = y;
	this.X = x;
	this.Y = y;
	this.viewStart = start;
	this.viewEnd = start+100;
	this.vX = 1;
	this.vY = 0;
	this.Color = "rgb(150,150,220)";
	for(c in conf) { this[c] = conf[c];}
	
	this.update = function(time,textCTX) {
		if(this.Start>time) return;
		
		if( ((this.vX<0) && (this.EndX<this.X)) || ((this.vX>0) && (this.EndX>this.X)) ) this.X += this.vX;
		if( ((this.vY<0) && (this.EndY<this.Y)) || ((this.vY>0) && (this.EndY>this.Y)) ) this.Y += this.vY;
		
		if(this.viewStart>time || this.viewEnd>time) {	
			//console.log("in box");
			//textCTX.beginPath();
			textCTX.fillStyle = this.Color;
			textCTX.fillRect(this.X,this.Y,this.width,this.height);
			//textCTX.fillRect(this.X,this.Y,100,100);
			//textCTX.stroke();
			//textCTX.fill();
			}
		
		}
	}	

eventAnimObject = function(start,callObj) {
	this.Start = start;
	this.objectToCall = callObj;
	this.firstStarted = true;
	
	this.update = function(time,dummyCanvas) {
		// var dummy = dummyCanvas to be compatible 
		if(this.Start<time && this.firstStarted) {
			this.firstStarted = false;
			this.objectToCall();
			}
		}
	}


function textAnimStartStop() {
	if(textAnimPause) {
		textAnimID = setInterval(textAnimLoop,1000/50);
		textAnimPause = false;
		} else {
			clearInterval(textAnimID);
			textAnimPause = true;
			}
	}	
	
function clearTextCanvas() {	
	canvasMenu.clearRect(0,0,WIDTH,HEIGHT);
	}
	
function textAnimLoop() {
	clearTextCanvas();
	for(var t=0;t<textObj.length;t++) {
		textObj[t].update(textTick,canvasMenu);
		}
	textTick++;
	}

function enterAName(callback) {					// call a function after click ok
	$("#enterName").css("display","block");
	$("#enterName").css("z-index",64);
	$("#enterPlayer1Name").click(function() {	// bad ! try call eventlistern only once
		$("#enterName").css("display","none");
		$("#enterName").css("z-index",2);
		$("#enterPlayer1Name").off('click');	// better but not for good oop
		callback($("#player1Name").val());
		});
	}


function textIntro() {
	if(!textAnimPause) textAnimStartStop();
	textObj = []; textTick = 0;
	$("#IntroOutro").css("display","block");
	var bconf = {width:WIDTH-130, height:HEIGHT-60, Color:"rgba(200,200,200,.9)", viewEnd:2600, EndX:80, EndY:40, vX:1, vY:1};
	textObj.push(new boxAnimObject(0,-10,-10,bconf));
	var conf = { EndX:200, viewEnd:2595, Color: "rgba(123,123,223,.7)", FontSize:"84px",vX:-2};
	textObj.push(new textAnimObject(50,500,120,"ScramHTML",conf));
	conf.EndX = 150;conf.vX=1;conf.FontSize = "32px";
	textObj.push(new textAnimObject(380,148,155,"[a game inspired by the C+4 port from 1984] ",conf));
	conf.Color = "rgb(64,64,123)";conf.FontSize = "42px";conf.EndX = 300;conf.vX=-2;
	textObj.push(new textAnimObject(200,400,220,"arrow keys up/down/left/right",conf));
	conf.EndX = 350;conf.vX=2;
	textObj.push(new textAnimObject(225,100,260,"press x to fire ",conf));
	conf.EndX = 400;conf.vX=-2;
	textObj.push(new textAnimObject(250,600,300,"press a for autofire ",conf));
	
	// repeat the intro
	textObj.push(new eventAnimObject(2605,textIntro));
	
	
	textAnimStartStop();
	autoFire = true;
	$("#IntroOutro").click(function() {
		$("#IntroOutro").off("click");
		canvasMenu.clearRect(0,0,WIDTH,HEIGHT);
		$("#IntroOutro").css("display","none");
		textAnimStartStop();
		if(!pause) intervalSwitsh();
		init();
		});
	}
