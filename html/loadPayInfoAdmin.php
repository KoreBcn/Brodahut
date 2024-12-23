<?php
include 'properties.php';

//$sql = "SELECT if((select max(GAMEWEEK)+1 from GAMEWEEK_INFO where season = 3) is null,1,(select max(GAMEWEEK)+1 from GAMEWEEK_INFO where season = 3)) as GAMEWEEK, PLAYER_NAME, PLAYER_ID, REPUTATION, DATE_FORMAT(NOW(), '%M'), date_format(now(),'%d-%m-%Y') AS INSERT_DATE FROM PLAYERS_INFO LIMIT 8" ;

$sql = "SELECT if((select max(GAMEWEEK)+1 from GAMEWEEK_INFO where season = $defaultSeason) is null,1,(select max(GAMEWEEK)+1 from GAMEWEEK_INFO where season = $defaultSeason)) as GAMEWEEK, PLAYER_NAME, SI.PLAYER_ID, PLAYERS_INFO.REPUTATION, DATE_FORMAT(NOW(), '%M'), date_format(now(),'%d-%m-%Y') AS INSERT_DATE, SI.REPUTATION AS STADIUM_REP, SI.SEATS FROM PLAYERS_INFO  JOIN STADIUM_INFO SI ON SI.PLAYER_ID = PLAYERS_INFO.PLAYER_ID limit 8";
$result = $conn->query($sql);

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('gameweek' => $row[0], 'player' => $row[1], 'id' => $row[2]-1, 'playerId' => $row[2], 'reputation' => $row[3], 'month' => $row[4], 'insertDate' => $row[5], 'stadiumrep' => $row[6], 'audience' => $row[7]);
        $json[]=$arr;
    }
}

echo json_encode($json);

$conn->close();

?>