function hiScore() {
	$("#dGUI").css("display","block");
	$("#dGUI").css("z-index",64);
	
	// var hiTable = '<tr> <th>.pos.</th> <th>.name.</th> <th>.points.</th> <th>.level.</th> <th>.hit.</th> <th>.miss.</th></tr>';
	
	
	var hiRow = '<div class="hiRow" id="hiRow0">';
	hiRow += '<li>.pos.</li><li>.name.</li><li>.score.</li><li>.level.</li><li>.hits.</li><li>.miss.</li>';
	hiRow += '</div>';
	
	for(var r=1;r<11;r++) {
		hiRow += '<div class="hiRow" id="hiRow'+r+'">';
		hiRow += '<li>'+r+'</li><li>dexta</li><li>42223</li><li>5</li><li>60</li><li>75</li>';
		hiRow += '</div>';	
		
		}
	
	$("#dGUI").html(hiRow);
	for(var h=0;h<11;h++) {
		var dist = (h%2==0)? -1000:1000;
		$("#hiRow"+h).css("left",dist);
		$("#hiRow"+h).css("top",10+(h*30));
		$("#hiRow"+h).animate({
			"left": 160,
			"opacity": 0.8	
			},
			1600,
			"swing"
			).animate({
			"opacity": 1	
			},6600
			).animate({
			"left": dist,
			"opacity": 0.8	
			},
			1600,
			"swing"
			);
		}
	
		
	// do something
	$("#dGUI").click(function() { 
		$("#dGUI").css("display","none");
		$("#dGUI").css("z-index",3);
		$("#dGUI").off('click');
		});
	//$("#dGUI").css("display","none");
	//$("#dGUI").css("z-index",3);
}

function hide_dGUI() {
	$("#dGUI").css("display","none");
	$("#dGUI").css("z-index",3);
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

function add_player2HiScore() {
	var sortHiScore = [];
	var uSave = ["dexta",Math.floor(tick/10)+scoreCount,levelNo,hitEnemy,missEnemy];
	var uHit = true;
	var sLevel = 1;
	for(var us=1;us<playerHiScore.length;us++) {
		console.log("bcount "+us+" "+sLevel);
		if(uHit && playerHiScore[us][1]<uSave[1]) {
			sortHiScore[sLevel] = uSave;
			console.log("hit Gamer "+sortHiScore[sLevel]);
			sLevel++;
			uHit = false;
			}
		sortHiScore[sLevel] = playerHiScore[us];
		console.log("sort Gamer "+sortHiScore[sLevel]);
		sLevel++;
		}
	if(uHit) sortHiScore[sLevel] = uSave;
	playerHiScore = sortHiScore;

	
	//console.log("sort Hi "+sortHiScore);
	//playerHiScore.push(["dexta",Math.floor(tick/10)+scoreCount,levelNo,hitEnemy,missEnemy]);
	for(var ps=1;ps<playerHiScore.length;ps++) {
		console.log(playerHiScore[ps]+"");
		localStorage.setItem("hiS_"+ps, playerHiScore[ps].join("|"));
		}
	localStorage.setItem("hiScoreMax",playerHiScore.length);

	return sortHiScore;
	}
	

function get_player2HiScore() {
	var maxNo; var tmpSt; var tmpIt;var tmpPS = [];
	if((maxNo = localStorage.getItem("hiScoreMax")) == null) localStorage.setItem("hiScoreMax", 0);
	var maxL = parseInt(maxNo);
	for(var ml=1;ml<maxL+1;ml++) {
		tmpSt = localStorage.getItem("hiS_"+ml);
		console.log("str ls "+tmpSt);
		if(tmpSt == null) continue;
		tmpIt = tmpSt.split("|");
		tmpPS[ml] = [tmpIt[0],parseInt(tmpIt[1]),parseInt(tmpIt[2]),parseInt(tmpIt[3]),parseInt(tmpIt[4])];
		}
	playerHiScore = tmpPS;
	console.log(maxL+2);
	return "ok";
	}
