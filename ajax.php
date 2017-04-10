<?php
	/**
	 * Test the Monty Hall theory
	 *
	 * @param $iter INT
	 * @return array
	 */
	function montyHall($iter){
		$switchWin = 0;
		$stayWin = 0;
		$cashOutWin = 0;


		foreach (range(1, $iter) as $i){
			$doors = array(0, 0, 0);
			$doors[array_rand($doors)] = 1;
			$choice = array_rand($doors);
			do {
				$shown = array_rand($doors);
			} while($shown == $choice || $doors[$shown] == 1);

			$stayWin += $doors[$choice];
			$cashOutWin += ($doors[$choice] != 1) ? 1 : 0;
			$switchWin += $doors[3 - $choice - $shown];
		}

		$cashOutWinPer = ($cashOutWin/$iter)*100;
		$stayPer = ($stayWin/$iter)*100;
		$switchPer = ($switchWin/$iter)*100;

		return array(
			'iterations' => $iter,
			'stayWins' => $stayWin,
			'stayPercentage' => $stayPer,
			'switchWins' => $switchWin,
			'switchPercentage' => $switchPer,
			'cashOutWins' => $cashOutWin,
			'cashOutPercentage' => $cashOutWinPer
		);
	}

	echo json_encode(montyHall($_POST['itter']));
	exit;