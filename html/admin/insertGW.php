<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

$data = $_GET["data"];
$log = date("d/m/Y") . " - " . date("h:i:sa") . " - Attempting insertion of data=" . $data . PHP_EOL;

// Convert JSON string to Object
$someObject = json_decode($data);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

  $sql = "INSERT INTO GAMEWEEK_INFO (ID, SEASON, MONTH, GAMEWEEK, PLAYER_ID, PLAYER_NAME, TEAM_VALUE, TEAM_SALARY, BALANCE, PROPERTY, GAMEWEEK_POSITION, GAMEWEEK_POINTS, POSITION_PRIZE, BEST_LINEUP, TV_RIGHTS, MATCHTYPE, AUDIENCE, EXTRA_PAYMENT, EXTRA_PAYMENT_VAL, CAPTAIN, CAPTAIN_POINTS, CAPTAIN_RATING, CAPTAIN_PRIZE, FUTMONDO_PRIZE, PAYMENT, TOTAL, UPDATE_DTM, INSERT_DTM)  VALUES ";
 // Loop through Object
  
foreach($someObject as $key => $value) {

	
	$quer = "('0','8','" . $value->month . "','"  . $value->gameweek . "','"  . $value->playerId . "','"  . $value->player . "','" . $value->teamval . "','" . $value->penal  . "','" . $value->balance . "','" . $value->property . "','" . $value->pos . "','" . $value->points . "','" . $value->prizepos . "','0','0','" . $value->matchtype . "','" . $value->stadiuminc . "','" . $value->extracon  . "','"  . $value->extraval . "','" . $value->captain . "','" . $value->cappoints  . "','" . $value->caprating . "','"  . $value->prizecap . "'," . $value->totalfut . "," . $value->payment . "," . $value->totalfut . "+" . $value->payment . ", NOW(), NOW())," ;
	$sql .= $quer;
}

//Remove last coma and add semicolon;

$sql = substr($sql, 0, -1) . ";";

//echo $sql;
$return = "";

$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Inserting following query " . $sql . PHP_EOL;

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Gameweek information inserted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when Inserting gameweek Info" . PHP_EOL;
}

$conn->close();

echo $return;

file_put_contents($logfile, $log, FILE_APPEND);

#makesure we have a backup for each line inserted
include_once '/var/www/html/backupMysql.php'; 

?>