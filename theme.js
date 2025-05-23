// Ocean Mysticism Theme - Realistic Wave Simulation
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.animationFrame = null;
    
    // Realistic ocean wave parameters
    this.ocean = {
      windSpeed: 12,
      wavelength: 100,
      amplitude: 0.8,
      choppiness: 1.2,
      direction: { x: 1, z: 0.7 }
    };
    
    // Smoother ASCII gradient for water
    this.waterGradient = ' ·.¸,¸.·˜˜·.¸¸.·˜≈~≋∼∽≈≋~∼∽';
    
    // Sea creatures
    this.creatures = [];
    this.creatureTypes = [
      { art: '><>', speed: 0.8, name: 'fish' },
      { art: '<><', speed: 0.7, name: 'fish2' },
      { art: '~(°)~', speed: 0.4, name: 'jellyfish' },
      { art: 'ς>', speed: 0.5, name: 'seahorse' },
      { art: '*', speed: 0.3, name: 'starfish' },
      { art: '~θ~', speed: 0.6, name: 'octopus' },
      { art: '◉', speed: 0.2, name: 'bubble' }
    ];
    
    // Pipeline paths for creatures (invisible maze)
    this.pipelines = [
      { start: { x: -10, y: 20 }, control: { x: 40, y: 15 }, end: { x: 90, y: 25 }, depth: 0.7 },
      { start: { x: 90, y: 10 }, control: { x: 50, y: 18 }, end: { x: -10, y: 12 }, depth: 0.5 },
      { start: { x: -10, y: 30 }, control: { x: 35, y: 22 }, end: { x: 90, y: 35 }, depth: 0.9 },
      { start: { x: 90, y: 5 }, control: { x: 60, y: 8 }, end: { x: -10, y: 6 }, depth: 0.3 }
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
  
  // Gerstner wave simulation for realistic ocean movement
  gerstnerWave(x, z, time) {
    const k = 2 * Math.PI / this.ocean.wavelength; // Wave number
    const w = Math.sqrt(9.81 * k); // Angular frequency (deep water)
    const a = this.ocean.amplitude;
    const d = this.ocean.direction;
    const dot = d.x * x + d.z * z;
    
    // Gerstner wave equations
    const phase = k * dot - w * time * 0.05;
    const height = a * Math.sin(phase);
    
    // Add secondary waves for realism
    const k2 = k * 1.7;
    const w2 = Math.sqrt(9.81 * k2);
    const phase2 = k2 * (x * 0.7 + z * 0.3) - w2 * time * 0.03;
    const height2 = a * 0.4 * Math.sin(phase2);
    
    // Tertiary high-frequency ripples
    const k3 = k * 3.2;
    const phase3 = k3 * x - w2 * time * 0.08;
    const height3 = a * 0.15 * Math.sin(phase3);
    
    return height + height2 + height3;
  }
  
  // Generate ocean field with realistic wave physics
  generateOceanField(time) {
    const width = 72;
    const height = 18;
    const depth = 25;
    
    let field = [];
    
    for (let z = 0; z < depth; z++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        // Normalize coordinates
        const nx = (x - width/2) * 2;
        const nz = z * 1.5;
        
        // Calculate wave height using Gerstner waves
        let waveHeight = this.gerstnerWave(nx, nz, time);
        
        // Add some turbulence
        const turbulence = Math.sin(x * 0.1 + time * 0.02) * 
                          Math.cos(z * 0.15 - time * 0.01) * 0.3;
        
        // Depth attenuation
        const depthFactor = Math.exp(-z / depth * 2);
        waveHeight = (waveHeight + turbulence) * depthFactor;
        
        row.push(waveHeight);
      }
      field.push(row);
    }
    
    return field;
  }
  
  // Convert height to character with smooth gradients
  heightToChar(height) {
    // Normalize height to 0-1 range
    const normalized = (height + 2) / 4;
    const index = Math.floor(normalized * (this.waterGradient.length - 1));
    const clampedIndex = Math.max(0, Math.min(this.waterGradient.length - 1, index));
    return this.waterGradient[clampedIndex];
  }
  
  // Render ocean with perspective
  renderOcean(field) {
    const width = field[0].length;
    const depth = field.length;
    const viewHeight = 16;
    
    let ascii = [];
    const horizon = viewHeight * 0.35;
    
    for (let y = 0; y < viewHeight; y++) {
      let line = '';
      
      // Non-linear perspective for more natural look
      const t = (y - horizon) / (viewHeight - horizon);
      const perspectiveDepth = t * t * t; // Cubic for smoother falloff
      const z = Math.floor(Math.max(0, Math.min(depth - 1, perspectiveDepth * depth)));
      
      for (let x = 0; x < width; x++) {
        // Slight barrel distortion at edges
        const distortionFactor = 1 - Math.pow((x - width/2) / (width/2), 2) * 0.1;
        const perspectiveX = x + (x - width/2) * perspectiveDepth * 0.05 * distortionFactor;
        const sampleX = Math.floor(Math.max(0, Math.min(width - 1, perspectiveX)));
        
        const height = field[z][sampleX];
        line += this.heightToChar(height);
      }
      
      ascii.push(line);
    }
    
    return ascii;
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
      font-size: 0.8rem;
      line-height: 1;
    `;
    this.oceanContainer.style.position = 'relative';
    this.oceanContainer.appendChild(creatureLayer);
    this.creatureLayer = creatureLayer;
    
    // Spawn initial creatures
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.spawnCreature(), i * 2000);
    }
  }
  
  spawnCreature() {
    if (this.creatures.length > 8) return; // Limit creatures
    
    const type = this.creatureTypes[Math.floor(Math.random() * this.creatureTypes.length)];
    const pipeline = this.pipelines[Math.floor(Math.random() * this.pipelines.length)];
    
    const creature = {
      ...type,
      pipeline,
      progress: 0,
      element: document.createElement('div'),
      opacity: 0
    };
    
    creature.element.textContent = type.art;
    creature.element.style.cssText = `
      position: absolute;
      color: var(--text-tertiary);
      opacity: 0;
      transition: opacity 2s ease;
      transform: translate(-50%, -50%);
    `;
    
    this.creatureLayer.appendChild(creature.element);
    this.creatures.push(creature);
    
    // Fade in
    setTimeout(() => {
      creature.element.style.opacity = pipeline.depth * 0.6;
      creature.opacity = pipeline.depth * 0.6;
    }, 100);
  }
  
  updateCreatures() {
    this.creatures = this.creatures.filter(creature => {
      creature.progress += creature.speed * 0.001;
      
      if (creature.progress >= 1) {
        // Remove creature
        creature.element.style.opacity = '0';
        setTimeout(() => creature.element.remove(), 2000);
        
        // Spawn new one occasionally
        if (Math.random() < 0.3) {
          setTimeout(() => this.spawnCreature(), 1000 + Math.random() * 4000);
        }
        return false;
      }
      
      // Calculate position along quadratic bezier curve
      const t = creature.progress;
      const p = creature.pipeline;
      const x = (1-t)*(1-t)*p.start.x + 2*(1-t)*t*p.control.x + t*t*p.end.x;
      const y = (1-t)*(1-t)*p.start.y + 2*(1-t)*t*p.control.y + t*t*p.end.y;
      
      // Add gentle sine wave motion
      const wave = Math.sin(t * Math.PI * 4 + this.time * 0.05) * 2;
      
      creature.element.style.left = `${x}%`;
      creature.element.style.top = `${y + wave}%`;
      
      // Slight rotation for fish
      if (creature.name.includes('fish')) {
        const angle = Math.atan2(
          p.end.y - p.start.y,
          p.end.x - p.start.x
        ) * 180 / Math.PI;
        creature.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
      
      return true;
    });
  }
  
  updateOcean() {
    if (!this.oceanContainer) return;
    
    const field = this.generateOceanField(this.time);
    const ascii = this.renderOcean(field);
    
    // Update ocean visualization
    const oceanText = this.oceanContainer.querySelector('.ocean-text');
    if (oceanText) {
      oceanText.textContent = ascii.join('\n');
    } else {
      const textDiv = document.createElement('div');
      textDiv.className = 'ocean-text';
      textDiv.textContent = ascii.join('\n');
      this.oceanContainer.appendChild(textDiv);
    }
    
    // Update creatures
    this.updateCreatures();
  }
  
  initSubtleInteractions() {
    // Water droplet on click (not mousemove)
    document.addEventListener('click', (e) => {
      // Only on important elements
      if (!e.target.matches('a, button, .post-card')) return;
      
      const droplet = document.createElement('div');
      droplet.className = 'water-droplet';
      droplet.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: var(--icy-sky);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: droplet 1.5s ease-out forwards;
      `;
      
      document.body.appendChild(droplet);
      setTimeout(() => droplet.remove(), 1500);
    });
    
    // Add droplet animation
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
            transform: scale(1.5) translateY(0);
            opacity: 0.7;
          }
          100% {
            transform: scale(3) translateY(20px);
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
      if (window.scrollY > 50) {
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
      
      // Slower frame rate for smooth ocean (10 fps)
      setTimeout(() => {
        this.animationFrame = requestAnimationFrame(animate);
      }, 1000 / 10);
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