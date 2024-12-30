<?php
require __DIR__ . '/vendor/autoload.php';

use Spatie\YamlFrontMatter\YamlFrontMatter;
use Parsedown;

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// Debug information
error_log("Requested URI: " . $uri);

// If it's a post request
if (preg_match('/^posts\/(.+)$/', $uri, $matches)) {
    $slug = $matches[1];
    $filepath = __DIR__ . "/content/posts/{$slug}.md";
    
    error_log("Looking for file: " . $filepath);
    
    if (!file_exists($filepath)) {
        error_log("File not found: " . $filepath);
        header('Location: /');
        exit;
    }

    try {
        $document = YamlFrontMatter::parseFile($filepath);
        $parsedown = new Parsedown();
        $content = $parsedown->text($document->body());
        
        require __DIR__ . '/templates/post.php';
    } catch (Exception $e) {
        error_log("Error processing post: " . $e->getMessage());
        header('Location: /');
    }
    exit;
}

// Home page
function getPosts() {
    $posts = [];
    $files = glob(__DIR__ . '/content/posts/*.md');
    
    error_log("Found post files: " . print_r($files, true));
    
    foreach ($files as $file) {
        try {
            $document = YamlFrontMatter::parseFile($file);
            $posts[] = [
                'slug' => basename($file, '.md'),
                'title' => $document->matter('title'),
                'date' => $document->matter('date'),
                'description' => $document->matter('description')
            ];
        } catch (Exception $e) {
            error_log("Error processing file {$file}: " . $e->getMessage());
        }
    }
    
    usort($posts, fn($a, $b) => strtotime($b['date']) - strtotime($a['date']));
    return $posts;
}

$posts = getPosts();
require __DIR__ . '/templates/home.php'; 