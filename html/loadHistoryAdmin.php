<?php
include 'properties.php';

//$sql2 = "SELECT GAMEWEEK, DATE_FORMAT(INSERT_DTM, '%Y-%m-%d') as INSERT_DTM, MONTH,  PLAYER_NAME, TEAM_VALUE, TEAM_SALARY, BALANCE, PROPERTY, GAMEWEEK_POSITION, GAMEWEEK_POINTS, POSITION_PRIZE, BEST_LINEUP, TV_RIGHTS, SPONSOR, AUDIENCE, EXTRA_PAYMENT, EXTRA_PAYMENT_VAL, CAPTAIN, CAPTAIN_POINTS, CAPTAIN_RATING, CAPTAIN_PRIZE, FUTMONDO_PRIZE, PAYMENT, TOTAL FROM GAMEWEEK_INFO  WHERE SEASON = 1 order by 1 desc";
$sql = "SELECT     gameweek,    date_format(gw.insert_dtm,'%Y-%m-%d') AS insert_dtm, month,    pi.player_id,     pi.player_name,     pi.reputation,     team_value,     team_salary,     balance,     property,     gameweek_position,     gameweek_points,     position_prize,     best_lineup,     gw.tv_rights,     gw.matchtype,     audience,     extra_payment,     extra_payment_val,     captain,     captain_points,     captain_rating,     captain_prize,     futmondo_prize,     payment,     total, si.reputation, si.seats FROM     GAMEWEEK_INFO gw JOIN PLAYERS_INFO pi on pi.player_id = gw.player_id join STADIUM_INFO si on si.player_id = pi.player_id WHERE     gw.season = $defaultSeason ORDER BY     1 DESC";
$result = $conn->query($sql);

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('gameweek' => $row[0], 'paydate' => $row[1], 'month' => $row[2], 'playerId' => $row[3], 'name' => $row[4], 'reputation' => $row[5], 'teamval' => $row[6],'penal' => $row[7], 'balance' => $row[8], 'property' => $row[9], 'pos' => $row[10], 'points' => $row[11], 'prizepos' => $row[12] ,'onzeideal' => $row[13],'dretstv' => $row[14],'matchtype' => $row[15],'stadiuminc' => $row[16],'extra' => $row[17], 'extraval' => $row[18], 'captain' => $row[19], 'cappoints' => $row[20], 'caprating' => $row[21], 'prizecap' => $row[22],'totalfut' => $row[23], 'payment' => $row[24], 'total' => $row[25], 'stadiumrep' => $row[26], 'audience' => $row[27]);
        $json[]=$arr;
    }
}

echo json_encode($json);

$conn->close();

?>