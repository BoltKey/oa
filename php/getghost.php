<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
require ('db_connect.php');
$players = JSON_decode($_POST['players']);
$replays = [];
for ($i = 0; $i < count($players); ++$i) {
	$s = "SELECT * FROM oa_best_race WHERE userid='".$players[$i]."' AND trackid=".$_POST["map"];
	if ($result = mysqli_query($link, $s)) {
		if ($row = mysqli_fetch_assoc($result)) {
			array_push($replays, JSON_decode($row['replay']));
		}
	}
	
}
echo JSON_encode($replays);
?>
