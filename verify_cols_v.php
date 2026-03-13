<?php
require 'backend/api/db.php';
$res = $conn->query("SELECT * FROM prescriptions LIMIT 0");
$fields = $res->fetch_fields();
$cols = [];
foreach ($fields as $field) {
    echo $field->name . "\n";
}
?>
