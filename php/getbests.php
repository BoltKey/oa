<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
header('Access-Control-Allow-Origin: http://localhost');
require ('db_connect.php');
$replays = [];
$times = [];
$s = "SELECT * FROM oa_best_race WHERE userid=".$_POST["userid"]." ORDER BY trackid";
if ($result = mysqli_query($link, $s)) {
	while ($row = mysqli_fetch_assoc($result)) {
		$times[$row['trackid']] = $row['time'];
	}
}

for ($i = 0; $i < 100; ++$i) {
	if (array_key_exists ($i, $times)) {
		$s = "SELECT * FROM oa_best_race WHERE trackid=".$i." ORDER BY time";
		if ($result = mysqli_query($link, $s)) {
			$rank = 0;
			$b = false;
			while ($row = mysqli_fetch_assoc($result)) {
				++$rank;
				if ((int)$row['time'] === (int)$times[$i] && !$b) {
					$b = true;
					$toPush = [$row['time'], $rank];
				}
			}
			if ($b) {
				array_push($toPush, $rank);
				$replays[$i] = $toPush;
			}
		}
	}
}

//echo JSON_encode($times);
echo JSON_encode($replays);
?>
