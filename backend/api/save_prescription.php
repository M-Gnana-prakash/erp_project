<?php
// backend/api/save_prescription.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit();
}

$patientName = $data['patientName'] ?? '';
$age = $data['age'] ?? '';
$gender = $data['gender'] ?? '';
$clinicalHistory = $data['clinicalHistory'] ?? '';
$findings = $data['findings'] ?? '';
$technique = $data['technique'] ?? '';
$impression = $data['impression'] ?? '';

$stmt = $conn->prepare("INSERT INTO prescriptions (patient_name, age, gender, clinical_history, technique, findings, impression) VALUES (?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("sssssss", 
    $patientName,
    $age,
    $gender,
    $clinicalHistory,
    $technique,
    $findings,
    $impression
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Prescription saved successfully",
        "id" => $conn->insert_id
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save prescription: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>
