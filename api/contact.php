<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$type = isset($input['type']) ? trim($input['type']) : '';
$msg = isset($input['message']) ? trim($input['message']) : '';

if (!$name || !$email || !$type || !$msg) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

$db_host = 'localhost';
$db_name = 'u268077856_JAnewsletter';
$db_user = 'u268077856_divinodivino';
$db_pass = '+M9FcAX*~2>i';

try {
    $pdo = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, type, message) VALUES (:name, :email, :type, :message)");
    $stmt->execute(['name' => $name, 'email' => $email, 'type' => $type, 'message' => $msg]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar en la base de datos']);
    exit;
}

$to = 'danielaregert@gmail.com';
$subject = "Nuevo contacto ({$type}) - 9alvarez.com";
$body = "Nuevo contacto desde 9alvarez.com\n\nNombre: {$name}\nEmail: {$email}\nTipo: {$type}\nMensaje:\n{$msg}\nFecha: " . date('Y-m-d H:i:s');
$headers = "From: noreply@9alvarez.com\r\nReply-To: {$email}";

mail($to, $subject, $body, $headers);

$file = __DIR__ . '/contacts.csv';
$isNew = !file_exists($file);
$fp = fopen($file, 'a');
if ($isNew) {
    fputcsv($fp, ['nombre', 'email', 'tipo', 'mensaje', 'fecha']);
}
fputcsv($fp, [$name, $email, $type, $msg, date('Y-m-d H:i:s')]);
fclose($fp);

echo json_encode(['ok' => true, 'message' => 'Gracias por contactarnos']);
