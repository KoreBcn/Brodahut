<?php

include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection



$conn = new mysqli($servername, $username, $password, $dbname);
  $log = "";
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

$prevgw = $_GET['prevgameweek'];
$sql = "delete from GAMEWEEK_INFO where season = $defaultSeason and gameweek  = " . $prevgw;


//echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Gameweek " . $prevgw  ." deleted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when deleting gameweek " . $prevgw . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo $return;

file_put_contents($logfile, $log, FILE_APPEND);

?>