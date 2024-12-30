<?php
require __DIR__ . '/vendor/autoload.php';

use Spatie\YamlFrontMatter\YamlFrontMatter;

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

error_log("Requested URI: " . $uri);

// If it's a post request
if (preg_match('/^posts\/(.+)$/', $uri, $matches)) {
    $slug = $matches[1];
    $filepath = __DIR__ . "/posts/{$slug}.md";
    
    error_log("Looking for file: " . $filepath);
    
    if (!file_exists($filepath)) {
        error_log("File not found: " . $filepath);
        http_response_code(404);
        echo "Post not found";
        exit;
    }

    $document = YamlFrontMatter::parseFile($filepath);
    $parsedown = new \Parsedown();
    $content = $parsedown->text($document->body());
    
    // Post template
    include __DIR__ . '/templates/post.php';
    exit;
}

// Home page
function getPosts() {
    $posts = [];
    $files = glob(__DIR__ . '/posts/*.md');
    
    foreach ($files as $file) {
        $document = YamlFrontMatter::parseFile($file);
        $posts[] = [
            'slug' => basename($file, '.md'),
            'title' => $document->matter('title'),
            'date' => $document->matter('date')
        ];
    }
    
    usort($posts, fn($a, $b) => strtotime($b['date']) - strtotime($a['date']));
    return $posts;
}

$posts = getPosts();
include __DIR__ . '/templates/home.php'; 