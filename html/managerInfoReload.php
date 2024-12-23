<?php
include 'properties.php';

$sql = "SELECT PLAYER_NAME,PLAYER_DESC,PLAYERS_INFO.REPUTATION,si.REPUTATION,SPONSORS.SRC_LOGO,TV_RIGHTS.SRC_LOGO,LEAGUE,CHAMPIONS,UEFA,CUP,EUROPCUP,WORLDCUP FROM PLAYERS_INFO JOIN SPONSORS ON PLAYERS_INFO.SPONSOR = SPONSORS.ID join TV_RIGHTS on TV_RIGHTS.ID = PLAYERS_INFO.TV_RIGHTS join STADIUM_INFO si on si.PLAYER_ID = PLAYERS_INFO.PLAYER_ID order by si.player_id";
$result = $conn->query($sql);

$arr = "";
$i = 0;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('id' => $i, 'manager' => $row[0], 'desc' => $row[1], 'reputation' => $row[2], 'stadium' => $row[3],  'sponsor' => $row[4], 'tvrights' => $row[5], 'league' => $row[6], 'champions' => $row[7] ,'uefa' => $row[8], 'cup' => $row[9], 'euro' => $row[10], 'worldcup' => $row[11]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>