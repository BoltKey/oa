<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
require ('db_connect.php');
echo "HEY!";
$s = "SELECT * FROM oa_best_race WHERE userid='".$_POST["userid"]."' AND trackid=".$_POST["map"];
if ($stmt = mysqli_prepare($link, $s)) {

	mysqli_stmt_execute($stmt);

	mysqli_stmt_bind_result($stmt, $id, $userid, $trackid, $time, $replay);
	/* fetch values */
	if (mysqli_stmt_fetch($stmt)) {
		if ($time > $_POST["time"]) {
			$s = "UPDATE oa_best_race SET time=".$_POST["time"].", replay = '".$_POST["data"].
			"' WHERE userid=".$userid." AND trackid=".$trackid."";
			$link = mysqli_connect("localhost", "root", "vertrigo", "phpmyadmin");  // I spent about two hours on this very line. Some kind of fuck up happens to $link with that fetch. I have no idea. This is not correct solution, but working one. I am so happy I got it.
		}
		else {
			echo "bad time, he had ".$time;
		}
	}
	else {
		$s = "INSERT INTO oa_best_race VALUES(0, ".$_POST["userid"].", ".$_POST["map"].", ".$_POST["time"].", '".$_POST["data"]."');";
		
	}
	if (mysqli_query($link, $s)) {
		echo " I DID SOMETHING!!!!111!!!one!!!";
	}
	else echo " I fucked up. Sorry. ".$s;
}
else echo "lol didn't even start";
?>