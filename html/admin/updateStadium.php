<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];

// Convert JSON string to Object
$someObject = json_decode($data);

$log = "";
$sql = "";

  // Loop through Object
foreach($someObject as $key => $value) {
	//echo $value->name . ", " . $value->id ;
	$quer = "UPDATE STADIUM_INFO SET STADIUM ='" . $value->stadium . "', REPUTATION = '" . $value->reputation . "', SEATS = '" . $value->seats . "', FIELD = '" . $value->field . "', STADIUM_STRUCTURE = '" . $value->structure . "', PARKING = '" . $value->pk . "', LIGHT = '" . $value->light . "', SCORE = '" . $value->score . "', TOTAL_INVESTMENT = '" . $value->investment . "', NBR_STORE = '" . $value->nbrstores . "', MARKETING_DIRECTOR = '" . $value->director . "', UPDATE_DTM = NOW() WHERE PLAYER_ID = '" . $value->id . "';"  ;
	//$quer .= ",'" . $value->gameweek . "','"  . $value->playerId . "','"  . $value->player ;
	$sql .= $quer;
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating stadium Info for player_id: " . $value->id . PHP_EOL;

}
//echo $sql;

//$sql = "INSERT INTO `PAYMENTS_HIST` (`ID`, `GAMEWEEK`, `PLAYER_NAME`, `TEAM_VALUE`, `TEAM_SALARY`, `GAMEWEEK_POSITION`, `POSITION_PRIZE`, `EXTRA_PAYMENT`, `EXTRA_PAYMENT_VAL`, `CAPTAIN_POINTS`, `CAPTAIN_RATING`, `CAPTAIN_PRIZE`, `TOTAL`, `INSERT_DTM`)
// VALUES ('0', '1', 'Victor', '300000000', '3000000', '1', '3000000', '', NULL, '32', 'Onze ideal', '1200032', '-5231233', CURRENT_TIME())";
	
$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Stadium Info updated successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating stadium" . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo $return;

file_put_contents($logfile, $log, FILE_APPEND);

$conn->close();

?>