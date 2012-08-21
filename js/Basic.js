var tick;var sCount;var shootLock;var ctx;var WIDHT; var HEIGHT;
var pause = true;	var intervalID = 0;	var intervalUpdate = (1000/60);
var keys = {left:false,up:false,right:false,down:false,fire:false};
var collisionObjects = [];var collisionCheckObjects = []; var starFieldLayer = []; var starCraft; var bulletObjcts = [];
var allObj = [[],[],[],[],[]];var objByTyp = {mountain:[],starField:[],ship:[]};
var enemyLine = [];
var lockDraw = false;
var fps = 0,tpd=0,now,lastUpdate = (new Date)*1 -1;
var fpsFilter = 50;

var DEBUG;

function init(){  
	tick = 1;
	sCount = 0;
	shootLock = 0;
	ctx = $("#canvas")[0].getContext('2d');
	WIDTH = $("#canvas").width();
  	HEIGHT = $("#canvas").height();
  	ctx.lineCap = "round";		
	ctx.lineWidth = 2;
	addObject(1,"mountain",new enemyMountain(ctx,HEIGHT+25,WIDTH+201));
	addObject(0,"starField",new starField(ctx,1,HEIGHT+25,WIDTH+101));
	addObject(0,"starField",new starField(ctx,3,HEIGHT+25,WIDTH+201));
	addObject(0,"starField",new starField(ctx,4,HEIGHT+25,WIDTH+301));
	addObject(4,"starField",new starField(ctx,6,HEIGHT+25,WIDTH+401));
	addObject(3,"ship",new spaceCraft(ctx,400,100));
	//collisionObjects.push(new enemyMountain(ctx,HEIGHT+25,WIDTH+201));
	//starFieldLayer = new starField(ctx,5,HEIGHT+25,WIDTH+501);
	//starFieldLayer.init();
	//myShip = new spaceCraft(ctx,100,100);
	set_enemyLine();
	$("#landscape").html(""+objByTyp.mountain[0].line);
	intervalSwitsh();
}

function addObject(layer,objT,theObj) {
	if(objT == "fBullet") {
		bulletObjcts.push(theObj);
		collisionCheckObjects.push(theObj);
		}
	if(objT == "starField") {
		starFieldLayer = theObj;
		//theObj.init();
		}
	if(objT == "ship") {
		myShip = theObj;
		collisionCheckObjects.push(theObj);
		}
	if(objT == "mountain") {
		collisionObjects.push(theObj);
		objByTyp.mountain.push(theObj);
		}
	if(objT == "enemy") {
		collisionObjects.push(theObj);
		
		}
	allObj[layer].push(theObj);	
	}


function intervalSwitsh() {
	if(pause) {
		intervalID = setInterval(draw,intervalUpdate);
		pause = false;
		} else {
			clearInterval(intervalID);
			pause = true;			
			}
	}

function clearCTX() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);		
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.fillRect(0,0,WIDTH+201,HEIGHT+25);
	ctx.stroke();
	ctx.fill();
	}

function draw_time() {
	var ntpd = ((dtime=new Date)-now);
	tpd += (ntpd - tpd) / fpsFilter;
	$('#tpd').html(""+roto(tpd,4));
	}

function roto(no,len) {
	exp = Math.pow(10,len);
	return (Math.round(no*exp)/exp);
	}
	
$(document).keydown(function(e){
	var kc = e.keyCode;
	if(kc == 37) keys["left"] = true;
	if(kc == 38) keys["up"] = true;
	if(kc == 39) keys["right"] = true;
	if(kc == 40) keys["down"] = true;
	if(kc == 88) keys["fire"] = true;
	});

$(document).keyup(function (e) {
	var kc = e.keyCode;
	if(kc == 37) keys["left"] = false;
	if(kc == 38) keys["up"] = false;
	if(kc == 39) keys["right"] = false;
	if(kc == 40) keys["down"] = false;
	if(kc == 88) keys["fire"] = false;
	});

function enemyObjAdd(no,x,y) {
	//console.log(" d"+no);
	if(no == 1) {
		addObject(2,"enemy",new enemyMissile(ctx,tick,x,y,HEIGHT,WIDHT));
		//console.log("in add"+no)
		}
	if(no == 2) {
		//addObject(2,"enemy",new enemyFule(ctx,tick,x,y,HEIGHT,WIDHT));
		}
	}

function add_enemy() {
	var s = objByTyp.mountain[0].sectorLength;
	var e = s+1;
	if(objByTyp.mountain[0].line[s] != objByTyp.mountain[0].line[e]) return;
	var mW = objByTyp.mountain[0].mvWight;
	var mH = objByTyp.mountain[0].mvHeight;
	var cornerX = mW*s;
	var cornerY = objByTyp.mountain[0].lineToHeight(s);
	addObject(2,"enemy",new enemyMissile(ctx,tick,cornerX+20,cornerY,HEIGHT,WIDHT));
	addObject(2,"enemy",new enemyMissile(ctx,tick,cornerX+70,cornerY,HEIGHT,WIDHT));
	
	
	}

function set_enemyLine() {
	enemyLine = [[],[]];
	var rndEnemys = [[1,2,1],[2,1,1],[1,1,1],[1,0,1],[0,0,1],[1,1,2],[0,1,0]];
	var rndNo = 0;
	var mL = objByTyp.mountain[0].line;
	for(s=2;s<mL.length-2;s++) {
		//if(mL[s] != mL[s+1]) continue;
		if(mL[s] == mL[s+1] && mL[s+1] == mL[s+2]) {
			enemyLine[s] = [1,2,2];
			} else if(mL[s] == mL[s+1] && mL[s] == mL[s-1]) {
				enemyLine[s] = [2,2,1];
			} else if(mL[s] == mL[s+1]) {
				rndNo = Math.floor((Math.random()*65423))%rndEnemys.length;
				enemyLine[s] = rndEnemys[rndNo];
			} else { enemyLine[s] = []; }
		}
		
	var sL = objByTyp.mountain[0].sectorLength;
	var mW = objByTyp.mountain[0].mvWight;
	var mH = objByTyp.mountain[0].mvHeight;
	var cornerX;var cornerY;
	for(s=2;s<sL;s++) {
		cornerX = mW*s;
		cornerY = objByTyp.mountain[0].lineToHeight(s);
		enemyObjAdd(enemyLine[s][0],cornerX+20,cornerY);
		enemyObjAdd(enemyLine[s][1],cornerX+50,cornerY);
		enemyObjAdd(enemyLine[s][2],cornerX+80,cornerY);
		//if(enemyLine[s][0] || false) enemyObj(enemyLine[s][0],cornerX+20,cornerY);
		//if(enemyLine[s][1] || false) enemyObj(enemyLine[s][0],cornerX+50,cornerY);
		//if(enemyLine[s][2] || false) enemyObj(enemyLine[s][0],cornerX+80,cornerY);
		//console.log(enemyLine[s]);
		}
	
	}

function test_random() {
	for(r=0;r<100;r++) {
		console.log(Math.floor(Math.random()*100000)%1000);
		}
	}
