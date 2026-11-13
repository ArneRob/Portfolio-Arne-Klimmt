<?php

/**
 * Contact form of the portfolio: takes name, email and message as JSON and
 * sends them as one plain-text mail. Sender, password and recipient come
 * from a file the server sets up (gss-portfolio-mail-setup in Server-Setup),
 * never from this repository. Answers {"success": true|false}, as
 * scripts/main.js expects.
 *
 * Nginx passes only POST /mail.php here, with a brake per address in front.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

const SETTINGS_FILE = '/run/secrets/portfolio-mail';
const MAIL_HOST = 'mail.gmx.net';
const MAIL_PORT = 587;
const MAX_BODY_BYTES = 16384;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

/**
 * Sends the JSON answer and ends the request.
 *
 * @param int $status HTTP status
 * @param bool $success whether the inquiry went out
 */
function answer(int $status, bool $success): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['success' => $success]);
    exit;
}

/**
 * Reads the request body as a JSON object, or ends the request.
 *
 * @return array<string, mixed>
 */
function readRequest(): array
{
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
        answer(415, false);
    }
    $body = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
    if ($body === false || strlen($body) > MAX_BODY_BYTES) {
        answer(413, false);
    }
    $request = json_decode($body, true);
    if (!is_array($request)) {
        answer(400, false);
    }
    return $request;
}

/**
 * Returns a field as trimmed text, or ends the request if it is missing,
 * not text, not valid UTF-8, empty or too long.
 *
 * @param array<string, mixed> $request decoded request
 * @param string $field field name
 * @param int $maxLength longest allowed value, in characters
 */
function textField(array $request, string $field, int $maxLength): string
{
    $value = $request[$field] ?? null;
    if (!is_string($value) || !mb_check_encoding($value, 'UTF-8')) {
        answer(422, false);
    }
    $value = trim($value);
    if ($value === '' || mb_strlen($value) > $maxLength) {
        answer(422, false);
    }
    return $value;
}

/**
 * Reads sender, password and recipient. Until the server has set the form
 * up, the file holds no settings and the form answers 503.
 *
 * @return array{sender: string, password: string, recipient: string}
 */
function readSettings(): array
{
    $settings = null;
    if (is_readable(SETTINGS_FILE)) {
        $settings = json_decode((string) file_get_contents(SETTINGS_FILE), true);
    }
    foreach (['sender', 'password', 'recipient'] as $key) {
        if (!is_array($settings) || !is_string($settings[$key] ?? null) || $settings[$key] === '') {
            answer(503, false);
        }
    }
    return $settings;
}

/**
 * Sends the inquiry as plain text from the form's own account. The visitor's
 * address only becomes the Reply-To: GMX sends nothing in someone else's
 * name.
 *
 * @param array{sender: string, password: string, recipient: string} $settings
 * @param string $name visitor's name, without line breaks
 * @param string $email visitor's address, validated
 * @param string $message visitor's message
 * @throws Exception when the mail server refuses or cannot be reached
 */
function sendInquiry(array $settings, string $name, string $email, string $message): void
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = MAIL_HOST;
    $mail->Port = MAIL_PORT;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Username = $settings['sender'];
    $mail->Password = $settings['password'];
    $mail->Timeout = 20;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($settings['sender'], 'Kontaktformular Portfolio');
    $mail->addAddress($settings['recipient']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Kontaktanfrage von ' . $name;
    $mail->Body = "Name: {$name}\nE-Mail: {$email}\n\n{$message}\n";
    $mail->send();
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    answer(405, false);
}
$request = readRequest();
$name = textField($request, 'name', MAX_NAME_LENGTH);
if (preg_match('/[\r\n]/', $name) === 1) {
    answer(422, false);
}
$email = textField($request, 'email', MAX_EMAIL_LENGTH);
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    answer(422, false);
}
$message = textField($request, 'message', MAX_MESSAGE_LENGTH);
$settings = readSettings();
try {
    sendInquiry($settings, $name, $email, $message);
} catch (Exception $error) {
    // The log stays without the visitor's data: PHPMailer names addresses in
    // its errors.
    error_log('Kontaktformular: Versand gescheitert - '
        . preg_replace('/[^\s<>()"]+@[^\s<>()"]+/', '<Adresse>', $error->getMessage()));
    answer(502, false);
}
answer(200, true);
