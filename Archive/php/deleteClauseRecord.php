<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];

// Convert JSON string to Object
$someObject = json_decode($data);
echo $someObject;
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
	$id = $value->id+1;
	$quer = "DELETE FROM RENEW_PLAYERS_DATA WHERE season = 5 and ID ='" . $value->id . "';"  ;
	$sql .= $quer;
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Deleting record from clause " . $value->id . PHP_EOL;
}
echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Record deleted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when deleting" . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}


file_put_contents('./updatelogs.txt', $log, FILE_APPEND);
$conn->close();

echo $return;

?>