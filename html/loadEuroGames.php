<?php
include 'properties.php';

$data = $_GET["gameweek"];
$season = $_GET["season"];

$sql = "select GAMEWEEK, GAMEWEEK_LEAGUE, pi1.PLAYER_ID as HOME_ID, pi2.PLAYER_ID as AWAY_ID, pi1.PLAYER_NAME as HOME, pi2.PLAYER_NAME, GOALS_HOME, GOALS_AWAY, POINTS_HOME, POINTS_AWAY from EUROLEAGUE_GAMES join PLAYERS_INFO pi1 on pi1.PLAYER_ID = EUROLEAGUE_GAMES.PLAYER_HOME join PLAYERS_INFO pi2 on pi2.PLAYER_ID = EUROLEAGUE_GAMES.PLAYER_AWAY where season = " . $season . " and gameweek = " . $data;
$result = $conn->query($sql);

$arr = "";
$i = 0;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('id' => $i,'gameweek' => $row[0], 'gwleague' => $row[1], 'homeid' => $row[2], 'awayid' => $row[3], 'home' => $row[4], 'away' => $row[5], 'scoreh' => $row[6], 'scorea' => $row[7], 'pointsh' => $row[8], 'pointsa' => $row[9]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>

