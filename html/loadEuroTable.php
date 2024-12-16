<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$season = $_GET["season"];

$sql = "select POSITION,PLAYERS_INFO.PLAYER_NAME,PLAYED,WINS,DRAWS,LOST,GOALS_FAVOUR,GOALS_AGAINST,POINTS from EUROLEAGUE_TABLE join PLAYERS_INFO on PLAYERS_INFO.PLAYER_ID = EUROLEAGUE_TABLE.PLAYER_ID where season = " . $season . "  order by  CONVERT(SUBSTRING_INDEX(points,'-',-1),UNSIGNED INTEGER) desc, player_desc asc, (GOALS_FAVOUR-GOALS_AGAINST) desc limit 8";
$result = $conn->query($sql);

$arr = "";
$i = 1;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('position' => $i, 'player' => $row[1], 'played' => $row[2], 'wins' => $row[3], 'draws' => $row[4], 'lost' => $row[5], 'gf' => $row[6], 'ga' => $row[7], 'points' => $row[8]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>