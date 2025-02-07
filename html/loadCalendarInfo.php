<?php
include 'properties.php';

$sql = "SELECT GAMEWEEK, DESCRIPTION, EURO_GK FROM `SEASON_CALENDAR` WHERE SEASON = $defaultSeason";
$result = $conn->query($sql);

$arr = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('gameweek' => $row[0], 'description' => $row[1], 'eurogk' => $row[2]);
        $json[]=$arr;
    }
}

echo json_encode($json);

$conn->close();

?>