<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($document->matter('title')) ?> - Patrick William Young</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php 
        $cssPath = '/styles.min.css'; 
        $isSuperintelligencePost = ($slug === 'superintelligence');
    ?>
    <link rel="stylesheet" href="<?= $cssPath ?>?v=<?= filemtime(__DIR__ . '/..' . $cssPath) ?>">
    <link rel="stylesheet" href="/article-styles.css?v=<?= filemtime(__DIR__ . '/../article-styles.css') ?>">
    <link rel="stylesheet" href="/jurassic.css?v=<?= filemtime(__DIR__ . '/../jurassic.css') ?>">
    <?php if ($isSuperintelligencePost): ?>
    <link rel="stylesheet" href="/cosmic-post.css?v=<?= filemtime(__DIR__ . '/../cosmic-post.css') ?>">
    <?php endif; ?>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
</head>
<body<?= $isSuperintelligencePost ? ' class="cosmic-theme"' : '' ?>>
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand"><a href="/">PWY</a></div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank">X</a>
            </div>
        </div>
    </nav>
    <div class="layer-mid" aria-hidden="true"></div>

    <article class="article-container">
        <div class="content-wrapper">
            <header class="article-header">
                <h1><?= htmlspecialchars($document->matter('title')) ?></h1>
                <time datetime="<?= $document->matter('date') ?>">
                    <?= date('F jS Y', strtotime($document->matter('date'))) ?>
                </time>
            </header>
            
            <div class="article-content">
                <?= $content ?>
            </div>
        </div>
    </article>

    <script src="/main.js" defer></script>
</body>
</html> 