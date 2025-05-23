// Ocean Mysticism Theme - Flowing Geometric Wave Art
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.animationFrame = null;
    
    // Wave parameters
    this.waves = {
      amplitude: 30,
      frequency: 0.008,
      speed: 0.02,
      layers: 5
    };
    
    // Geometric elements
    this.circles = [];
    this.spirals = [];
    this.creatures = [];
    
    this.creatureTypes = [
      { symbol: '◦', size: 8, speed: 0.3 },
      { symbol: '○', size: 12, speed: 0.2 },
      { symbol: '◯', size: 6, speed: 0.4 }
    ];
    
    this.init();
  }
  
  init() {
    this.initScrollEffects();
    this.initNavbar();
    this.initGeometricOcean();
    this.initCreatures();
    this.initSubtleInteractions();
    this.initReadingProgress();
    this.startAnimation();
  }
  
  initGeometricOcean() {
    // Only create on homepage
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;
    
    // Create flowing wave container
    const container = document.createElement('div');
    container.className = 'geometric-ocean';
    
    // Insert after intro paragraph
    const mainElement = document.querySelector('main');
    const firstParagraph = mainElement.querySelector('p');
    if (firstParagraph && firstParagraph.nextSibling) {
      firstParagraph.parentNode.insertBefore(container, firstParagraph.nextSibling);
    } else if (mainElement) {
      mainElement.appendChild(container);
    }
    
    this.oceanContainer = container;
    this.createGeometricElements();
  }
  
  createGeometricElements() {
    if (!this.oceanContainer) return;
    
    // SVG for complex shapes
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.className = 'wave-svg';
    
    // Create concentric interference circles
    for (let i = 0; i < 6; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', 300 + i * 40);
      circle.setAttribute('cy', 200);
      circle.setAttribute('r', 20 + i * 25);
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'rgba(35, 88, 127, 0.1)');
      circle.setAttribute('stroke-width', '1');
      circle.className = `interference-circle circle-${i}`;
      svg.appendChild(circle);
      this.circles.push(circle);
    }
    
    // Create golden spiral
    const spiralPath = this.generateSpiralPath();
    const spiral = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    spiral.setAttribute('d', spiralPath);
    spiral.setAttribute('fill', 'none');
    spiral.setAttribute('stroke', 'rgba(35, 88, 127, 0.15)');
    spiral.setAttribute('stroke-width', '2');
    spiral.className = 'golden-spiral';
    svg.appendChild(spiral);
    
    // Create wave interference pattern
    for (let i = 0; i < 3; i++) {
      const wavePath = this.generateWavePath(i);
      const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      wave.setAttribute('d', wavePath);
      wave.setAttribute('fill', 'none');
      wave.setAttribute('stroke', `rgba(35, 88, 127, ${0.05 + i * 0.03})`);
      wave.setAttribute('stroke-width', '1.5');
      wave.className = `wave-path wave-${i}`;
      svg.appendChild(wave);
    }
    
    this.oceanContainer.appendChild(svg);
    
    // Add floating geometric particles
    this.createParticles();
  }
  
  generateSpiralPath() {
    let path = 'M400,200';
    const turns = 3;
    const maxRadius = 150;
    
    for (let i = 0; i <= turns * 360; i += 5) {
      const angle = (i * Math.PI) / 180;
      const radius = (i / (turns * 360)) * maxRadius;
      const x = 400 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle) * 0.6; // Elliptical
      path += ` L${x},${y}`;
    }
    
    return path;
  }
  
  generateWavePath(layer) {
    let path = 'M0,200';
    const amplitude = 20 + layer * 10;
    const frequency = 0.01 + layer * 0.005;
    
    for (let x = 0; x <= 800; x += 5) {
      const y = 200 + amplitude * Math.sin(x * frequency + layer * Math.PI / 3);
      path += ` L${x},${y}`;
    }
    
    return path;
  }
  
  createParticles() {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'geometric-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: radial-gradient(circle, rgba(35, 88, 127, 0.3), transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `;
      
      this.oceanContainer.appendChild(particle);
    }
  }
  
  initCreatures() {
    if (!this.oceanContainer) return;
    
    // Create minimal creatures
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.spawnCreature(), i * 5000);
    }
  }
  
  spawnCreature() {
    if (this.creatures.length > 2) return;
    
    const type = this.creatureTypes[Math.floor(Math.random() * this.creatureTypes.length)];
    
    const creature = document.createElement('div');
    creature.className = 'flow-creature';
    creature.textContent = type.symbol;
    creature.style.cssText = `
      position: absolute;
      font-size: ${type.size}px;
      color: rgba(35, 88, 127, 0.2);
      pointer-events: none;
      transition: all 3s ease;
      font-family: var(--font-mono);
    `;
    
    this.oceanContainer.appendChild(creature);
    this.creatures.push({
      element: creature,
      progress: 0,
      speed: type.speed,
      radius: 100 + Math.random() * 50
    });
  }
  
  updateGeometry() {
    if (!this.oceanContainer) return;
    
    // Animate circles
    this.circles.forEach((circle, i) => {
      const phase = this.time * 0.001 + i * Math.PI / 3;
      const scale = 1 + Math.sin(phase) * 0.1;
      const opacity = 0.1 + Math.sin(phase * 2) * 0.05;
      circle.setAttribute('transform', `scale(${scale})`);
      circle.setAttribute('stroke', `rgba(35, 88, 127, ${opacity})`);
    });
    
    // Animate wave paths
    const waves = this.oceanContainer.querySelectorAll('.wave-path');
    waves.forEach((wave, i) => {
      const newPath = this.generateAnimatedWavePath(i);
      wave.setAttribute('d', newPath);
    });
    
    // Update particles
    const particles = this.oceanContainer.querySelectorAll('.geometric-particle');
    particles.forEach((particle, i) => {
      const phase = this.time * 0.0005 + i;
      const x = 50 + Math.cos(phase) * 30;
      const y = 50 + Math.sin(phase * 1.3) * 20;
      const opacity = 0.2 + Math.sin(phase * 2) * 0.1;
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = opacity;
    });
    
    // Update creatures
    this.creatures = this.creatures.filter(creature => {
      creature.progress += creature.speed * 0.001;
      
      if (creature.progress >= 1) {
        creature.element.remove();
        
        if (Math.random() < 0.1) {
          setTimeout(() => this.spawnCreature(), 8000);
        }
        return false;
      }
      
      // Flow along curves
      const angle = creature.progress * Math.PI * 4;
      const x = 50 + Math.cos(angle) * (creature.radius / 4);
      const y = 50 + Math.sin(angle * 1.6) * 15;
      
      creature.element.style.left = `${x}%`;
      creature.element.style.top = `${y}%`;
      
      return true;
    });
  }
  
  generateAnimatedWavePath(layer) {
    let path = 'M0,200';
    const amplitude = 15 + layer * 8;
    const frequency = 0.008 + layer * 0.003;
    const timeOffset = this.time * (0.01 + layer * 0.005);
    
    for (let x = 0; x <= 800; x += 8) {
      const y = 200 + amplitude * Math.sin(x * frequency + timeOffset);
      path += ` L${x},${y}`;
    }
    
    return path;
  }
  
  initSubtleInteractions() {
    document.addEventListener('click', (e) => {
      if (!e.target.matches('a[href], button, .post-card, .nav-link')) return;
      
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        border: 1px solid rgba(35, 88, 127, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: rippleExpand 1.5s ease-out forwards;
      `;
      
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1500);
    });
    
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleExpand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(20); opacity: 0; }
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
      this.updateGeometry();
      
      // Smooth 30fps for fluid geometry
      setTimeout(() => {
        this.animationFrame = requestAnimationFrame(animate);
      }, 1000 / 30);
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