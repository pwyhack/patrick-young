<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, follow">
    <title>Page Not Found - Patrick William Young</title>
    
    <!-- Preconnect for faster font fetching -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <?php $cssPath = '/styles.min.css'; ?>
    <link rel="stylesheet" href="<?= $cssPath ?>?v=<?= filemtime(__DIR__ . '/..' . $cssPath) ?>">
    <link rel="stylesheet" href="/aquawave.css?v=<?= filemtime(__DIR__ . '/../aquawave.css') ?>">
    
    <!-- Critical fonts with display swap for better performance -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"></noscript>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></noscript>
</head>
<body>
    <!-- Water theme layers are created by JavaScript -->
    <div id="sea-creature-layer"></div>
    
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand"><a href="/">PWY</a></div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank" rel="noopener">𝕏</a>
            </div>
        </div>
    </nav>

    <section id="error-page" class="about-section">
        <div class="content-wrapper">
            <h1>404 - Ocean Floor</h1>
            <div class="bio">
                <p>You've drifted too deep. This page doesn't exist or has been moved.</p>
                <div style="margin-top: 2rem;">
                    <a href="/" style="
                        display: inline-block;
                        background: rgba(1, 205, 254, 0.2);
                        color: var(--water-highlight);
                        padding: 12px 24px;
                        border-radius: 4px;
                        text-decoration: none;
                        font-weight: 500;
                        border: 1px solid var(--neon-blue);
                        box-shadow: 0 0 15px rgba(1, 205, 254, 0.3);
                        transition: all 0.3s ease;
                    ">Return to Surface</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Defer non-critical JS -->
    <script src="/compat.js" defer></script>
    <script src="/main.js" defer></script>
    <script src="/aquawave.js" defer></script>
</body>
</html> 