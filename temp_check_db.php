<?php
require 'backend/api/db.php';
$res = $conn->query('DESCRIBE prescriptions');
if (!$res) {
    die("Error: " . $conn->error);
}
while($row = $res->fetch_assoc()) {
    echo $row['Field'] . " (" . $row['Type'] . ")\n";
}
?>
