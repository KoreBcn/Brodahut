<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];

// Convert JSON string to Object
$someObject = json_decode($data);
$log = "";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

 $sql = "";
  // Loop through Object
foreach($someObject as $key => $value) {
    $id = $value->id;
	$quer = "UPDATE PLAYERS_INFO SET PLAYER_NAME ='" . $value->manager . "', PLAYER_DESC = '" . $value->desc . "', UPDATE_DTM = NOW() WHERE PLAYER_ID = '" . $id . "';"  ;
	$sql .= $quer;
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating manager Info for player_id: " . $id . PHP_EOL;
}

//echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Manager Info updated successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when updating Manager Info" . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

file_put_contents('./updatelogs.txt', $log, FILE_APPEND);

echo $return;

?>