var tick;var sCount;var shootLock;var ctx;var WIDHT; var HEIGHT;
var pause = true;	var intervalID = 0;	var intervalUpdate = (1000/60);
var keys = {left:false,up:false,right:false,down:false,fire:false};
var collisionObjects = [];var collisionCheckObjects = []; var drawLayer = [[],[],[],[],[],[]]; var starCraft; var bulletObjcts = [];
var allObj = [];var objByTyp = {mountain:{},ship:{}};
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
	addObject(new enemyMountain(ctx,HEIGHT+25,WIDTH+201,configMountain));
	addObject(new starField(ctx,1,HEIGHT+25,WIDTH+101,configStarField));
	addObject(new starField(ctx,3,HEIGHT+25,WIDTH+201,configStarField));
	addObject(new starField(ctx,4,HEIGHT+25,WIDTH+301,configStarField));
	configStarField["layer"] = 4;
	addObject(new starField(ctx,6,HEIGHT+25,WIDTH+401,configStarField));
	addObject(new spaceCraft(ctx,400,100,configSpaceCraft));
	//collisionObjects.push(new enemyMountain(ctx,HEIGHT+25,WIDTH+201));
	//starFieldLayer = new starField(ctx,5,HEIGHT+25,WIDTH+501);
	//starFieldLayer.init();
	//myShip = new spaceCraft(ctx,100,100);
	set_enemyLine();
	//$("#landscape").html(""+objByTyp.mountain[0].line); 
	intervalSwitsh();
}

function addObject(theObj) {
	// maybe do somtink good here
	if(theObj.objTyp == "mountain") objByTyp.mountain = theObj;
	if(theObj.objTyp == "ship") objByTyp.ship = theObj;
	
	allObj.push(theObj);
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

function enemyObjAdd(types,x,y) {
	console.log(" x"+x+" y"+y+" types "+types+" length "+types.length);
	if(types.length == 0) return;
	for(var t=0;t<types.length;t++) {
		if(types[t] == 1) {
			addObject(new enemyMissile(ctx,tick,(x+20)+(t*30),y,HEIGHT,WIDHT,configEnemy));
			console.log("in add "+t)
			}
		if(types[t] == 2) {
			//addObject(2,"enemy",new enemyFule(ctx,tick,x,y,HEIGHT,WIDHT));
			}
		}
	}

function get_rnd_enemy() {
	var rndEnemys = [[1,2,1],[2,1,1],[1,1,1],[1,0,1],[0,0,1],[1,1,2],[0,1,0]];
	var rndNo = 0;
	rndNo = Math.floor((Math.random()*65423))%rndEnemys.length;
	return rndEnemys[rndNo];
	}

function add_enemy(sector) {
	//console.log("m Line "+objByTyp.mountain.line);
	var s = sector;
	var e = s+1;
	if(objByTyp.mountain.line[s] != objByTyp.mountain.line[e]) return;
	var enemyTypes = get_rnd_enemy();
	var mW = objByTyp.mountain.mvWight;
	var mH = objByTyp.mountain.mvHeight;
	var cornerX = mW*s;
	var cornerY = objByTyp.mountain.lineToHeight(s);
	console.log("sector "+s+" cX "+cornerX+" cY "+cornerY+" enemys "+enemyTypes);
	//console.log("enemy Line "+enemyLine);
	enemyObjAdd(enemyTypes,cornerX,cornerY);
	
	}

function set_enemyLine() {
	var sL = objByTyp.mountain.sectorLength;
	for(s=0;s<sL;s++) {
		add_enemy(s);
		}
	}

function old_set_enemyLine() {
	var mL = objByTyp.mountain.line;
	enemyLine = [[],[]];
	var rndEnemys = [[1,2,1],[2,1,1],[1,1,1],[1,0,1],[0,0,1],[1,1,2],[0,1,0]];
	var rndNo = 0;
	for(s=2;s<mL.length-2;s++) {
		if(mL[s] == mL[s+1] && mL[s+1] == mL[s+2]) {
			enemyLine[s] = [1,2,2];
			} else if(mL[s] == mL[s+1] && mL[s] == mL[s-1]) {
				enemyLine[s] = [2,2,1];
			} else if(mL[s] == mL[s+1]) {
				rndNo = Math.floor((Math.random()*65423))%rndEnemys.length;
				enemyLine[s] = rndEnemys[rndNo];
			} else { enemyLine[s] = []; }
		}
		
	var sL = objByTyp.mountain.sectorLength;
	var mW = objByTyp.mountain.mvWight;
	var mH = objByTyp.mountain.mvHeight;
	var cornerX;var cornerY;
	for(s=2;s<sL;s++) {
		cornerX = mW*s;
		cornerY = objByTyp.mountain.lineToHeight(s);
		enemyObjAdd(enemyLine[s],cornerX,cornerY);
		enemyLine.push(enemyLine[s]);
		}
	enemyLine.splice(0,sL);
	}

function test_random() {
	for(r=0;r<100;r++) {
		console.log(Math.floor(Math.random()*100000)%1000);
		}
	}
