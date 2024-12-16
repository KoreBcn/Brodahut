<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "select SRC_LOGO, UPFRONT_INCOME, EXTRA, BONUS, FIXED_AMOUNT, VARIABLE_AMOUNT from SPONSORS";
$result = $conn->query($sql);

$arr = "";
$i = 0;
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_row($result)){
        //  cast results to specific data types
		$arr = array('id' => $i, 'sponsor' => $row[0], 'startincome' => $row[1], 'extra' => $row[2], 'bonus' => $row[3],  'fixed' => $row[4], 'variable' => $row[5]);
        $json[]=$arr;
		$i++;
    }
}

echo json_encode($json);

$conn->close();

?>