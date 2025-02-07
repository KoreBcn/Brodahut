<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$data = $_GET["data"];

// Convert JSON string to Object
$someObject = json_decode($data);
	

  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

  $sql = "";
  // Loop through Object
foreach($someObject as $key => $value) {
	//echo $value->name . ", " . $value->id ;
	$quer = "INSERT INTO `RENEW_PLAYERS_DATA` (`ID`, `PLAYER_ID`, `RENEWED_PLAYER`, `PLAYER_VALUE`, `RENEW_FEE`, `GW_RENEW`, `UNLOCK_GW`, `INSERT_DTM`, `UPDATE_DTM`) VALUES ('0'";
	$quer .= ",'" . $value->managerid . "','"  . $value->player . "','"  . $value->playervalue . "','" . $value->renewclause . "','" . $value->gwrenovation  . "','" . $value->gwunlock . "', NOW(), NOW());" ;
	$sql .= $quer;
}
echo $sql;

//$sql = "INSERT INTO `PAYMENTS_HIST` (`ID`, `GAMEWEEK`, `PLAYER_NAME`, `TEAM_VALUE`, `TEAM_SALARY`, `GAMEWEEK_POSITION`, `POSITION_PRIZE`, `EXTRA_PAYMENT`, `EXTRA_PAYMENT_VAL`, `CAPTAIN_POINTS`, `CAPTAIN_RATING`, `CAPTAIN_PRIZE`, `TOTAL`, `INSERT_DTM`)
// VALUES ('0', '1', 'Victor', '300000000', '3000000', '1', '3000000', '', NULL, '32', 'Onze ideal', '1200032', '-5231233', CURRENT_TIME())";
	
$return = "";

if ($conn->multi_query($sql) === TRUE) {
    //echo "New records created successfully";
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
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
	echo "procedure successful";
}	

$conn->close();

?>