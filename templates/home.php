<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick Young</title>
    <meta name="description" content="Navigating the depths of consciousness, technology, and human potential">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/theme.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌊</text></svg>">
</head>
<body>
    <div class="content-wrapper">
        <nav>
            <div class="container">
                <a href="/"><h1>Patrick Young</h1></a>
            </div>
        </nav>
        
        <main>
            <h1>Ocean of Thought</h1>
            <p>Navigating the depths where technology meets consciousness, where code becomes poetry.</p>
            
            <div class="post-list">
                <?php foreach ($posts as $post): ?>
                    <a href="/posts/<?= htmlspecialchars($post['slug']) ?>" class="post-card">
                        <h2><?= htmlspecialchars($post['title']) ?></h2>
                        <div class="post-meta"><?= date('F j, Y', strtotime($post['date'])) ?></div>
                        <?php if ($post['description']): ?>
                            <p class="post-description"><?= htmlspecialchars($post['description']) ?></p>
                        <?php endif; ?>
                        <?php if (!empty($post['tags'])): ?>
                            <div class="post-tags">
                                <?php foreach ($post['tags'] as $tag): ?>
                                    <span class="tag"><?= htmlspecialchars($tag) ?></span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </main>
        
        <footer>
            <p>&copy; <?= date('Y') ?> Patrick Young · Drifting through digital tides</p>
        </footer>
    </div>
    
    <script src="/theme.js"></script>
</body>
</html>