<?php
require 'backend/api/db.php';
$res = $conn->query("SELECT * FROM prescriptions LIMIT 0");
if (!$res) {
    die("Error: " . $conn->error);
}
$fields = $res->fetch_fields();
$cols = [];
foreach ($fields as $field) {
    $cols[] = $field->name;
}
echo "Current Columns in DB: " . implode(", ", $cols);
?>
