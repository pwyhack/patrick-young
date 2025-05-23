<?php
require_once __DIR__ . '/vendor/autoload.php';

use Parsedown;
use Spatie\YamlFrontMatter\YamlFrontMatter;

// Initialize Parsedown
$parsedown = new Parsedown();
$parsedown->setSafeMode(false);

// Get request path
$request = $_SERVER['REQUEST_URI'];
$request = strtok($request, '?'); // Remove query string
$request = rtrim($request, '/'); // Remove trailing slash

// Cache directory
$cacheDir = __DIR__ . '/cache';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}

// Function to get all posts
function getAllPosts($cacheDir) {
    $cacheFile = $cacheDir . '/posts.json';
    $postsDir = __DIR__ . '/posts';
    
    // Check if cache exists and is fresh (1 hour)
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 3600)) {
        return json_decode(file_get_contents($cacheFile), true);
    }
    
    $posts = [];
    $files = glob($postsDir . '/*.md');
    
    foreach ($files as $file) {
        $content = file_get_contents($file);
        $document = YamlFrontMatter::parse($content);
        $slug = basename($file, '.md');
        
        $posts[] = [
            'title' => $document->title ?? 'Untitled',
            'date' => $document->date ?? date('Y-m-d', filemtime($file)),
            'description' => $document->description ?? '',
            'slug' => $slug,
            'theme' => $document->theme ?? 'default',
            'tags' => $document->tags ?? []
        ];
    }
    
    // Sort by date (newest first)
    usort($posts, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });
    
    // Cache the results
    file_put_contents($cacheFile, json_encode($posts));
    
    return $posts;
}

// Router
if ($request === '' || $request === '/') {
    // Home page
    $posts = getAllPosts($cacheDir);
    require __DIR__ . '/templates/home.php';
} elseif (preg_match('/^\/posts\/(.+)$/', $request, $matches)) {
    // Blog post
    $slug = $matches[1];
    $postFile = __DIR__ . '/posts/' . $slug . '.md';
    
    if (file_exists($postFile)) {
        $content = file_get_contents($postFile);
        $document = YamlFrontMatter::parse($content);
        
        $post = [
            'title' => $document->title ?? 'Untitled',
            'date' => $document->date ?? date('Y-m-d', filemtime($postFile)),
            'description' => $document->description ?? '',
            'content' => $parsedown->text($document->body()),
            'theme' => $document->theme ?? 'default',
            'tags' => $document->tags ?? []
        ];
        
        require __DIR__ . '/templates/post.php';
    } else {
        http_response_code(404);
        require __DIR__ . '/templates/404.php';
    }
} else {
    // 404
    http_response_code(404);
    require __DIR__ . '/templates/404.php';
}