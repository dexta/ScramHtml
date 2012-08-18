var tick;var sCount;var shootLock;var ctx;var WIDHT; var HEIGHT;
var pause = true;	var intervalID = 0;	var intervalUpdate = (1000/24);
var keys = {left:false,up:false,right:false,down:false,fire:false};
var collisionObjects = [];var collisionCheckObjects = []; var starFieldLayer = []; var starCraft; var bulletObjcts = [];
var allObj = [[],[],[],[],[]];var objByTyp = {mountain:[],starField:[],ship:[]};
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




function test_random() {
	for(r=0;r<100;r++) {
		console.log(Math.floor(Math.random()*100000)%1000);
		}
	}
