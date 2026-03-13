<?php
require_once 'backend/api/config.php';

// Connect without database
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conn->query($sql) === TRUE) {
    echo "Database " . DB_NAME . " created or already exists.\n";
} else {
    echo "Error creating database: " . $conn->error . "\n";
}

$conn->close();

// Now run the table creation script
require_once 'backend/api/db.php';
echo "Tables created successfully in " . DB_NAME . ".\n";
?>
