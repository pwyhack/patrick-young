<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <meta name="description" content="Lost at sea in the digital ocean">
    
    <!-- Preload fonts for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/theme.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌊</text></svg>">
    
    <style>
        .error-container {
            text-align: center;
            padding: var(--space-xl) 0;
        }
        
        .error-code {
            font-size: clamp(4rem, 15vw, 8rem);
            font-weight: 700;
            line-height: 1;
            color: var(--text-primary);
            margin-bottom: var(--space-md);
            animation: glitch 3s ease-in-out infinite;
        }
        
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        .error-message {
            font-size: 1.5rem;
            color: var(--text-secondary);
            margin-bottom: var(--space-lg);
        }
        
        .error-actions {
            display: flex;
            gap: var(--space-md);
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .error-actions a {
            padding: var(--space-sm) var(--space-md);
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            transition: all var(--transition-fast);
        }
        
        .error-actions a:hover {
            background: rgba(255,255,255,0.1);
            border-color: var(--accent-aqua);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="content-wrapper">
        <nav>
            <div class="container">
                <a href="/"><h1>Patrick Young</h1></a>
            </div>
        </nav>
        
        <main>
            <div class="error-container">
                <div class="error-code">404</div>
                <p class="error-message">Adrift in unknown waters</p>
                <p>The page you seek has sunk beneath the digital waves.</p>
                
                <div class="error-actions">
                    <a href="/">Return Home</a>
                    <a href="javascript:history.back()">Go Back</a>
                </div>
            </div>
        </main>
        
        <footer>
            <p>&copy; <?= date('Y') ?> Patrick Young · Drifting through digital tides</p>
        </footer>
    </div>
    
    <script src="/theme.js"></script>
</body>
</html>