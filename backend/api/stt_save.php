<?php
// backend/api/stt_save.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$transcript = $data['transcript'];
$formId = $data['form_id'] ?? 'unknown';
$fieldName = $data['field_name'] ?? 'none';

// Simple medical term extraction
$keywords = ['symptom', 'diagnosis', 'prescription', 'pain', 'fever', 'infection', 'chronic', 'acute', 'dose', 'history', 'finding', 'impression'];
$detectedTerms = [];
foreach ($keywords as $kw) {
    if (stripos($transcript, $kw) !== false) {
        $detectedTerms[] = $kw;
    }
}
$medicalTerms = implode(", ", $detectedTerms);

$stmt = $conn->prepare("INSERT INTO stt_records (form_id, field_name, transcript, detected_medical_terms) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $formId, $fieldName, $transcript, $medicalTerms);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Web Speech API transcript saved to database",
        "id" => $conn->insert_id
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save record"]);
}

$stmt->close();
$conn->close();
?>
