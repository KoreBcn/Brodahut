<?php
include 'properties.php';

$param = $_GET['query'];
$season = "" . $_GET['season'];

//$sql = "SELECT gameweek,  SUM(VICTOR) AS VICTOR,  SUM(CARLES) AS CARLES,  SUM(MARC) AS MARC,  SUM(CARLOS) AS CARLOS,  SUM(FERRI) AS FERRI,  SUM(SERGI) AS SERGI,  SUM(JAUME) AS JAUME FROM  (SELECT gameweek,    CASE      WHEN player_name = 'Victor Miquel'      THEN PAYMENT    END AS VICTOR,    CASE      WHEN player_name = 'Carles Cols'      THEN PAYMENT    END AS CARLES,    CASE      WHEN player_name = 'Marc Nicolau'      THEN PAYMENT    END AS MARC,    CASE      WHEN player_name = 'Carlos Miquel'      THEN PAYMENT    END AS CARLOS,    CASE      WHEN player_name = 'Ferri Ouyeah'      THEN PAYMENT    END AS FERRI,    CASE      WHEN player_name = 'Sergi Salord'      THEN PAYMENT    END AS SERGI,    CASE      WHEN player_name = 'Jaume Soler'      THEN PAYMENT    END AS JAUME  FROM    (SELECT gameweek,      player_name,      SUM(" . $param . ") AS PAYMENT    FROM GAMEWEEK_INFO INFO  where season = " . $season . "  GROUP BY gameweek,      player_name    ORDER BY 1    ) tab  ) tab_2 GROUP BY gameweek ORDER BY 1";
$sql = "SELECT    gameweek,    SUM(PLAYER1) AS PLAYER1,    SUM(PLAYER2) AS PLAYER2,    SUM(PLAYER3) AS PLAYER3,    SUM(PLAYER4) AS PLAYER4,    SUM(PLAYER5) AS PLAYER5,    SUM(PLAYER6) AS PLAYER6,    SUM(PLAYER7) AS PLAYER7,    SUM(PLAYER8) AS PLAYER8, SUM(PLAYER9) AS PLAYER9 FROM    (    SELECT        gameweek,CASE WHEN PLAYER_ID = 1 THEN PAYMENT END AS PLAYER1,CASE WHEN PLAYER_ID = 2 THEN PAYMENT END AS PLAYER2,CASE WHEN PLAYER_ID = 3 THEN PAYMENT END AS PLAYER3,CASE WHEN PLAYER_ID = 4 THEN PAYMENT END AS PLAYER4,CASE WHEN PLAYER_ID = 5 THEN PAYMENT END AS PLAYER5,CASE WHEN PLAYER_ID = 6 THEN PAYMENT END AS PLAYER6,CASE WHEN PLAYER_ID = 7 THEN PAYMENT END AS PLAYER7,CASE WHEN PLAYER_ID = 8 THEN PAYMENT END AS PLAYER8,CASE WHEN PLAYER_ID = 9 THEN PAYMENT END AS PLAYER9 FROM    (    SELECT        gameweek,        player_id,        SUM(" . $param . ") AS PAYMENT    FROM        GAMEWEEK_INFO INFO    WHERE        season = " . $season . "    GROUP BY        gameweek,        player_id    ORDER BY        1) tab) tab_2 GROUP BY    gameweek ORDER BY    1 desc";

if($param = 'captain'){

$sql = str_replace("SUM","GROUP_CONCAT",$sql);  

}
$result = $conn->query($sql);

$gameweek = '"gameweek":[';
$player1 = '"player1":[';
$player2 = '"player2":[';
$player3 = '"player3":[';
$player4 = '"player4":[';
$player5 = '"player5":[';
$player6 = '"player6":[';
$player7 = '"player7":[';
$player8 = '"player8":[';
$player9 = '"player9":[';

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('gameweek' => $row[0], 'player1' => $row[1], 'player2' => $row[2], 'player3' => $row[3],'player4' => $row[4], 'player5' => $row[5], 'player6' => $row[6], 'player7' => $row[7], 'player8' => $row[8], 'player9' => $row[9]);
		//  cast results to specific data types
        $json[]=$arr;  
  }
}

echo json_encode($json);

$conn->close();

?>