<?php

namespace Blog;

use Parsedown;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class PostManager
{
    private Parsedown $parsedown;
    private string $postsDirectory;

    public function __construct(string $postsDirectory)
    {
        $this->parsedown = new Parsedown();
        $this->postsDirectory = rtrim($postsDirectory, '/');
    }

    public function getAllPosts(): array
    {
        $files = glob($this->postsDirectory . '/*.md');
        $posts = [];

        foreach ($files as $file) {
            $slug = basename($file, '.md');
            if ($post = $this->loadPost($file)) {
                $posts[] = $post;
            }
        }

        usort($posts, fn($a, $b) => strtotime($b->getDate()) - strtotime($a->getDate()));
        return $posts;
    }

    private function loadPost(string $filepath): ?Post
    {
        if (!file_exists($filepath)) {
            return null;
        }

        $content = file_get_contents($filepath);
        $document = YamlFrontMatter::parse($content);
        $parsedContent = $this->parsedown->text($document->body());
        
        return new Post(
            basename($filepath, '.md'),
            $document->matter(),
            $parsedContent
        );
    }
} 