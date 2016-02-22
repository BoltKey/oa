<?php 
header('Access-Control-Allow-Origin: http://game257530.konggames.com');
require ('db_connect.php');

$s = "SELECT * FROM oa_users WHERE name='".$_GET["name"]."'";
if ($stmt = mysqli_prepare($link, $s)) {

    /* execute statement */
    mysqli_stmt_execute($stmt);

    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $id, $name);

    /* fetch values */
    if (mysqli_stmt_fetch($stmt)) {
        echo JSON_encode(["new", $id]);
    }
	else {
		$s = "INSERT INTO oa_users VALUES(0, '".$_GET["name"]."');";
		if (mysqli_query($link, $s) === TRUE) {
			echo JSON_encode(['old', mysqli_insert_id($link)]);
		}
		else echo "didn't insert the name";
	}
}
?>