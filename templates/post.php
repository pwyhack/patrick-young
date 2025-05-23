<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($post['title']) ?> - Patrick Young</title>
    <meta name="description" content="<?= htmlspecialchars($post['description'] ?: $post['title']) ?>">
    
    <!-- Preload fonts for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/theme.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌊</text></svg>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?= htmlspecialchars($post['title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($post['description'] ?: $post['title']) ?>">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="<?= date('c', strtotime($post['date'])) ?>">
</head>
<body>
    <div class="content-wrapper">
        <nav>
            <div class="container">
                <a href="/"><h1>Patrick Young</h1></a>
                <a href="https://x.com/Consumerrick" class="nav-link" target="_blank" rel="noopener">@Consumerrick</a>
            </div>
        </nav>
        
        <main>
            <article>
                <header>
                    <h1><?= htmlspecialchars($post['title']) ?></h1>
                    <div class="post-meta">
                        <time datetime="<?= date('Y-m-d', strtotime($post['date'])) ?>">
                            <?= date('F j, Y', strtotime($post['date'])) ?>
                        </time>
                        <?php if (!empty($post['tags'])): ?>
                            <span class="separator">•</span>
                            <?php foreach ($post['tags'] as $tag): ?>
                                <span class="tag"><?= htmlspecialchars($tag) ?></span>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </header>
                
                <div class="post-content">
                    <?= $post['content'] ?>
                </div>
            </article>
            
            <div class="post-navigation">
                <a href="/" class="back-link">← Back to all posts</a>
            </div>
        </main>
        
        <footer>
            <p>&copy; <?= date('Y') ?> Patrick Young · Drifting through digital tides</p>
        </footer>
    </div>
    
    <script src="/theme.js"></script>
</body>
</html>