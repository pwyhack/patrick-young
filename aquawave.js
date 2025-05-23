// AquaWave Theme - Water animation and fish spawning

// Helper function to execute after DOM content is loaded
function afterDOMContentLoaded(cb) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

// Check for reduced motion preference
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Initialize water theme
afterDOMContentLoaded(() => {
  // Create water effect layers
  createWaterLayers();
  
  // Initialize animations and effects
  initWaveParallax();
  initFishSpawner();
  initBubbleEffect();
  
  // Apply any theme-specific behavior to existing elements
  applyWaterEffectsToContent();
  
  // Initialize new features
  initWaterReflection();
  initGlowingElements();
  initPerformanceOptimizations();
});

// Create DOM elements for water effect layers
function createWaterLayers() {
  if (prefersReducedMotion()) return;
  
  const body = document.body;
  
  // Add bubble layer
  const bubbleLayer = document.createElement('div');
  bubbleLayer.className = 'bubble-layer';
  bubbleLayer.setAttribute('aria-hidden', 'true');
  body.appendChild(bubbleLayer);
  
  // Add jellyfish layer
  const jellyfishLayer = document.createElement('div');
  jellyfishLayer.className = 'jellyfish-layer';
  jellyfishLayer.setAttribute('aria-hidden', 'true');
  body.appendChild(jellyfishLayer);
  
  // Add wave surface layer
  const waveSurface = document.createElement('div');
  waveSurface.className = 'wave-surface';
  waveSurface.setAttribute('aria-hidden', 'true');
  body.appendChild(waveSurface);
  
  // Add coral layer
  const coralLayer = document.createElement('div');
  coralLayer.className = 'coral-layer';
  coralLayer.setAttribute('aria-hidden', 'true');
  body.appendChild(coralLayer);
  
  // Add sea creature container
  const seaCreatureLayer = document.createElement('div');
  seaCreatureLayer.id = 'sea-creature-layer';
  seaCreatureLayer.setAttribute('aria-hidden', 'true');
  body.appendChild(seaCreatureLayer);
  
  // Add water reflection overlay
  const reflectionOverlay = document.createElement('div');
  reflectionOverlay.className = 'reflection-overlay';
  reflectionOverlay.setAttribute('aria-hidden', 'true');
  body.appendChild(reflectionOverlay);
}

// Initialize wave parallax effect with improved performance
function initWaveParallax() {
  if (prefersReducedMotion()) return;
  
  const root = document.documentElement;
  let targetX = 0, targetY = 0;
  const lerp = (a, b, n) => a + (b - a) * n;
  let currentX = 0, currentY = 0;
  let ticking = false;

  // Pointer for desktop - optimized with requestAnimationFrame
  window.addEventListener('pointermove', e => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        targetX = ((e.clientX - w / 2) / (w / 2)) * 40; // px shift range
        targetY = ((e.clientY - h / 2) / (h / 2)) * 20;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Device tilt for mobile
  window.addEventListener('deviceorientation', e => {
    if (!e.beta && !e.gamma) return;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        targetX = (e.gamma || 0) * 1; // gamma ~ left/right
        targetY = (e.beta  || 0) * 0.5; // beta ~ front/back
        ticking = false;
      });
      ticking = true;
    }
  });

  // Use requestAnimationFrame for smooth animation
  const update = () => {
    currentX = lerp(currentX, targetX, 0.05);
    currentY = lerp(currentY, targetY, 0.05);
    
    // Only update DOM if there's significant change
    if (Math.abs(root.style.getPropertyValue('--waveShiftX') - currentX) > 0.1 ||
        Math.abs(root.style.getPropertyValue('--waveShiftY') - currentY) > 0.1) {
      root.style.setProperty('--waveShiftX', currentX.toFixed(2));
      root.style.setProperty('--waveShiftY', currentY.toFixed(2));
    }
    
    requestAnimationFrame(update);
  };
  
  update();
}

// Spawn fish at random intervals with more variety
function initFishSpawner() {
  if (prefersReducedMotion()) return;
  
  const seaCreatureLayer = document.getElementById('sea-creature-layer');
  if (!seaCreatureLayer) {
    console.warn('Sea creature layer not found for Fish Spawner!');
    return;
  }
  
  const fishTypes = ['koi', 'tropical', 'shark'];
  
  // Helper function to get random value between min and max
  const random = (min, max) => Math.random() * (max - min) + min;
  
  // Function to spawn a fish with improved variety
  const spawnFish = () => {
    // Weight the random selection to make sharks rarer
    let fishType;
    const rand = Math.random();
    if (rand < 0.45) {
      fishType = 'koi';
    } else if (rand < 0.9) {
      fishType = 'tropical';
    } else {
      fishType = 'shark'; // 10% chance for shark
    }
    
    const fish = document.createElement('div');
    fish.className = `fish ${fishType}`;
    
    // Randomize vertical position
    const verticalPos = random(20, 70);
    fish.style.top = `${verticalPos}vh`;
    
    // Randomize size slightly
    const sizeVariation = random(0.8, 1.2);
    fish.style.transform = `scale(${sizeVariation})`;
    
    // Add to the sea creature layer
    seaCreatureLayer.appendChild(fish);
    
    // Remove the fish after animation completes (plus buffer)
    const maxDuration = fishType === 'shark' ? 45000 : 35000; // max animation time (ms)
    setTimeout(() => fish.remove(), maxDuration);
  };
  
  // Schedule regular fish spawning
  const scheduleFishSpawn = () => {
    const delay = random(5000, 15000); // 5-15 seconds between fish
    setTimeout(() => {
      spawnFish();
      scheduleFishSpawn();
    }, delay);
  };
  
  // Start spawning fish
  scheduleFishSpawn();
  
  // Spawn initial fish immediately
  setTimeout(() => spawnFish(), 500);
  setTimeout(() => spawnFish(), 2000);
  setTimeout(() => {
    // Try to spawn a shark early
    const shark = document.createElement('div');
    shark.className = 'fish shark';
    shark.style.top = '40vh';
    seaCreatureLayer.appendChild(shark);
    setTimeout(() => shark.remove(), 45000);
  }, 5000);
}

// Add bubble effect on click/tap with improved performance
function initBubbleEffect() {
  if (prefersReducedMotion()) return;
  
  const seaCreatureLayer = document.getElementById('sea-creature-layer');
  if (!seaCreatureLayer) return;
  
  // Create bubble pool for reuse instead of constantly creating/destroying
  const bubblePool = [];
  const POOL_SIZE = 20;
  
  // Pre-create bubble elements
  for (let i = 0; i < POOL_SIZE; i++) {
    const bubble = document.createElement('div');
    bubble.style.position = 'fixed';
    bubble.style.width = '10px';
    bubble.style.height = '10px';
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'rgba(95, 224, 255, 0.6)';
    bubble.style.boxShadow = '0 0 5px rgba(95, 224, 255, 0.8)';
    bubble.style.zIndex = '1';
    bubble.style.pointerEvents = 'none';
    bubble.style.display = 'none';
    bubble.style.transition = 'all 2s ease-out';
    
    seaCreatureLayer.appendChild(bubble);
    bubblePool.push(bubble);
  }
  
  // Track which bubble to use next
  let nextBubbleIndex = 0;
  
  // Create a bubble on click/tap
  document.addEventListener('click', (e) => {
    // Get next available bubble
    const bubble = bubblePool[nextBubbleIndex];
    nextBubbleIndex = (nextBubbleIndex + 1) % POOL_SIZE;
    
    // Reset/show bubble
    bubble.style.transform = 'none';
    bubble.style.opacity = '1';
    bubble.style.left = `${e.clientX}px`;
    bubble.style.top = `${e.clientY}px`;
    bubble.style.display = 'block';
    
    // Create multiple bubbles for effect
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        const extraBubble = bubblePool[(nextBubbleIndex + i) % POOL_SIZE];
        extraBubble.style.transform = 'none';
        extraBubble.style.opacity = '1';
        extraBubble.style.left = `${e.clientX + (Math.random() * 20 - 10)}px`;
        extraBubble.style.top = `${e.clientY + (Math.random() * 20 - 10)}px`;
        extraBubble.style.display = 'block';
        
        // Animate extra bubble
        setTimeout(() => {
          extraBubble.style.transform = `translate(${Math.random() * 40 - 20}px, -100px) scale(${Math.random() + 0.5})`;
          extraBubble.style.opacity = '0';
        }, 10);
      }, i * 100);
    }
    
    // Animate bubble
    setTimeout(() => {
      bubble.style.transform = `translate(${Math.random() * 40 - 20}px, -100px) scale(${Math.random() + 0.5})`;
      bubble.style.opacity = '0';
    }, 10);
  });
}

// Apply water effects to existing content
function applyWaterEffectsToContent() {
  // Update writing items visibility with IntersectionObserver
  const writingItems = document.querySelectorAll('.writing-item');
  
  // Use IntersectionObserver for revealing items with water effect
  if (writingItems.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    writingItems.forEach(item => observer.observe(item));
  }
}

// Initialize water reflection effect
function initWaterReflection() {
  if (prefersReducedMotion()) return;
  
  // If reflection overlay doesn't exist, create it
  if (!document.querySelector('.reflection-overlay')) {
    const reflectionOverlay = document.createElement('div');
    reflectionOverlay.className = 'reflection-overlay';
    reflectionOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(reflectionOverlay);
  }
  
  // Make reflection respond to scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const reflectionOverlay = document.querySelector('.reflection-overlay');
    if (reflectionOverlay) {
      // Subtle parallax for reflection
      reflectionOverlay.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  });
}

// Add subtle glowing effect to key elements
function initGlowingElements() {
  if (prefersReducedMotion()) return;
  
  // Pulsing glow effect for headings
  const headings = document.querySelectorAll('.about-section h1, .writing-item h3');
  headings.forEach(heading => {
    // Create a pulsing animation
    setInterval(() => {
      const intensity = 0.5 + Math.sin(Date.now() / 1000) * 0.5; // 0-1 value
      if (heading.classList.contains('about-section h1')) {
        heading.style.textShadow = `0 0 ${5 + intensity * 5}px var(--neon-blue), 0 0 ${10 + intensity * 10}px rgba(1, 205, 254, ${0.3 + intensity * 0.2})`;
      } else {
        heading.style.textShadow = `0 0 ${3 + intensity * 3}px rgba(255, 251, 150, ${0.3 + intensity * 0.2})`;
      }
    }, 100); // Update every 100ms
  });
}

// Optimize performance for slower devices
function initPerformanceOptimizations() {
  // Detect if device might be lower-powered
  const isLowPowered = () => {
    // Check for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // More sophisticated detection could be added here
    return isMobile;
  };
  
  if (isLowPowered() && !prefersReducedMotion()) {
    // Reduce animation complexity but don't disable completely
    document.documentElement.classList.add('low-power');
    
    // Reduce fish spawning frequency
    const originalSpawnFish = initFishSpawner;
    initFishSpawner = function() {
      if (prefersReducedMotion()) return;
      
      const seaCreatureLayer = document.getElementById('sea-creature-layer');
      if (!seaCreatureLayer) return;
      
      const fishTypes = ['koi', 'tropical'];
      const random = (min, max) => Math.random() * (max - min) + min;
      
      const spawnFish = () => {
        const fishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        const fish = document.createElement('div');
        fish.className = `fish ${fishType}`;
        fish.style.top = `${random(20, 70)}vh`;
        seaCreatureLayer.appendChild(fish);
        setTimeout(() => fish.remove(), 35000);
      };
      
      // Reduced spawning rate for performance
      const scheduleFishSpawn = () => {
        const delay = random(15000, 30000); // 15-30 seconds between fish (slower)
        setTimeout(() => {
          spawnFish();
          scheduleFishSpawn();
        }, delay);
      };
      
      scheduleFishSpawn();
      setTimeout(() => spawnFish(), 1000);
    };
  }
} 