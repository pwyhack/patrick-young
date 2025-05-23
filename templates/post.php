<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php 
        $title = htmlspecialchars($document->matter('title'));
        $description = $document->matter('description') ? htmlspecialchars($document->matter('description')) : "Article by Patrick William Young"; 
        $date = date('c', strtotime($document->matter('date')));
        $isSuperintelligencePost = ($slug === 'superintelligence');
    ?>
    <title><?= $title ?> - Patrick William Young</title>
    <meta name="description" content="<?= $description ?>">
    <meta name="theme-color" content="<?= $isSuperintelligencePost ? '#000011' : '#0b0b3b' ?>">
    <link rel="canonical" href="https://<?= $_SERVER['HTTP_HOST'] ?>/posts/<?= $slug ?>">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <?php $cssPath = '/styles.min.css'; ?>
    <link rel="stylesheet" href="<?= $cssPath ?>?v=<?= filemtime(__DIR__ . '/..' . $cssPath) ?>">
    <link rel="stylesheet" href="/article-styles.css?v=<?= filemtime(__DIR__ . '/../article-styles.css') ?>">
    <?php if ($isSuperintelligencePost): ?>
    <link rel="stylesheet" href="/cosmic-post.css?v=<?= filemtime(__DIR__ . '/../cosmic-post.css') ?>">
    <?php else: ?>
    <link rel="stylesheet" href="/aquawave.css?v=<?= filemtime(__DIR__ . '/../aquawave.css') ?>">
    <?php endif; ?>
    
    <!-- Critical fonts with display swap -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <noscript><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></noscript>
    
    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:title" content="<?= $title ?> - Patrick William Young">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:url" content="https://<?= $_SERVER['HTTP_HOST'] ?>/posts/<?= $slug ?>">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="<?= $date ?>">
    <meta property="article:author" content="Patrick William Young">
    
    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@ConsumerRick">
    <meta name="twitter:title" content="<?= $title ?>">
    <meta name="twitter:description" content="<?= $description ?>">
</head>
<body<?= $isSuperintelligencePost ? ' class="cosmic-theme"' : '' ?>>
    <?php if (!$isSuperintelligencePost): ?>
    <!-- Water theme layers are created by JavaScript -->
    <div id="sea-creature-layer"></div>
    <?php else: ?>
    <div class="lightning-overlay" aria-hidden="true"></div>
    <div class="firefly-layer" aria-hidden="true"></div>
    <div class="meteor-layer" aria-hidden="true"></div>
    <div class="vine-layer" aria-hidden="true"></div>
    <div id="dinosaur-layer"></div>
    <div class="ground-layer" aria-hidden="true"></div>
    <?php endif; ?>
    
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand"><a href="/">PWY</a></div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank" rel="noopener">𝕏</a>
            </div>
        </div>
    </nav>
    
    <?php if ($isSuperintelligencePost): ?>
    <div class="layer-mid" aria-hidden="true"></div>
    <?php endif; ?>

    <article class="article-container">
        <div class="content-wrapper">
            <header class="article-header">
                <h1><?= $title ?></h1>
                <time datetime="<?= $date ?>">
                    <?= date('F jS Y', strtotime($document->matter('date'))) ?>
                </time>
            </header>
            
            <div class="article-content">
                <?= $content ?>
            </div>
            
            <footer class="article-footer">
                <a href="/" class="back-link">← Back to all posts</a>
            </footer>
        </div>
    </article>

    <?php if (!$isSuperintelligencePost): ?>
    <script src="/compat.js" defer></script>
    <?php endif; ?>
    <script src="/main.js" defer></script>
    <?php if (!$isSuperintelligencePost): ?>
    <script src="/aquawave.js" defer></script>
    <?php endif; ?>
</body>
</html> 