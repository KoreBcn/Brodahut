<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "select SRC_LOGO,DURATION,UPFRONT_INCOME,BONUS,FIXED_AMOUNT,VARIABLE_AMOUNT from TV_RIGHTS";
$result = $conn->query($sql);

$arr = "";
$i = 0;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('id' => $i, 'channel' => $row[0], 'duration' => $row[1], 'startincome' => $row[2], 'bonus' => $row[3],  'fixed' => $row[4], 'variable' => $row[5]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>