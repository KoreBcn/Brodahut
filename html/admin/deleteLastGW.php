<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$prevgw = $_GET['prevgameweek'];

$conn = new mysqli($servername, $username, $password, $dbname);
  $log = "";
// Check connection
if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "delete from GAMEWEEK_INFO where season = 8 and gameweek  = " . $prevgw;


//echo $sql;

$return = "";

if ($conn->multi_query($sql) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Gameweek " . $prevgw  ." deleted successfully" . PHP_EOL;
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Error when deleting gameweek " . $prevgw . PHP_EOL;
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo $return;

//We start a new connection to call the procedure
  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if ($conn->multi_query("CALL UPDATE_CUM()") === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Updating acumulated values after deleting gameweek " . $prevgw . PHP_EOL;
	//echo "procedure successful";
}	

file_put_contents('./updatelogs.txt', $log, FILE_APPEND);

$conn->close();

?>