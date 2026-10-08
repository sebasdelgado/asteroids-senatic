<?php

define('DB_HOST', '127.0.0.1');
define('DB_PORT', 3306);
define('DB_NAME', 'asteroids');
define('DB_USER', 'root');
define('DB_PASS', '');

try {

    $db = new PDO (
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE   => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_STRINGIFY_FETCHES  => false,
        ]
    );

} catch ( PDOExeption $e ) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
    exit;
}