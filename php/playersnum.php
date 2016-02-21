<?php 
header('Access-Control-Allow-Origin: http://game251444.konggames.com');
header('Access-Control-Allow-Origin: http://localhost');
require ('db_connect.php');
$s = mysqli_num_rows(mysqli_query($link, "SELECT * FROM oa_users"));
echo $s;
?>
