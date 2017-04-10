/**
 * Created by jamie.greenway on 15/03/2017.
 */
$(document).ready(function() {
	/**
	 * Randomly picks a door and handles exclusion
	 * @param exclude1 int
	 * @param exclude2 int
	 * @returns int
	 */
	function pick(exclude1, exclude2) {
		var door;
		do {
			door = Math.floor(Math.random() * 3);
		} while (door === exclude1 || door === exclude2);
		return door;
	}

	/**
	 * Test the Monty Hall theory
	 *
	 * @param iter INT
	 * @return object
	 */
	function montyHall(iter) {
		var chosenWins = 0;
		var switchWins = 0;
		var cashOutWin = 0;

		for (var i = 0; i < iter; i ++) {
			var prizeDoor = pick();
			var chosenDoor = pick();
			var shownDoor = pick(prizeDoor, chosenDoor);
			var switchDoor = pick(chosenDoor, shownDoor);

			if (chosenDoor === prizeDoor) {
				chosenWins ++;
			} else if (switchDoor === prizeDoor) {
				switchWins ++;
			}

			if(chosenDoor !== prizeDoor) {
				cashOutWin ++;
			}
		}

		return {
			iterations: iter,
			stayWins: chosenWins,
			stayPercentage:  (100 * chosenWins / iter),
			switchWins: switchWins,
			switchPercentage:  (100 * switchWins / iter),
			cashOutWins: cashOutWin,
			cashOutPercentage: (100 * cashOutWin / iter)
		};
	}

	/**
	 * Draws the results to the screen
	 *
	 * @param results object
	 */
	function drawResults(results) {
		$('.results').css('background-color', '#000');
		$('.results').html(new EJS({url: 'results.ejs'}).render(results));
	}

	$('.btn-lang').on('click', function() {
		itteration = parseInt($('.its').val());
		if($(this).hasClass('php')) {
			$.ajax({
				type: "POST",
				url: "ajax.php",
				success: function(results){
					results = jQuery.parseJSON(results);
					drawResults(results);
				},
				error:function(msgData){
					alert("its bombed");

				},
				data: {itter: itteration}
			});
		} else if($(this).hasClass('js')) {
			drawResults(montyHall(itteration));
		}
	});
});