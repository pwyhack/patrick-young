<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick William Young</title>
    <!-- Preconnect for faster font fetching -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php $cssPath = '/styles.min.css'; ?>
    <link rel="stylesheet" href="<?= $cssPath ?>?v=<?= filemtime(__DIR__ . '/..' . $cssPath) ?>">
    <link rel="stylesheet" href="/jurassic.css?v=<?= filemtime(__DIR__ . '/../jurassic.css') ?>">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
<body>
    <div class="vine-layer" aria-hidden="true"></div>
    <div id="dinosaur-layer"></div>
    <div class="ground-layer" aria-hidden="true"></div>
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand">PWY</div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank">X</a>
            </div>
        </div>
    </nav>
    <div class="layer-mid" aria-hidden="true"></div>

    <section id="about" class="about-section">
        <div class="content-wrapper">
            <h1>Patrick William Young</h1>
            <div class="bio">
                <p>23, graduating from Georgia Tech in May. Sometimes I build software, but right now I think robots are the shit.</p>
                <p>Working to summon an abundant future.</p>
            </div>
        </div>
    </section>

    <section id="writings" class="writings-section">
        <div class="content-wrapper">
            <h2>Writing</h2>
            <div class="writings-grid">
                <?php foreach ($posts as $post): ?>
                <a href="/posts/<?= htmlspecialchars($post['slug']) ?>" class="writing-item">
                    <span class="writing-date"><?= date('F jS Y', strtotime($post['date'])) ?></span>
                    <h3><?= htmlspecialchars($post['title']) ?></h3>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <script src="/main.js" defer></script>
</body>
</html> 