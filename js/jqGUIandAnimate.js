function hiScore() {
	$("#dGUI").css("display","block");
	$("#dGUI").css("z-index",64);
	
	
	var hiTable = '<table align="center">';
	hiTable += '<tr> <th>.pos.</th> <th>.name.</th> <th>.points.</th> <th>.level.</th> <th>.hit.</th> <th>.miss.</th></tr>';
	hiTable += '<tr> <td>1</td> <td>dexta</td> <td>420023</td> <td>4</td> <td>50</td> <td>10</td></tr>';
	hiTable += '<tr> <td>2</td> <td>dexta</td> <td>42023</td> <td>2</td> <td>30</td> <td>100</td></tr>';
	hiTable += '<tr> <td>3</td> <td>dexta</td> <td>42023</td> <td>3</td> <td>40</td> <td>140</td></tr>';
	
	hiTable += '</table>';
	
	var hiRow = '<div class="hiRow" id="hiRow1">';
	hiRow += '<div class="hiItem">1</div><div class="hiItem">dexta</div><div class="hiItem">42223</div><div class="hiItem">5</div><div class="hiItem">60</div><div class="hiItem">75</div>';
	hiRow += '</div>';
	hiRow += '<div class="hiRow" id="hiRow2">';
	hiRow += '<li>1</li><li>dexta</li><li>42223</li><li>5</li><li>60</li><li>75</li>';
	hiRow += '</div>';	
	
	$("#dGUI").html('<div id="hiscoreLegende" class="button dGUIe">'+hiTable+'</div>'+hiRow);
	$("#hiscoreLegende").css("left",-200);
	$("#hiscoreLegende").css("top",60);
	$("#hiscoreLegende").animate({
		"left": 160,
		"opacity": 0.8	
		},
		1600,
		"swing"
		);
	
	$("#hiRow1").css("left",-200);
	$("#hiRow2").css("left",1200);
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
