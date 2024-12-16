<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];

// Convert JSON string to Object
$someObject = json_decode($data);

  $conn = new mysqli($servername, $username, $password, $dbname);
  $log = "";
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 
  $sql = "";
  // Loop through Object
foreach($someObject as $key => $value) {
	//echo $value->name . ", " . $value->id ;
	
	$quer = "UPDATE TV_RIGHTS SET DURATION = '" . $value->duration . "', UPFRONT_INCOME = '" . $value->startincome . "', BONUS = '" . $value->bonus . "',FIXED_AMOUNT = " . $value->fixed . ", VARIABLE_AMOUNT = '" . $value->variable . "', UPDATE_DTM = NOW() WHERE ID = " . $value->id . "+1;";
	
	$sql .= $quer;
	
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating TV  " . $value->channel  . PHP_EOL;

}

echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Channel updated successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating channel" . PHP_EOL;
}

$conn->close();

echo $return;


file_put_contents('./updatelogs.txt', $log, FILE_APPEND);

?>