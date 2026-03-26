<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: text/plain; charset=UTF-8');

require __DIR__ . '/Lib/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/Lib/PHPMailer/src/Exception.php';
require __DIR__ . '/Lib/PHPMailer/src/SMTP.php';

$category = $_POST['select'] ?? '';
$categoryLabelMap = [
    'movie' => '動画制作・編集',
    'web' => 'ウェブサイト制作',
    'thumb' => 'サムネイル制作',
];
$categoryLabel = $categoryLabelMap[$category]?? 'その他';

$name = $_POST['user_name'] ?? '';
$email = $_POST['user_email'] ?? '';
$massage = $_POST['user_message'] ?? '';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'was914hs@gmail.com';
    $mail->Password   = 'vshr gedx yocg wnps';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom('was914hs@gmail.com', 'STUDIO WAZ 公式サイト');
    $mail->addAddress('was914hs@gmail.com');

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $family . ' ' . $first);
    }

    $mail->isHTML (false);
    $mail->Subject = " 【公式サイト】 お問い合わせ ({$categoryLabel})";
    $mail->Body = "公式サイトからお知らせがありました。";
        "【項目】: {$category}\n" .
        "【名前】: {$family} {$first}\n" .
        "【メール】: {$email}\n" .
        "【内容】:\n{$message}\n";

    $mail->send();
    header('Location: thanks.html');
    echo "送信OK";
    exit;

} catch (Exception $e) {
    echo "メッセージが送信されませんでした。 Error: $mail->ErrorInfo";
}