<?php

// Результат, который мы вернём
$result = [
    'post' => $_POST,
    'file' => 'Файл не загружался.'
];

// Обработка файла, если он был загружен
if (!empty($_FILES['upload']) && $_FILES['upload']['error'] === 0) {
    // Путь к папке, куда сохранять файл (убедись, что она существует и имеет права на запись)
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $filename = basename($_FILES['upload']['name']);
    $targetFile = $uploadDir . $filename;

    if (move_uploaded_file($_FILES['upload']['tmp_name'], $targetFile)) {
        $result['file'] = 'Файл успешно загружен: ' . $filename;
    } else {
        $result['file'] = 'Ошибка при сохранении файла.';
    }
}

// Устанавливаем заголовок, чтобы ответ был JSON
header('Content-Type: application/json; charset=utf-8');

// Отправляем данные клиенту в виде JSON с читаемой кириллицей
echo json_encode($result, JSON_UNESCAPED_UNICODE);