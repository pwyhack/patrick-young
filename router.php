<?php
// Router script
if (php_sapi_name() === 'cli-server') {
    $url = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    
    // Serve static files directly
    if (is_file($file)) {
        if (preg_match('/\.(?:css|js|jpg|jpeg|gif|png|ico)$/', $file)) {
            return false;
        }
    }
    
    // Everything else goes through index.php
    require __DIR__ . '/index.php';
    return true;
} 