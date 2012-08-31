function hiScore() {
	$("#dGUI").css("display","block");
	$("#dGUI").css("z-index",64);
	
	// var hiTable = '<tr> <th>.pos.</th> <th>.name.</th> <th>.points.</th> <th>.level.</th> <th>.hit.</th> <th>.miss.</th></tr>';
	
	
	var hiRow = '<div class="hiRow" id="hiRow0">';
	hiRow += '<li>.pos.</li><li>.name.</li><li>.score.</li><li>.level.</li><li>.hits.</li><li>.miss.</li>';
	hiRow += '</div>';
	hiRow += '<div class="hiRow" id="hiRow1">';
	hiRow += '<li>1</li><li>dexta</li><li>42223</li><li>5</li><li>60</li><li>75</li>';
	hiRow += '</div>';	
	hiRow += '<div class="hiRow" id="hiRow2">';
	hiRow += '<li>1</li><li>dexta</li><li>42223</li><li>5</li><li>60</li><li>75</li>';
	hiRow += '</div>';	
	$("#dGUI").html(hiRow);
	for(var h=0;h<8;h++) {
		var dist = (h%2==0)? -200:1000;
		$("#hiRow"+h).css("left",dist);
		$("#hiRow"+h).css("top",10+(h*15));
		$("#hiRow"+h).animate({
			"left": 160,
			"opacity": 0.8	
			},
			1600,
			"swing"
			);
		}
	
	$("#hiRow1").css("left",-200);
	$("#hiRow1").css("top",60);
	$("#hiRow2").css("left",1000);
	$("#hiRow2").css("top",100);
	$("#hiRow1").animate({
		"left": 160,
		"opacity": 0.8	
		},
		1600,
		"swing"
		);
	$("#hiRow2").animate({
		"left": 160,
		"opacity": 0.8	
		},
		1600,
		"swing"
		);
	
		
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
