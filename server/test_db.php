<?php

require_once 'db.php';

$tablas = $db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);

header('Content-Type: application/json');
echo json_encode([
    'ok'    => true,
    'tablas' => $tablas,
]);