<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT ren.id, pi.PLAYER_ID, pi.PLAYER_NAME, pi2.PLAYER_ID, pi2.PLAYER_NAME, ren.TYPE_TXN, RENEWED_PLAYER, PLAYER_VALUE, RENEW_FEE, GW_RENEW, UNLOCK_GW FROM RENEW_PLAYERS_DATA ren join PLAYERS_INFO pi on ren.PLAYER_ID = pi.PLAYER_ID left join PLAYERS_INFO pi2 on ren.PLAYER_DEST_ID = pi2.PLAYER_ID WHERE season = 3 order by TYPE_TXN asc, ren.id desc ";
$result = $conn->query($sql);

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('id' => $row[0], 'managerid' => $row[1], 'manager' => $row[2], 'managerdestid' => $row[3], 'managerdest' => $row[4], 'txntype' => $row[5], 'player' => $row[6], 'playervalue' => $row[7], 'renewclause' => $row[8], 'gwrenovation' => $row[9], 'gwunlock' => $row[10]);
        $json[]=$arr;
    }
}

echo json_encode($json);

$conn->close();

?>