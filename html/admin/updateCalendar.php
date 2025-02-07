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
	
	$quer = "UPDATE SEASON_CALENDAR SET DESCRIPTION = '" . $value->description . "', EURO_GK = '" . $value->eurogk . "' , UPDATE_DTM = NOW() WHERE GAMEWEEK = " . $value->gameweek . " AND SEASON = " .$defaultSeason . "";";
	
	$sql .= $quer;
	
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating Calendar in Gameweek  " . $value->gameweek  . PHP_EOL;

}

$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Executing statement: " . $sql . PHP_EOL;$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Calendar updated successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating Calendar" . PHP_EOL;
}

$conn->close();


sleep(1);
echo $return;


file_put_contents($logfile, $log, FILE_APPEND);

?>