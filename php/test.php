<?php
$link = mysqli_connect("localhost", "root", "vertrigo", "phpmyadmin");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// this works fine
$s = "INSERT INTO test VALUES(0, 'Geaorge')";
if (mysqli_query($link, $s)) {
	echo "inserted data ";
}
else {
	echo "nothing happened ";
}

// here it wont ever work.
$s = "UPDATE oa_best_race SET time = 900 WHERE trackid=1";
if (mysqli_query($link, $s)) {
	echo "updated data ";
}
else {
	echo "nothing happened ";
}


?>