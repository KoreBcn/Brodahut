<?php
include 'properties.php';

$query = "select pi.player_id, pi.PLAYER_NAME, st.STADIUM, st.REPUTATION, case when st.REPUTATION < 2 then 'images/stadium/estadi1.png' when st.REPUTATION < 3 then 'images/stadium/estadi2.jpg' when st.REPUTATION < 4 then 'images/stadium/estadi3.jpg' when st.REPUTATION < 5 then 'images/stadium/estadi4.jpg' when st.REPUTATION < 6 then 'images/stadium/estadi5.jpg' end as picture_src, st.SEATS, st.FIELD, st.STADIUM_STRUCTURE, st.PARKING, st.LIGHT, st.SCORE, st.NBR_STORE, MARKETING_DIRECTOR, st.TOTAL_INVESTMENT from STADIUM_INFO st join PLAYERS_INFO pi on pi.PLAYER_ID = st.PLAYER_ID";

$result = $conn->query($query);

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
		$arr = array('id' => $row[0], 'manager' => $row[1], 'stadium' => $row[2], 'reputation' => $row[3], 'picstadium' => $row[4], 'seats' => $row[5], 'field' => $row[6],'structure' => $row[7], 'pk' => $row[8], 'light' => $row[9], 'score' => $row[10], 'nbrstores' => $row[11], 'director' => $row[12], 'investment' => $row[13]);
        //  cast results to specific data types
        $json[]=$arr;
    }
}

echo json_encode($json);

$conn->close();

?>