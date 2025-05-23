// Ocean Mysticism Theme - Handcrafted Geometric Wave Mandala
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.animationFrame = null;
    
    // Sacred geometry parameters
    this.mandala = {
      centerX: 34,
      centerY: 8,
      rings: 6,
      spokes: 8,
      waveAmplitude: 0.4,
      rotationSpeed: 0.01
    };
    
    // Handcrafted wave symbols by intensity
    this.waveSymbols = {
      void: ' ',
      ripple: '·',
      gentle: '¸',
      flow: '~',
      wave: '≈',
      surge: '≋',
      peak: '∼',
      crest: '∽'
    };
    
    // Geometric island pattern (hexagonal sacred geometry)
    this.islandCore = [
      '    ◊    ',
      '   ◊▲◊   ',
      '  ◊▲█▲◊  ',
      ' ◊▲█◊█▲◊ ',
      '◊▲█◊ ◊█▲◊',
      ' ◊▲█◊█▲◊ ',
      '  ◊▲█▲◊  ',
      '   ◊▲◊   ',
      '    ◊    '
    ];
    
    // Creature paths following golden spirals
    this.creatures = [];
    this.creatureTypes = [
      { art: '><>', speed: 0.4, name: 'fish' },
      { art: '~°~', speed: 0.2, name: 'jellyfish' },
      { art: '◉', speed: 0.15, name: 'bubble' }
    ];
    
    this.init();
  }
  
  init() {
    this.initScrollEffects();
    this.initNavbar();
    this.initOceanVisualization();
    this.initCreatures();
    this.initSubtleInteractions();
    this.initReadingProgress();
    this.startAnimation();
  }
  
  initOceanVisualization() {
    // Only create ocean on homepage
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;
    
    const container = document.createElement('div');
    container.className = 'ocean-ascii';
    container.setAttribute('aria-hidden', 'true');
    
    // Insert after the intro paragraph
    const mainElement = document.querySelector('main');
    const firstParagraph = mainElement.querySelector('p');
    if (firstParagraph && firstParagraph.nextSibling) {
      firstParagraph.parentNode.insertBefore(container, firstParagraph.nextSibling);
    } else if (mainElement) {
      mainElement.appendChild(container);
    }
    
    this.oceanContainer = container;
  }
  
  // Calculate distance from center with golden ratio scaling
  distanceFromCenter(x, y) {
    const dx = x - this.mandala.centerX;
    const dy = y - this.mandala.centerY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Calculate angle from center
  angleFromCenter(x, y) {
    const dx = x - this.mandala.centerX;
    const dy = y - this.mandala.centerY;
    return Math.atan2(dy, dx);
  }
  
  // Generate wave intensity using polar coordinates and golden ratio
  getWaveIntensity(x, y, time) {
    const distance = this.distanceFromCenter(x, y);
    const angle = this.angleFromCenter(x, y);
    
    // Concentric rings following golden ratio
    const ringPhase = (distance / this.phi) * 2 * Math.PI;
    const ringWave = Math.sin(ringPhase - time * 0.02);
    
    // Radial spokes
    const spokePhase = angle * this.mandala.spokes;
    const spokeWave = Math.sin(spokePhase + time * 0.015);
    
    // Spiral component (Fibonacci spiral)
    const spiralPhase = angle + distance * 0.1 - time * 0.008;
    const spiralWave = Math.sin(spiralPhase);
    
    // Interference pattern
    const interference = ringWave * 0.5 + spokeWave * 0.3 + spiralWave * 0.2;
    
    // Distance attenuation for natural falloff
    const attenuation = Math.exp(-distance / 25);
    
    return interference * attenuation;
  }
  
  // Check if point is inside sacred island geometry
  isInsideIsland(x, y) {
    const centerX = this.mandala.centerX;
    const centerY = this.mandala.centerY;
    
    // Map to island core coordinates
    const islandX = Math.floor(x - centerX + 4);
    const islandY = Math.floor(y - centerY + 4);
    
    if (islandY >= 0 && islandY < this.islandCore.length &&
        islandX >= 0 && islandX < this.islandCore[islandY].length) {
      return this.islandCore[islandY][islandX] !== ' ';
    }
    return false;
  }
  
  // Get island character at position
  getIslandChar(x, y) {
    const centerX = this.mandala.centerX;
    const centerY = this.mandala.centerY;
    
    const islandX = Math.floor(x - centerX + 4);
    const islandY = Math.floor(y - centerY + 4);
    
    if (islandY >= 0 && islandY < this.islandCore.length &&
        islandX >= 0 && islandX < this.islandCore[islandY].length) {
      return this.islandCore[islandY][islandX];
    }
    return ' ';
  }
  
  // Convert wave intensity to ASCII character
  intensityToChar(intensity) {
    if (intensity < -0.6) return this.waveSymbols.void;
    if (intensity < -0.3) return this.waveSymbols.ripple;
    if (intensity < -0.1) return this.waveSymbols.gentle;
    if (intensity < 0.1) return this.waveSymbols.flow;
    if (intensity < 0.3) return this.waveSymbols.wave;
    if (intensity < 0.5) return this.waveSymbols.surge;
    if (intensity < 0.7) return this.waveSymbols.peak;
    return this.waveSymbols.crest;
  }
  
  // Generate the handcrafted wave mandala
  generateWaveMandala(time) {
    const width = 68;
    const height = 16;
    
    let mandala = [];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        
        if (this.isInsideIsland(x, y)) {
          // Sacred island geometry
          line += this.getIslandChar(x, y);
        } else {
          // Wave field with sacred geometry
          const intensity = this.getWaveIntensity(x, y, time);
          line += this.intensityToChar(intensity);
        }
      }
      mandala.push(line);
    }
    
    return mandala;
  }
  
  // Apply natural edge fading to create organic boundaries
  applyEdgeFading(mandala) {
    const height = mandala.length;
    const width = mandala[0].length;
    
    return mandala.map((line, y) => {
      return line.split('').map((char, x) => {
        // Distance from edges
        const edgeDistY = Math.min(y, height - 1 - y) / height;
        const edgeDistX = Math.min(x, width - 1 - x) / width;
        const edgeDist = Math.min(edgeDistY, edgeDistX);
        
        // Fade based on distance from edge
        const fadeThreshold = 0.15;
        if (edgeDist < fadeThreshold && char !== ' ') {
          const fadeRatio = edgeDist / fadeThreshold;
          if (fadeRatio < 0.3) return ' ';
          if (fadeRatio < 0.6) return '·';
          if (fadeRatio < 0.8) return '¸';
        }
        
        return char;
      }).join('');
    });
  }
  
  initCreatures() {
    if (!this.oceanContainer) return;
    
    // Create creature container
    const creatureLayer = document.createElement('div');
    creatureLayer.className = 'creature-layer';
    creatureLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      line-height: 1;
    `;
    this.oceanContainer.style.position = 'relative';
    this.oceanContainer.appendChild(creatureLayer);
    this.creatureLayer = creatureLayer;
    
    // Spawn creatures following golden spiral
    for (let i = 0; i < 2; i++) {
      setTimeout(() => this.spawnCreature(), i * 8000);
    }
  }
  
  spawnCreature() {
    if (this.creatures.length > 2) return;
    
    const type = this.creatureTypes[Math.floor(Math.random() * this.creatureTypes.length)];
    
    const creature = {
      ...type,
      progress: 0,
      element: document.createElement('div'),
      spiralRadius: 15 + Math.random() * 10,
      spiralSpeed: 0.3 + Math.random() * 0.2
    };
    
    creature.element.textContent = type.art;
    creature.element.style.cssText = `
      position: absolute;
      color: var(--text-tertiary);
      opacity: 0;
      transition: opacity 4s ease;
      transform: translate(-50%, -50%);
    `;
    
    this.creatureLayer.appendChild(creature.element);
    this.creatures.push(creature);
    
    // Fade in very subtly
    setTimeout(() => {
      creature.element.style.opacity = 0.25;
    }, 200);
  }
  
  updateCreatures() {
    this.creatures = this.creatures.filter(creature => {
      creature.progress += creature.speed * 0.0005;
      
      if (creature.progress >= 1) {
        creature.element.style.opacity = '0';
        setTimeout(() => creature.element.remove(), 4000);
        
        // Rare respawn
        if (Math.random() < 0.08) {
          setTimeout(() => this.spawnCreature(), 10000 + Math.random() * 15000);
        }
        return false;
      }
      
      // Golden spiral path around mandala center
      const angle = creature.progress * Math.PI * 4; // Two full rotations
      const radius = creature.spiralRadius * (1 + creature.progress * this.phi);
      
      const centerX = 50; // Percentage
      const centerY = 50;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.6; // Elliptical
      
      creature.element.style.left = `${x}%`;
      creature.element.style.top = `${y}%`;
      
      return true;
    });
  }
  
  updateOcean() {
    if (!this.oceanContainer) return;
    
    const mandala = this.generateWaveMandala(this.time);
    const fadedMandala = this.applyEdgeFading(mandala);
    
    const oceanText = this.oceanContainer.querySelector('.ocean-text');
    if (oceanText) {
      oceanText.textContent = fadedMandala.join('\n');
    } else {
      const textDiv = document.createElement('div');
      textDiv.className = 'ocean-text';
      textDiv.textContent = fadedMandala.join('\n');
      this.oceanContainer.appendChild(textDiv);
    }
    
    this.updateCreatures();
  }
  
  initSubtleInteractions() {
    // Water droplet on important clicks only
    document.addEventListener('click', (e) => {
      if (!e.target.matches('a[href], button, .post-card, .nav-link')) return;
      
      const droplet = document.createElement('div');
      droplet.className = 'water-droplet';
      droplet.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 2px;
        height: 2px;
        background: var(--icy-sky);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: droplet 1s ease-out forwards;
      `;
      
      document.body.appendChild(droplet);
      setTimeout(() => droplet.remove(), 1000);
    });
    
    if (!document.querySelector('#droplet-style')) {
      const style = document.createElement('style');
      style.id = 'droplet-style';
      style.textContent = `
        @keyframes droplet {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1) translateY(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(2) translateY(10px);
            opacity: 0;
            border: 1px solid var(--text-tertiary);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  initScrollEffects() {
    let ticking = false;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      document.body.style.setProperty('--scroll-offset', `${scrollY * 0.5}px`);
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }
  
  initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  initReadingProgress() {
    if (!window.location.pathname.startsWith('/posts/')) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = `${scrollProgress}%`;
    });
  }
  
  startAnimation() {
    const animate = () => {
      this.time++;
      this.updateOcean();
      
      // Ultra-slow for deep contemplation (4 fps)
      setTimeout(() => {
        this.animationFrame = requestAnimationFrame(animate);
      }, 1000 / 4);
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }
  
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Initialize ocean engine
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.oceanEngine = new OceanEngine();
  });
} else {
  window.oceanEngine = new OceanEngine();
}

// Smooth anchor scrolling
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.hash) {
    const target = document.querySelector(e.target.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, e.target.hash);
    }
  }
});

// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.oceanEngine) {
    window.oceanEngine.destroy();
  } else if (!document.hidden && !window.oceanEngine) {
    window.oceanEngine = new OceanEngine();
  }
});