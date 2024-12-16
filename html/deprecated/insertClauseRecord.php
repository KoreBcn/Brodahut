<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];
$log = date("d/m/Y") . " - " . date("h:i:sa") . " - Attempting insertion of data=" . $data . PHP_EOL;

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
	$quer = "INSERT INTO `RENEW_PLAYERS_DATA` (`ID`, `PLAYER_ID`, `PLAYER_DEST_ID`, `TYPE_TXN`, `RENEWED_PLAYER`, `PLAYER_VALUE`, `RENEW_FEE`, `GW_RENEW`, `UNLOCK_GW`,`SEASON`, `INSERT_DTM`, `UPDATE_DTM`) VALUES ('0'";
	$quer .= ",'" . $value->managerid . "','"  . $value->managerdestid . "','"  . $value->typetxn . "','"  . $value->player . "','"  . $value->playervalue . "','" . $value->renewclause . "','" . $value->gwrenovation  . "','" . $value->gwunlock . "','3', NOW(), NOW());" ;
	$sql .= $quer;
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Inserting record into clause " . $value->player . PHP_EOL;
}
//echo $sql;

$return = "";

$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Inserting following query " . $sql . PHP_EOL;

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Record inserted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when inserting in Clause" . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}


file_put_contents('./updatelogs.txt', $log, FILE_APPEND);
$conn->close();

echo $return;

?>