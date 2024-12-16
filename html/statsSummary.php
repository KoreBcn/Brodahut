<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$result = "";
$param = $_GET['query'];
$season = "" . $_GET['season'];

$month = "SELECT YEAR(GI.INSERT_DTM)         AS YEAR,   NULL             AS monthnum,   MONTH,   pi.PLAYER_NAME                   AS PLAYER_NAME,   (SELECT team_value   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MAX(GI.GAMEWEEK)   ) -   (SELECT team_value   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MIN(GI.GAMEWEEK)-1   ) AS team_growth,   (SELECT balance   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MAX(GI.GAMEWEEK)   ) -   (SELECT balance   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MIN(GI.GAMEWEEK)-1   ) AS balance_growth,    (SELECT PROPERTY   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MAX(GI.GAMEWEEK)   ) -   (SELECT PROPERTY   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON      = " . $season . "   AND GW.GAMEWEEK    = MIN(GI.GAMEWEEK)-1   )                             AS economical_growth,   (SUM(total)-SUM(team_salary)) AS total_income,   SUM(team_salary)              AS multas,   SUM(position_prize)           AS premis,   SUM(gameweek_points)          AS POINTS,   SUM(captain_points)           AS POINTS_CAPTAIN,   SUM(best_lineup)              AS best_lineup,   season FROM GAMEWEEK_INFO GI JOIN PLAYERS_INFO pi ON pi.PLAYER_ID= GI.player_id WHERE SEASON   = " . $season . " GROUP BY  MONTH,   season,   pi.PLAYER_NAME   ORDER BY 1 desc,   2 desc,POINTS desc ";
//$month = "SELECT * FROM MANAGER_MONTH_V where season = " . $season;
$year =  "SELECT NULL AS YEAR,   NULL      AS monthnum,   'Season'  AS MONTH,   pi.PLAYER_NAME as PLAYER_NAME,   (SELECT team_value   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MAX(GI.GAMEWEEK)   ) -   (SELECT team_value   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MIN(GI.GAMEWEEK)   ) AS team_growth,   (SELECT balance   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MAX(GI.GAMEWEEK)   ) -   (SELECT balance   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MIN(GI.GAMEWEEK)   ) AS balance_growth,   (SELECT PROPERTY   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MAX(GI.GAMEWEEK)   ) -   (SELECT PROPERTY   FROM GAMEWEEK_INFO GW   WHERE GW.PLAYER_ID = GI.PLAYER_ID   AND GW.SEASON        = " . $season . "   AND GW.GAMEWEEK      = MIN(GI.GAMEWEEK)   )                             AS economical_growth,   (SUM(total)-SUM(team_salary)) AS total_income,   SUM(team_salary)              AS multas,   SUM(position_prize)           AS premis,   SUM(gameweek_points)          AS POINTS,   SUM(captain_points)           AS POINTS_CAPTAIN,   SUM(best_lineup)              AS best_lineup,   season FROM GAMEWEEK_INFO GI join PLAYERS_INFO pi on pi.PLAYER_ID= GI.player_id WHERE season = " . $season . " GROUP BY season,   pi.PLAYER_NAME ORDER BY 4 DESC" ;
//$year = "SELECT * FROM MANAGER_SEASON_V where season = " . $season; 

//echo $month;	
//echo strcmp($param,"month");
if(strcmp($param,"month")==0){
  $result = $conn->query($month);
}elseif(strcmp($param,"season")==0){
  $result = $conn->query($year);
}

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
		$arr = array('month' => $row[2], 'name' => $row[3], 'teamgrowth' => $row[4], 'balancegrowth' => $row[5], 'net' => $row[6], 'total_income' => $row[7],'penal' => $row[8], 'prize' => $row[9], 'points' => $row[10], 'cappoints' => $row[11], 'onzeideal' => $row[12]);
        //  cast results to specific data types
        $json[]=$arr;
    }
}



echo json_encode($json);

$conn->close();

?>