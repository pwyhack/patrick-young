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
    $cacheFile = __DIR__ . '/cache/posts.json';

    // Gather all markdown files and determine the most recent modification time.
    $markdownFiles = glob(__DIR__ . '/posts/*.md');
    $latestMtime   = $markdownFiles ? max(array_map('filemtime', $markdownFiles)) : 0;

    // 1. Try fast-path: use cache if present and still valid.
    if (file_exists($cacheFile)) {
        $cached = json_decode(file_get_contents($cacheFile), true);
        if ($cached && isset($cached['mtime'], $cached['posts']) && $cached['mtime'] === $latestMtime) {
            return $cached['posts'];
        }
    }

    // 2. Cache miss or stale → rebuild.
    $posts = [];
    foreach ($markdownFiles as $file) {
        $document = YamlFrontMatter::parseFile($file);
        $posts[]  = [
            'slug'  => basename($file, '.md'),
            'title' => $document->matter('title'),
            'date'  => $document->matter('date'),
        ];
    }

    usort($posts, static fn ($a, $b) => strtotime($b['date']) <=> strtotime($a['date']));

    // 3. Persist to cache (fail-soft).
    @file_put_contents($cacheFile, json_encode([
        'mtime'  => $latestMtime,
        'posts'  => $posts,
    ], JSON_THROW_ON_ERROR));

    return $posts;
}

$posts = getPosts();
include __DIR__ . '/templates/home.php'; 