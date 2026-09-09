<?php
/**
 * Formulario de contacto -> Google Sheets
 *
 * Este script recibe el POST (JSON) del formulario de contacto y lo reenvía
 * a un Web App de Google Apps Script que escribe en la hoja de cálculo.
 *
 * Configuración (1 solo paso):
 *   1. Pegá la URL del Web App de Google Apps Script en la constante
 *      GOOGLE_SCRIPT_URL de abajo (termina en /exec).
 *
 * El código de Apps Script necesario está al final de este archivo (comentado).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ===== CONFIG =====
const GOOGLE_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT';
// ==================

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

$name    = trim((string) ($body['name'] ?? ''));
$email   = trim((string) ($body['email'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Completá todos los campos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

if (GOOGLE_SCRIPT_URL === '' || strpos(GOOGLE_SCRIPT_URL, 'PEGA_AQUI') !== false) {
    http_response_code(500);
    echo json_encode(['error' => 'Backend no configurado']);
    exit;
}

$payload = json_encode([
    'name'    => $name,
    'email'   => $email,
    'message' => $message,
]);

$response = null;

if (function_exists('curl_init')) {
    $ch = curl_init(GOOGLE_SCRIPT_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 20,
    ]);
    $response = curl_exec($ch);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error !== '') {
        http_response_code(500);
        echo json_encode(['error' => 'No se pudo guardar el mensaje']);
        exit;
    }
} else {
    $context = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 20,
        ],
    ]);
    $response = @file_get_contents(GOOGLE_SCRIPT_URL, false, $context);
}

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar el mensaje']);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);

/**
 * ==================== GOOGLE APPS SCRIPT ====================
 * 1. Abrí https://script.google.com y creá un proyecto nuevo.
 * 2. Pegá este código y completá el ID de tu hoja de cálculo
 *    (el de la URL: https://docs.google.com/spreadsheets/d/<ID>/edit).
 * 3. Guardá, luego en "Implementar" > "Nueva implementación" >
 *    tipo "Aplicación web":
 *      - Ejecutar como: "Yo"
 *      - Quién tiene acceso: "Cualquier persona"
 * 4. Copiá la URL que termina en /exec y pegala arriba en GOOGLE_SCRIPT_URL.
 *
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.openById('TU_SHEET_ID')
 *     .getSheets()[0];
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(),
 *     data.name,
 *     data.email,
 *     data.message
 *   ]);
 *   return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * =============================================================
 */
