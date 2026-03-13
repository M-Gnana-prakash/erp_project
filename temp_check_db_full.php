<?php
require 'backend/api/db.php';
$res = $conn->query('DESCRIBE prescriptions');
$cols = [];
while($row = $res->fetch_assoc()) {
    $cols[] = $row['Field'];
}
echo implode(", ", $cols);
?>
