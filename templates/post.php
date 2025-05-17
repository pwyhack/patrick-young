<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($document->matter('title')) ?> - Patrick William Young</title>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="/styles.css?v=<?= filemtime(__DIR__ . '/../styles.css') ?>">
    <link rel="stylesheet" href="/article-styles.css?v=<?= filemtime(__DIR__ . '/../article-styles.css') ?>">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
</head>
<body>
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand"><a href="/">PWY</a></div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank">X</a>
            </div>
        </div>
    </nav>

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
</body>
</html> 