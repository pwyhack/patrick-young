<?php
require __DIR__ . '/vendor/autoload.php';

use Blog\PostManager;

$slug = $_GET['slug'] ?? null;
if (!$slug) {
    header('Location: /');
    exit;
}

$postManager = new PostManager(__DIR__ . '/content');
$post = $postManager->getPost($slug);

if (!$post) {
    header('Location: /');
    exit;
}

require __DIR__ . '/templates/post.php'; 