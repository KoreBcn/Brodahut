<?php
include 'properties.php';

$season = "" . $_GET['season'];
$comp = "" . $_GET['comp'];

$sql = "SELECT JSON_STRING FROM `KNOCKOUT_TABLE` where TROPHY = '" . $comp . "' and SEASON = " . $season ;
$result = $conn->query($sql);

$finalarray = "";

if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$finalarray .= $row[0];
    }
}

echo $finalarray;

$conn->close();

?>