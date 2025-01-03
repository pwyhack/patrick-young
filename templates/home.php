<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patrick William Young</title>
    <link rel="stylesheet" href="/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-content">
            <div class="nav-brand">PWY</div>
            <div class="nav-links">
                <a href="https://twitter.com/ConsumerRick" target="_blank">X</a>
            </div>
        </div>
    </nav>

    <section id="about" class="about-section">
        <div class="content-wrapper">
            <h1>Patrick William Young</h1>
            <div class="bio">
                <p>A technologist, founder, and writer exploring artificial intelligence and human potential. Originally from Glenwood Springs, now at Georgia Tech graduating in May 2025.</p>
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
</body>
</html> 