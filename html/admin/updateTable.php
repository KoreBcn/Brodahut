<?php
include $_SERVER['DOCUMENT_ROOT'] . '/properties.php';
// Create connection

$log = "";
  
// Assuming you already have the database connection in $conn
$procedureCall = "CALL CALCULATE_GOALS()";

// Use multi_query to handle stored procedure execution
if ($conn->multi_query($procedureCall)) {
    // If the procedure executes, check for results
    do {
        // If a result set is returned (i.e., SELECT), we can process it here
        if ($result = $conn->store_result()) {
            // Process the result set (if needed)
            $result->free();
        }
        
        // If no result set, continue to the next query (if any)
    } while ($conn->next_result()); // Move to the next result set
    
    // Log successful execution
    $log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Calculate Goals procedure successfully executed." . PHP_EOL;
} else {
    // If there's an error executing the procedure, log the error
    echo "Error executing stored procedure: " . $conn->error;
}

// Close connection if needed
$conn->close();

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Connection failed: " .PHP_EOL;
    die("Connection failed: " . $conn->connect_error);
} 

$procedureCall = "CALL UPDATE_EUROTABLE()";

// Execute the query using mysqli_query (not multi_query)
if ($conn->query($procedureCall) === TRUE) {
	$log .= date("d/m/Y") . " - " . date("h:i:sa") . " - Table Euro league Info updated successfully" . PHP_EOL;
} else {
    echo "Error executing stored procedure: " . $conn->error;
}

$conn->close();

echo $return = "[{}]";

file_put_contents($logfile, $log, FILE_APPEND);

?>