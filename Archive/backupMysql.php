<?php
include 'properties.php';

// Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Get All Table Names From the Database
$tables = array();
$sql = "SHOW TABLES";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_row($result)) {
    $tables[] = $row[0];
}


$sqlScript = "";
foreach ($tables as $table) {
    
    // Prepare SQLscript for creating table structure
    $query = "SHOW CREATE TABLE $table";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_row($result);
    
    $sqlScript .= "\n\n" . $row[1] . ";\n\n";
    
    
    $query = "SELECT * FROM $table";
    $result = mysqli_query($conn, $query);
    
    $columnCount = mysqli_num_fields($result);
    
    // Prepare SQLscript for dumping data for each table
    for ($i = 0; $i < $columnCount; $i ++) {
        while ($row = mysqli_fetch_row($result)) {
            $sqlScript .= "INSERT INTO $table VALUES(";
            for ($j = 0; $j < $columnCount; $j ++) {
                $row[$j] = $row[$j];
                
                if (isset($row[$j])) {
                    $sqlScript .= '"' . $row[$j] . '"';
                } else {
                    $sqlScript .= '""';
                }
                if ($j < ($columnCount - 1)) {
                    $sqlScript .= ',';
                }
            }
            $sqlScript .= ");\n";
        }
    }
    
    $sqlScript .= "\n"; 
}

if(!empty($sqlScript))
{

    $backupDir = '/var/www/html/db';
    $backupFile = $backupDir . '/backup.sql';
    
    // Ensure the directory exists
    if (!is_dir($backupDir)) {
        // Create the directory with proper permissions if it doesn't exist
        if (!mkdir($backupDir, 0755, true)) {
            die("Error: Failed to create directory '$backupDir'");
        }
    }
    
    // Ensure the file exists or create it
    if (!file_exists($backupFile)) {
        // Open the file for writing, creating it if it doesn't exist
        $fileHandler = fopen($backupFile, 'w+');
        if ($fileHandler === false) {
            die("Error: Failed to create or open file '$backupFile'");
        }
        fclose($fileHandler); // Close the file after creating it
    }
    
    #echo "File '$backupFile' is ready for use.";

    // Save the SQL script to a backup file
    $backup_file_name = '/var/www/html/db/backup.sql';
    $fileHandler = fopen($backup_file_name, 'w+');
    $number_of_lines = fwrite($fileHandler, $sqlScript);
    fclose($fileHandler); 

}
?>