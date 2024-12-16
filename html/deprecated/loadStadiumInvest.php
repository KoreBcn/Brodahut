<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "select player_name, total_investment from STADIUM_INFO si join PLAYERS_INFO pi on si.PLAYER_ID = pi.player_id " ;
$result = $conn->query($sql);

$finalarray = "";

$players = '"players":[';
$value = '"value":[';

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		//$arr = array('playername' => $row[0], 'totalrenew' => $row[1]);
		$players .= '"' . $row[0] . '",';
		$value .=  $row[1] . ',';
    }
}

$players = rtrim($players,", ");
$players .= "]";

$value = rtrim($value,", ");
$value .= "]";

$finalarray = '{' . $players . ',' . $value . '}';

echo $finalarray;

$conn->close();

?>