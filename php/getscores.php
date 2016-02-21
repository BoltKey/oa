<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
header('Access-Control-Allow-Origin: http://localhost');
require ('db_connect.php');
$replays = [];
$s = "SELECT * FROM oa_best_race WHERE trackid=".$_POST["map"]." ORDER BY time";
if ($result = mysqli_query($link, $s)) {
	$i = 0;
	while ($row = mysqli_fetch_assoc($result)) {
		if (($i < $_POST['max'] && $_POST['bests'] === 'true' && $row['userid'] !== $_POST['userid']) || ($row['userid'] === $_POST['userid'] && $_POST['own'] === 'true')) {
			$topush = [$row['userid'], $row['userid']];
			if ($_POST['replay'] === 'true')  // wut 
				array_push($topush, JSON_decode($row["replay"]));
			else 
				array_push($topush, $row['time']);
			array_push($replays, $topush);
			++$i;
		}
	}
}

for ($i = 0; $i < count($replays); ++$i) {
	$s = "SELECT * FROM oa_users WHERE id=".$replays[$i][0];
	if ($result = mysqli_query($link, $s)) {
		$done = false;
		while ($row = mysqli_fetch_assoc($result)) {
			if (!$done) {
				$replays[$i][0] = $row["name"];
				$done = true;
			}
		}
	}
	else {
		echo "didn't do the query: ";
		echo mysqli_error($link);
	}
}
echo JSON_encode($replays);
?>
