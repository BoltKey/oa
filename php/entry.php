<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
header('Access-Control-Allow-Origin: http://localhost');
require ('db_connect.php');

$s = "SELECT * FROM oa_users WHERE name='".$_GET["name"]."'";
if ($stmt = mysqli_prepare($link, $s)) {

    /* execute statement */
    mysqli_stmt_execute($stmt);

    /* bind result variables */
    mysqli_stmt_bind_result($stmt, $id, $name);

    /* fetch values */
    if (mysqli_stmt_fetch($stmt)) {
        echo $id;
    }
	else {
		$s = "INSERT INTO oa_users VALUES(0, '".$_GET["name"]."');";
		if (mysqli_query($link, $s) === TRUE) {
			echo mysqli_insert_id($link);
		}
		else echo "didn't insert the name";
	}
}
?>