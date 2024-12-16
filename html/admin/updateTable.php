<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

//$data = $_GET["data"];

// Convert JSON string to Object
//$someObject = json_decode($data);
$log = "";
  
//$conn = new mysqli($servername, $username, $password, $dbname);
//// Check connection
//if ($conn->connect_error) {
//	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
//    die("Connection failed: " . $conn->connect_error);
//} 
//
//$season = $_GET["season"];
//
//  $sql = "";
//  // Loop through Object
//foreach($someObject as $key => $value) {
//	//echo $value->name . ", " . $value->id ;
//	$quer = "UPDATE EUROLEAGUE_GAMES SET GOALS_HOME ='" . $value->scoreh . "', GOALS_AWAY = '" . $value->scorea . "', POINTS_HOME = '" . $value->pointsh . "', POINTS_AWAY = '" . $value->pointsa. "' WHERE PLAYER_HOME = '" . $value->homeid . "' AND PLAYER_AWAY = '" . $value->awayid . "' AND SEASON = " . $season . " ;"  ;
//	//$quer .= ",'" . $value->gameweek . "','"  . $value->playerId . "','"  . $value->player ;
//	$sql .= $quer;
//	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating Euro Game Info for match between player Id  " . $value->homeid . " vs player Id " . $value->awayid . PHP_EOL;
//}
//$log .= $sql;


//$return = "";

//if ($conn->multi_query($sql) === TRUE) {
//	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Euro Game Info updated successfully" . PHP_EOL;
//	$return = "[{}]";
//} else {
//	$return = "[{'id':1}]";
//	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating" . PHP_EOL;
//    //echo "Error: " . $sql . "<br>" . $conn->error;
//}

//$conn->close();

//echo $return;

//We start a new connection to call the procedure
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

if ($conn->multi_query("CALL CALCULATE_GOALS()") === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Results calculated  successfully" . PHP_EOL;
}

$conn->close();

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

if ($conn->multi_query("CALL UPDATE_EUROTABLE()") === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Table Euro league Info updated successfully" . PHP_EOL;
}

$conn->close();

echo $return = "[{}]";
file_put_contents('./updatelogs.txt', $log, FILE_APPEND);

?>