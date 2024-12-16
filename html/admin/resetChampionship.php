<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$query = "DELETE from GAMEWEEK_INFO WHERE SEASON = 1"  ;

$return = "";

if ($conn->multi_query($query) === TRUE) {
    //echo "New records created successfully";
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

//We start a new connection to call the procedure
  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$query2 = "update CUM_VALUES_TEMP SET GAMEWEEK_POINTS_CUM = 0, CAPTAIN_POINTS_CUM = 0, TEAM_SALARY_CUM = 0, POSITION_PRIZE_CUM = 0, BEST_LINEUP_CUM = 0, PAYMENTS_CUM = 0, FUTMONDO_PRIZE_CUM = 0, TOTAL_CUM = 0, UPDATE_DTM = NOW()";
if ($conn->multi_query($query2) === TRUE) {
    //echo "New records created successfully";
	$return = "[{}]";
} else {
	$return = "[{'id':1}]";
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo $return;

?>