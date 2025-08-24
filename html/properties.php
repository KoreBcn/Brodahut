<?php
$servername = getenv('DB_HOST');
$username =  getenv('DB_USER');
$password = getenv('DB_PASS');
$dbname = getenv('DB_NAME');

$logfile = "/var/www/html/updatelogs.txt";
$defaultSeason = "9";

#Open connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>