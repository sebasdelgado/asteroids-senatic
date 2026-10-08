<?php
// ── auth_helper.php ───────────────────────────────────────────────────────────
// Funciones compartidas para crear y verificar tokens JWT.
// Los archivos PHP que necesitan autenticación hacen: require_once 'auth_helper.php'
//
// NOTA: Esta es una implementación manual de JWT para no depender de librerías.
// En producción real se recomienda usar firebase/php-jwt via Composer.

define('JWT_SECRET', 'cambia_este_secreto_en_produccion');

// Cabeceras CORS y JSON para todos los archivos PHP
function set_headers() {
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  // Preflight
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
}

// Leer el body JSON del request
function get_body() {
  return json_decode(file_get_contents('php://input'), true) ?? [];
}

// Crear un token JWT simple (header.payload.firma)
function jwt_encode(array $payload) {
  $header  = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
  $payload['exp'] = time() + (30 * 24 * 60 * 60);  // expira en 30 días
  $body    = base64url_encode(json_encode($payload));
  $sig     = base64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
  return "$header.$body.$sig";
}

// Verificar y decodificar un token JWT
// Devuelve el payload o null si el token es inválido/expirado
function jwt_decode(string $token) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;

  [$header, $body, $sig] = $parts;
  $expected = base64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
  if (!hash_equals($expected, $sig)) return null;

  $payload = json_decode(base64url_decode($body), true);
  if (!$payload || $payload['exp'] < time()) return null;

  return $payload;
}

// Leer el token del header Authorization: Bearer <token>
// Si el token es inválido responde 401 y detiene la ejecución
function require_auth() {
  // Apache (XAMPP) no siempre pasa la cabecera Authorization a PHP
  // en $_SERVER, por eso se busca también en apache_request_headers().
  $header = $_SERVER['HTTP_AUTHORIZATION']
         ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
         ?? '';
  if (!$header && function_exists('apache_request_headers')) {
    $headers = array_change_key_case(apache_request_headers(), CASE_LOWER);
    $header  = $headers['authorization'] ?? '';
  }
  $token  = str_replace('Bearer ', '', $header);
  $user   = jwt_decode($token);

  if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'No autenticado o token expirado']);
    exit;
  }
  return $user;   // ['id' => ..., 'username' => ...]
}

// Helpers de codificación Base64 URL-safe
function base64url_encode(string $data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data) {
  return base64_decode(strtr($data, '-_', '+/'));
}