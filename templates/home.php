<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick Young</title>
    <meta name="description" content="Navigating the depths of consciousness, technology, and human potential">
    
    <!-- Preload fonts for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/theme.css">
    <link rel="stylesheet" href="/sculpture.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌊</text></svg>">
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
            <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 2rem; text-align: center; font-size: 1.5rem; font-weight: bold; margin-bottom: 2rem; border-radius: 10px; animation: pulse 2s infinite;">
                🚀 DEPLOYMENT TEST - IT'S WORKING! 🚀<br>
                <span style="font-size: 1rem;">Last updated: <?= date('F j, Y g:i A') ?></span>
            </div>
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