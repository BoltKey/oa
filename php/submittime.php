<?php 
header('Access-Control-Allow-Origin: http://game257530.konggames.com');
require ('db_connect.php');
echo "HEY!";
$s = "SELECT * FROM oa_best_race WHERE userid='".$_POST["userid"]."' AND trackid=".$_POST["map"];

if ($stmt = mysqli_prepare($link, $s)) {

	mysqli_stmt_execute($stmt);

	mysqli_stmt_bind_result($stmt, $id, $userid, $trackid, $time, $replay);
	$u = false;
	/* fetch values */
	while (mysqli_stmt_fetch($stmt)) {
		$u = true;
		if ($time > $_POST["time"]) {
			$s = "UPDATE oa_best_race SET time=".$_POST["time"].", replay = '".$_POST["data"].
			"' WHERE userid=".$userid." AND trackid=".$trackid."";
		}
		else {
			echo "bad time, he had ".$time;
		}
	}
	if (!$u) {
		$s = "INSERT INTO oa_best_race VALUES(0, ".$_POST["userid"].", ".$_POST["map"].", ".$_POST["time"].", '".$_POST["data"]."');";
		
	}
}
else echo "lol didn't even start";
if (mysqli_query($link, $s)) {
	echo " Query executed: ".$s;
}
else { 
	echo " I fucked up. Sorry. ";
	echo mysqli_error($link);
}
?>
