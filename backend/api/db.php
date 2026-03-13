<?php
// backend/api/db.php
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Table for storing Web Speech API transcripts
$sql = "CREATE TABLE IF NOT EXISTS stt_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id VARCHAR(50),
    field_name VARCHAR(50),
    transcript TEXT,
    detected_medical_terms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($sql);

// Table for storing final form submissions (Prescriptions)
$sqlPrescription = "CREATE TABLE IF NOT EXISTS prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255),
    age VARCHAR(10),
    gender VARCHAR(20),
    clinical_history TEXT,
    technique TEXT,
    findings TEXT,
    impression TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($sqlPrescription);
?>
