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
	$quer = "INSERT INTO PRE_TEMP_DATA (ID, SEASON, PLAYER_ID, TEAM_VALUE, BALANCE, PROPERTY, UPDATE_DTM, INSERT_DTM)  VALUES ('0','3','";
	$quer .=  $value->playerId . "','" . $value->teamval . "','" . $value->balance . "','" . $value->property . "', STR_TO_DATE('" . $value->insertDate .  "','%d-%m-%Y'), STR_TO_DATE('" . $value->insertDate . "','%d-%m-%Y'));";
	$sql .= $quer;
}
  echo $sql;
	
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
//  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
//if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
//} 
//
//if ($conn->multi_query("CALL UPDATE_CUM()") === TRUE) {
//	echo "procedure successful";
//}	
//
//$conn->close();

?>