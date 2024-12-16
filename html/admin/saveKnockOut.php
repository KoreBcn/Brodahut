<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];
$comp = $_GET["comp"];
$season = $_GET["season"];

// Convert JSON string to Object
//$someObject = json_decode($data);
$log = "";

echo $someObject;

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

$id = $value->id+1;
$quer = "UPDATE KNOCKOUT_TABLE SET JSON_STRING ='" . $data . "', UPDATE_DTM = NOW() WHERE TROPHY = '" . $comp . "' AND SEASON = " . $season . ";"  ;
$sql .= $quer;
$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating knocckout for " . $comp . " and season " . $season . PHP_EOL;


//echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Knockout updated successfully " . $sql . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating Knockout: " . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

file_put_contents('./updatelogs.txt', $log, FILE_APPEND);

echo $return;

?>