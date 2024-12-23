<?php
include 'properties.php';

$season = $_GET["season"];

$sql = "select POSITION,PLAYERS_INFO.PLAYER_NAME,WINS,DRAWS,LOST,GOALS_FAVOUR,GOALS_AGAINST,POINTS from EUROLEAGUE_TABLE join PLAYERS_INFO on PLAYERS_INFO.PLAYER_ID = EUROLEAGUE_TABLE.PLAYER_ID where season = " . $season . "  order by  CONVERT(SUBSTRING_INDEX(points,'-',-1),UNSIGNED INTEGER) desc, player_desc asc, (GOALS_FAVOUR-GOALS_AGAINST) desc limit 8";
$result = $conn->query($sql);

$arr = "";
$i = 1;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('position' => $i, 'player' => $row[1], 'wins' => $row[2], 'draws' => $row[3], 'lost' => $row[4], 'gf' => $row[5], 'ga' => $row[6], 'points' => $row[7]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>