var startRun;var endRun;var bigA = new Array(200);var pointer = 0;
for(var b=0;b<bigA.length;b++) {
	bigA[b] = Math.floor(Math.random()*50);
	}
	
function time(doing) {
	if(doing == "start") {
		startRun = Date.now();
		return startRun;
		} else if(doing == "end") {
			endRun = Date.now();
			return endRun-startRun;
			}
	}

function callPo() {
	time("start");
	for(var t=0;t<bigA.length;t++) {
		$("#splArray").html(poFun());
		$("#score").html(t);
		}
	console.log(time("end"));
	}



function poFun() {
	if(pointer<bigA.length-1) pointer = 0;
	out = bigA[pointer];
	pointer++;
	return out;
	}


function poArray() {
	time("start");
	for(var t=0;t<bigA.length;t++) {
		if(pointer<bigA.length-1) pointer = 0;
		$("#splArray").html(bigA[pointer]);
		$("#score").html(t);
		pointer++;
		}
	console.log(time("end"));
	}

function splArray() {
	//$("#splArray").html(t);
	var tmp;
	time("start");
	for(var t=0;t<bigA.length;t++) {
		tmp=bigA.splice(0,1);
		bigA.push(tmp);
		$("#splArray").html(tmp[0]);
		$("#score").html(t);
		}
	console.log(time("end"));	
	}

function roto(no,len) {
	exp = Math.pow(10,len);
	return (Math.round(no*exp)/exp);
	}
