var tick;var sCount;var shootLock;var ctx;var WIDHT; var HEIGHT;
var pause = true;	var intervalID = 0;	var intervalUpdate = (1000/24);
var collisionObjects = [];var starFieldLayer = [];
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
	intervalSwitsh();
	collisionObjects.push(new enemyMountain(ctx,HEIGHT+25,WIDTH+201));
	starFieldLayer = new starField(ctx,5,HEIGHT+25,WIDTH+501);
	starFieldLayer.init();
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
