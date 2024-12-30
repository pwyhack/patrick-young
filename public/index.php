<?php
require __DIR__ . '/../vendor/autoload.php';

use Spatie\YamlFrontMatter\YamlFrontMatter;
use Parsedown;

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// If it's a post request
if (preg_match('/^posts\/(.+)$/', $uri, $matches)) {
    $slug = $matches[1];
    $filepath = __DIR__ . "/../content/posts/{$slug}.md";

    if (!file_exists($filepath)) {
        header('Location: /');
        exit;
    }

    $document = YamlFrontMatter::parseFile($filepath);
    $parsedown = new Parsedown();
    $content = $parsedown->text($document->body());
    
    require __DIR__ . '/templates/post.php';
    exit;
}

// Home page
function getPosts() {
    $posts = [];
    $files = glob(__DIR__ . '/../content/posts/*.md');
    
    foreach ($files as $file) {
        $document = YamlFrontMatter::parseFile($file);
        $posts[] = [
            'slug' => basename($file, '.md'),
            'title' => $document->matter('title'),
            'date' => $document->matter('date'),
            'description' => $document->matter('description')
        ];
    }
    
    usort($posts, fn($a, $b) => strtotime($b['date']) - strtotime($a['date']));
    return $posts;
}

$posts = getPosts();
require __DIR__ . '/templates/home.php'; 