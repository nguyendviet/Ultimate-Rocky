$(document).ready(function() {
	var attackerChosen = false;
	var defenderChosen = false;
	var gameLost = false;
	var gameWon = false;
	var attBase = [];
	var winCount = 0;
	
	prepareGame();	
	
	function prepareGame() {
		$(".eventText").html("Pick an attacker and a defender then click Fight!");
		
		//assign attributes to each character
		$("#char1").data({"name": "Rocky Balboa", "health": 104, "attack": 9, "defence": 34}); 
		$("#char2").data({"name": "Apollo Creed", "health": 80, "attack": 45, "defence": 7});
		$("#char3").data({"name": "Clubber Lang", "health": 150, "attack": 11, "defence": 10});
		$("#char4").data({"name": "Ivan Drago", "health": 162, "attack": 5, "defence": 15});
		
		//show name and health of characters
		$(".char1Name").html($("#char1").data("name"));
		$(".char1Health").html($("#char1").data("health"));
		$(".char2Name").html($("#char2").data("name"));
		$(".char2Health").html($("#char2").data("health"));
		$(".char3Name").html($("#char3").data("name"));
		$(".char3Health").html($("#char3").data("health"));
		$(".char4Name").html($("#char4").data("name"));
		$(".char4Health").html($("#char4").data("health"));
	}
	
	//pick attacker, 3 others moved to opponents' box
	$(".character").on("click", function() {
		if (gameLost) {
			return;
		}
		else if (attackerChosen && defenderChosen) {
			return false; //ensure only 1 attacker
		}
		else if (!attackerChosen) {
			$(this).appendTo(".attackerBox"); //pick 1 attacker
			$(this).attr("class", "character attacker");
			$(".character").not($(this)).appendTo(".opponentBox");
			attackerChosen = true;
			attBase = $(this).data("attack"); //store base attack power of attacker
		}
		else if (attackerChosen && !defenderChosen) {
			if ($(this).attr("class") == "character attacker") {
				return; //ensure attacker once chosen can't be moved
			}
			else {
				$(this).appendTo(".defenderBox"); //pick 1 defender
				$(this).attr("class", "character defender");
				defenderChosen = true;
			}
		}
	});
	
	function punch() {
		var $attacker = $(".attacker");
		var $defender = $(".defender");
		var a = $(".attacker").data("attack");
		var d = $(".defender").data("defence");
		var ah = $(".attacker").data("health");
		var dh = $(".defender").data("health");
		var $defName = $(".defender").data("name");
		
		$attacker.data("attack", a + attBase); console.log("attacker's damage: ", a);
		$attacker.data("health", ah - d); console.log("attacker's health: ", ah);
		$defender.data("health", dh - a); console.log("defender's health: ", dh);
		
		//update attacker's and defender's health
		ah = $(".attacker").data("health");
		dh = $(".defender").data("health");
		
		$(".eventText").html("<p>You punched " + $defName + " for " + a + " damage.</p>" + "<p>" + $defName + " punched you back for " + d + " damage.</p>");
		
		//show changes in attacker's and defender's health
		$(".char1Health").html($("#char1").data("health"));
		$(".char2Health").html($("#char2").data("health"));
		$(".char3Health").html($("#char3").data("health"));
		$(".char4Health").html($("#char4").data("health"));
		
		if ((dh < 1) && (ah > 0)) {
			$defender.appendTo(".defeated");
			$(".eventText").append("Ding ding! You've knocked out " + $defName +"!");
			defenderChosen = false;
			winCount++;
		}
		else if ((dh < 1) && (ah < 1)) {
			$(".eventText").html("It's a draw... GAME OVER!");
			gameLost = true;
		}
		
		if ((ah < 1) && (dh > 0)) {
			$(".eventText").append("<p>OH NO! You've been knocked out by " + $defName + "!</p>" + "<p>GAME OVER!</p>");
			gameLost = true;
		}
		else if ((ah < 1) && (dh < 1)) {
			$(".eventText").html("It's a draw... GAME OVER!");
			gameLost = true;
		}
		
		if ((winCount == 3) && (ah > 0)) {
			$(".eventText").append("<p>You're the Winner! You have defeated all your opponents!</p>");
			gameWon = true;
		}
		else if ((winCount == 3) && (ah < 1)) {
			$(".eventText").html("It's a draw... GAME OVER!");
			gameLost = true;
		}
	}
	
	function restart() {
		//move and change class of characters back to origin
		$(".character").show();
		$(".character").appendTo(".characterBox");
		$(".attacker").attr("class", "character");
		$(".defender").attr("class", "character");
		
		//reset all attributes
		attackerChosen = false;
		defenderChosen = false;
		gameLost = false;
		gameWon = false;
		winCount = 0;
		
		prepareGame();
	}
	
	$("#fight").on("click", function() {
		if (gameLost) {
			return;
		}
		else if (gameWon) {
			return;
		}
		else if (!attackerChosen) {
			$(".eventText").html("You haven't chosen an attacker!");
		}
		else if (!defenderChosen) {
			$(".eventText").html("You haven't chosen a defender!");
		}
		else {
			punch();
		}
	});
	
	$("#restart").on("click", function() {
		restart();
	});
});