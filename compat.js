// Compatibility layer for transitioning from Jurassic theme to AquaWave theme
// This ensures that any code relying on dinosaur elements still functions

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're using the AquaWave theme by looking for sea-creature-layer
    const isWaterTheme = document.getElementById('sea-creature-layer') !== null;
    
    if (isWaterTheme) {
        // Create compatibility mappings for dinosaur elements
        ensureDinosaurLayer();
        
        // Map existing dinosaur functions to fish functions
        handleDinosaurCompatibility();
    }
});

// Create a dinosaur layer if it doesn't exist, map it to sea creatures
function ensureDinosaurLayer() {
    if (!document.getElementById('dinosaur-layer')) {
        const dinoLayer = document.createElement('div');
        dinoLayer.id = 'dinosaur-layer';
        dinoLayer.style.display = 'none'; // Hide it but make it available for JS
        document.body.appendChild(dinoLayer);
        
        // Map any future dinosaur additions to be fish instead
        const originalAppendChild = dinoLayer.appendChild;
        dinoLayer.appendChild = function(child) {
            // Convert dinosaurs to fish
            if (child.classList.contains('dino') || child.classList.contains('ptero')) {
                const seaCreatureLayer = document.getElementById('sea-creature-layer');
                if (seaCreatureLayer) {
                    // Convert dino types to fish types
                    if (child.classList.contains('raptor')) {
                        child.classList.remove('dino', 'raptor');
                        child.classList.add('fish', 'koi');
                    } else if (child.classList.contains('trice') || child.classList.contains('trex')) {
                        child.classList.remove('dino', 'trice', 'trex');
                        child.classList.add('fish', 'tropical');
                    } else if (child.classList.contains('ptero')) {
                        child.classList.remove('ptero');
                        child.classList.add('fish', 'koi');
                    }
                    
                    // Add to sea creature layer instead
                    return seaCreatureLayer.appendChild(child);
                }
            }
            
            // Fall back to original behavior
            return originalAppendChild.call(this, child);
        };
    }
}

// Override any dinosaur-spawning functions to use fish
function handleDinosaurCompatibility() {
    // If the original functions exist in main.js
    if (typeof initDinoSpawner === 'function') {
        // Replace with empty function since our aquawave.js handles it now
        window.initDinoSpawner = function() {
            console.log('Dinosaur spawning replaced by fish spawning');
        };
    }
    
    if (typeof createPtero === 'function') {
        // Replace with a function that creates fish instead
        window.createPtero = function() {
            console.log('Pterodactyl replaced by fish');
            // The fish spawner in aquawave.js will handle creating fish
        };
    }
} 