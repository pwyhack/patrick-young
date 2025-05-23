// Ocean Mysticism Theme - 3D Island Wave Simulation
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.animationFrame = null;
    
    // Ocean parameters
    this.ocean = {
      windSpeed: 6,
      wavelength: 140,
      amplitude: 0.5,
      direction: { x: 1, z: 0.3 }
    };
    
    // Depth-based ASCII characters for 3D effect
    this.depthLayers = {
      deep: ' ·.¸,¸.·˜',
      medium: '˜·.¸¸.·˜≈',
      shallow: '≈~≋∼∽≈≋',
      shore: '~∼∽-=≡',
      land: '░▒▓█▲▼'
    };
    
    // Island terrain
    this.island = {
      center: { x: 34, z: 10 },
      radius: 8,
      height: 4,
      peaks: [
        { x: 32, z: 8, height: 3.5 },
        { x: 36, z: 11, height: 2.8 },
        { x: 35, z: 9, height: 4.2 }
      ]
    };
    
    // Sea creatures
    this.creatures = [];
    this.creatureTypes = [
      { art: '><>', speed: 0.6, name: 'fish' },
      { art: '~(°)~', speed: 0.3, name: 'jellyfish' },
      { art: 'ς>', speed: 0.4, name: 'seahorse' },
      { art: '◉', speed: 0.2, name: 'bubble' }
    ];
    
    // Curved pipeline paths around island
    this.pipelines = [
      { start: { x: -10, y: 25 }, control: { x: 20, y: 20 }, end: { x: 80, y: 30 }, depth: 0.6 },
      { start: { x: 80, y: 15 }, control: { x: 60, y: 8 }, end: { x: -10, y: 12 }, depth: 0.4 },
      { start: { x: -10, y: 35 }, control: { x: 45, y: 25 }, end: { x: 90, y: 40 }, depth: 0.8 }
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
  
  // Calculate distance from point to island
  distanceToIsland(x, z) {
    const dx = x - this.island.center.x;
    const dz = z - this.island.center.z;
    return Math.sqrt(dx * dx + dz * dz);
  }
  
  // Get terrain height at point
  getTerrainHeight(x, z) {
    const distToCenter = this.distanceToIsland(x, z);
    
    if (distToCenter > this.island.radius) return 0; // Water level
    
    // Base island height
    const falloff = Math.max(0, 1 - distToCenter / this.island.radius);
    let height = this.island.height * falloff * falloff;
    
    // Add peaks
    this.island.peaks.forEach(peak => {
      const peakDist = Math.sqrt((x - peak.x) ** 2 + (z - peak.z) ** 2);
      if (peakDist < 3) {
        const peakFalloff = Math.max(0, 1 - peakDist / 3);
        height += peak.height * peakFalloff * peakFalloff;
      }
    });
    
    return height;
  }
  
  // Wave interference around obstacles
  waveInterference(x, z, time) {
    const k = 2 * Math.PI / this.ocean.wavelength;
    const w = Math.sqrt(9.81 * k) * 0.3; // Slower waves
    
    // Primary wave
    const dot = this.ocean.direction.x * x + this.ocean.direction.z * z;
    const phase = k * dot - w * time;
    let wave = this.ocean.amplitude * Math.sin(phase);
    
    // Wave reflection/diffraction around island
    const distToIsland = this.distanceToIsland(x, z);
    if (distToIsland < this.island.radius + 10) {
      // Reflection
      const reflectionAngle = Math.atan2(z - this.island.center.z, x - this.island.center.x);
      const reflectedPhase = k * (x * Math.cos(reflectionAngle) + z * Math.sin(reflectionAngle)) + w * time;
      const reflectionStrength = Math.exp(-(distToIsland - this.island.radius) / 5);
      wave += this.ocean.amplitude * 0.4 * Math.sin(reflectedPhase) * reflectionStrength;
      
      // Diffraction (waves bending around island)
      const diffractionPhase = phase + reflectionAngle;
      wave += this.ocean.amplitude * 0.2 * Math.sin(diffractionPhase) * reflectionStrength;
    }
    
    // Secondary ripples
    const ripple = this.ocean.amplitude * 0.3 * Math.sin(k * x * 1.7 - w * time * 1.3);
    
    return wave + ripple;
  }
  
  // Generate 3D ocean field with island
  generateOceanField(time) {
    const width = 68;
    const depth = 18;
    
    let field = [];
    
    for (let z = 0; z < depth; z++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        const terrainHeight = this.getTerrainHeight(x, z);
        
        if (terrainHeight > 0.5) {
          // Land
          row.push({ type: 'land', height: terrainHeight });
        } else {
          // Water with waves
          const waveHeight = this.waveInterference(x, z, time);
          const waterDepth = Math.max(0, -terrainHeight); // Depth below sea level
          
          row.push({ 
            type: 'water', 
            height: waveHeight,
            depth: waterDepth + z * 0.1 // Deeper toward back
          });
        }
      }
      field.push(row);
    }
    
    return field;
  }
  
  // Convert field data to ASCII with 3D depth
  fieldToChar(cell) {
    if (cell.type === 'land') {
      const heightIndex = Math.floor(Math.min(cell.height * 1.5, this.depthLayers.land.length - 1));
      return this.depthLayers.land[heightIndex];
    } else {
      // Water
      const totalDepth = cell.depth + cell.height;
      
      if (totalDepth < -1.5) {
        const index = Math.floor(Math.random() * this.depthLayers.deep.length);
        return this.depthLayers.deep[index];
      } else if (totalDepth < -0.5) {
        const index = Math.floor(Math.random() * this.depthLayers.medium.length);
        return this.depthLayers.medium[index];
      } else if (totalDepth < 0.5) {
        const index = Math.floor(Math.random() * this.depthLayers.shallow.length);
        return this.depthLayers.shallow[index];
      } else {
        const index = Math.floor(Math.random() * this.depthLayers.shore.length);
        return this.depthLayers.shore[index];
      }
    }
  }
  
  // Render with natural perspective
  renderOcean(field) {
    const width = field[0].length;
    const depth = field.length;
    const viewHeight = 14;
    
    let ascii = [];
    
    for (let y = 0; y < viewHeight; y++) {
      let line = '';
      
      // Natural perspective mapping
      const perspective = (y / viewHeight) ** 1.8;
      const z = Math.floor(perspective * (depth - 1));
      
      for (let x = 0; x < width; x++) {
        // Add slight fisheye distortion for naturalism
        const center = width / 2;
        const distortion = 1 - Math.abs(x - center) / center * 0.05;
        const sampleX = Math.floor(x * distortion);
        const clampedX = Math.max(0, Math.min(width - 1, sampleX));
        
        line += this.fieldToChar(field[z][clampedX]);
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
      font-size: 0.7rem;
      line-height: 1;
    `;
    this.oceanContainer.style.position = 'relative';
    this.oceanContainer.appendChild(creatureLayer);
    this.creatureLayer = creatureLayer;
    
    // Spawn initial creatures
    for (let i = 0; i < 2; i++) {
      setTimeout(() => this.spawnCreature(), i * 6000);
    }
  }
  
  spawnCreature() {
    if (this.creatures.length > 3) return;
    
    const type = this.creatureTypes[Math.floor(Math.random() * this.creatureTypes.length)];
    const pipeline = this.pipelines[Math.floor(Math.random() * this.pipelines.length)];
    
    const creature = {
      ...type,
      pipeline,
      progress: 0,
      element: document.createElement('div')
    };
    
    creature.element.textContent = type.art;
    creature.element.style.cssText = `
      position: absolute;
      color: var(--text-tertiary);
      opacity: 0;
      transition: opacity 3s ease;
      transform: translate(-50%, -50%);
    `;
    
    this.creatureLayer.appendChild(creature.element);
    this.creatures.push(creature);
    
    // Fade in subtly
    setTimeout(() => {
      creature.element.style.opacity = pipeline.depth * 0.3;
    }, 100);
  }
  
  updateCreatures() {
    this.creatures = this.creatures.filter(creature => {
      creature.progress += creature.speed * 0.0008;
      
      if (creature.progress >= 1) {
        creature.element.style.opacity = '0';
        setTimeout(() => creature.element.remove(), 3000);
        
        if (Math.random() < 0.1) {
          setTimeout(() => this.spawnCreature(), 5000 + Math.random() * 10000);
        }
        return false;
      }
      
      // Bezier curve movement
      const t = creature.progress;
      const p = creature.pipeline;
      const x = (1-t)*(1-t)*p.start.x + 2*(1-t)*t*p.control.x + t*t*p.end.x;
      const y = (1-t)*(1-t)*p.start.y + 2*(1-t)*t*p.control.y + t*t*p.end.y;
      
      // Gentle wave motion
      const wave = Math.sin(t * Math.PI * 3 + this.time * 0.03) * 1.5;
      
      creature.element.style.left = `${x}%`;
      creature.element.style.top = `${y + wave}%`;
      
      return true;
    });
  }
  
  updateOcean() {
    if (!this.oceanContainer) return;
    
    const field = this.generateOceanField(this.time);
    const ascii = this.renderOcean(field);
    
    const oceanText = this.oceanContainer.querySelector('.ocean-text');
    if (oceanText) {
      oceanText.textContent = ascii.join('\n');
    } else {
      const textDiv = document.createElement('div');
      textDiv.className = 'ocean-text';
      textDiv.textContent = ascii.join('\n');
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
        width: 3px;
        height: 3px;
        background: var(--icy-sky);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: droplet 1.2s ease-out forwards;
      `;
      
      document.body.appendChild(droplet);
      setTimeout(() => droplet.remove(), 1200);
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
            transform: scale(1.2) translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5) translateY(15px);
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
      if (window.scrollY > 30) {
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
      
      // Very slow for contemplative feel (6 fps)
      setTimeout(() => {
        this.animationFrame = requestAnimationFrame(animate);
      }, 1000 / 6);
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