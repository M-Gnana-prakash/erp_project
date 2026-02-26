<?php
// backend/api/tts.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!isset($data['text']) || !isset($data['language'])) {
    http_response_code(400);
    echo json_encode(["error" => "Text and language are required"]);
    exit();
}

$text = $data['text'];
$language = $data['language'];

// Generate audio logic
// In a real application, you'd call a Cloud TTS API here (e.g., AWS Polly, Google Cloud TTS)
// Here, we simulate by "saving" an audio file (we'll just use a sample or return a fake URL,
// but for an actual demonstration without an external API, returning a fake URL or relying on Approaches A is best.
// But we must return *something* valid).

// Since we cannot generate real audio without an external API easily in a basic PHP script,
// we will just return a placeholder MP3 URL or simulate success. 
// A real integration would use file_put_contents.

$fileName = "demo_" . time() . ".mp3";
$filePath = __DIR__ . "/../audio/" . $fileName;

// Create dummy file just to show it works
file_put_contents($filePath, "dummy audio data");

// We'll return a publicly accessible placeholder MP3 for demonstration so the HTML audio tag works
// In production, return the real URL:
// $responseUrl = "http://localhost:8000/audio/" . $fileName;
$responseUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder audio

$response = [
    "status" => "success",
    "message" => "Text received: " . $text,
    "audioUrl" => $responseUrl
];

echo json_encode($response);
?>
