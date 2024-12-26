<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';

$data = $_GET["data"];
$log = date("d/m/Y") . " - " . date("h:i:sa") . " - Attempting update of data=" . $data . PHP_EOL;

// Convert JSON string to Object
$someObject = json_decode($data);
	
$sql = "";

  // Loop through Object
foreach($someObject as $key => $value) {

	$quer = "UPDATE GAMEWEEK_INFO set TEAM_VALUE = " . $value->teamval . ", MONTH = '" . $value->month . "', TEAM_SALARY = " . $value->penal . ", BALANCE = " . $value->balance . ", PROPERTY = " . $value->property  . ", GAMEWEEK_POSITION = " . $value->pos . ", GAMEWEEK_POINTS = " .  $value->points . ", POSITION_PRIZE = " .  $value->prizepos . ", BEST_LINEUP = " . $value->onzeideal . ", TV_RIGHTS = " . $value->dretstv . ", MATCHTYPE = '" . $value->matchtype . "', AUDIENCE = "  . $value->stadiuminc . ", EXTRA_PAYMENT = '" . $value->extra . "', EXTRA_PAYMENT_VAL = " . $value->extraval . ", CAPTAIN = '" . $value->captain . "', CAPTAIN_POINTS = " . $value->cappoints . ", CAPTAIN_RATING = '" . $value->caprating . "', CAPTAIN_PRIZE = " . $value->prizecap . ", FUTMONDO_PRIZE = " . $value->totalfut . ", PAYMENT = " . $value->payment . ", TOTAL = " .  $value->totalfut . "+" . $value->payment . ", UPDATE_DTM = NOW() " ;
	$quer .= "WHERE 0=0 AND SEASON = " . $defaultSeason . " AND PLAYER_ID = " . $value->playerId . " AND GAMEWEEK = " . $value->gameweek . " ;";
	$sql .= $quer;
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating gameweek info for player: " . $value->name . " for gameweek " . $value->gameweek . PHP_EOL;
}

$return = "";

$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Running following update statement: " . $sql . PHP_EOL;

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Gameweek updated inserted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating gameweek Info" . PHP_EOL;
}

$conn->close();

echo $return;

file_put_contents($logfile, $log, FILE_APPEND);

?>