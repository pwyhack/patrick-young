// Liquid Crystal Masterpiece Engine
class LiquidCrystalEngine {
  constructor() {
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.particles = [];
    this.crystals = [];
    this.waves = [];
    this.animationFrame = null;
    this.init();
  }

  init() {
    this.initEffects();
    this.initNavbar();
    this.initMasterpiece();
    this.startAnimation();
  }

  initMasterpiece() {
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;
    
    // Create the integrated canvas background
    const container = document.createElement('div');
    container.className = 'thought-canvas';
    container.innerHTML = `
      <canvas class="primary-canvas"></canvas>
      <canvas class="effect-canvas"></canvas>
      <div class="crystal-layer"></div>
      <div class="content-overlay">
        <h2>Where Ideas Crystallize</h2>
        <p>Move your cursor to explore the intersection of thought and technology</p>
      </div>
    `;
    
    // Insert after the intro paragraph
    const mainElement = document.querySelector('main');
    const firstParagraph = mainElement.querySelector('p');
    if (firstParagraph && firstParagraph.nextSibling) {
      firstParagraph.parentNode.insertBefore(container, firstParagraph.nextSibling);
    } else if (mainElement) {
      mainElement.appendChild(container);
    }
    
    this.container = container;
    this.contentOverlay = container.querySelector('.content-overlay');
    this.setupCanvases();
    this.createCrystals();
    this.createParticles();
    this.bindInteractions();
    this.initContentInteraction();
  }

  setupCanvases() {
    this.primaryCanvas = this.container.querySelector('.primary-canvas');
    this.effectCanvas = this.container.querySelector('.effect-canvas');
    this.primaryCtx = this.primaryCanvas.getContext('2d');
    this.effectCtx = this.effectCanvas.getContext('2d');
    this.crystalLayer = this.container.querySelector('.crystal-layer');
    this.particleLayer = this.container.querySelector('.particle-layer');
    
    this.resizeCanvases();
    window.addEventListener('resize', () => this.resizeCanvases());
  }

  resizeCanvases() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    [this.primaryCanvas, this.effectCanvas].forEach(canvas => {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    });
    
    this.width = rect.width;
    this.height = rect.height;
  }

  createCrystals() {
    // Create subtle floating crystalline structures
    for (let i = 0; i < 5; i++) {
      const crystal = document.createElement('div');
      crystal.className = 'floating-crystal';
      
      const size = 20 + Math.random() * 30;
      const sides = 6 + Math.floor(Math.random() * 3);
      const hue = 200 + Math.random() * 20;
      
      crystal.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${10 + Math.random() * 80}%;
        top: ${10 + Math.random() * 80}%;
        background: conic-gradient(
          hsl(${hue}, 60%, 85%),
          hsl(${hue + 20}, 70%, 90%),
          hsl(${hue}, 60%, 85%)
        );
        clip-path: polygon(${this.generatePolygon(sides)});
        filter: drop-shadow(0 0 20px hsla(${hue}, 80%, 70%, 0.4));
        animation: crystalFloat ${8 + Math.random() * 8}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        transform-origin: center;
        opacity: 0.3;
      `;
      
      this.crystalLayer.appendChild(crystal);
      this.crystals.push({ element: crystal, phase: Math.random() * Math.PI * 2 });
    }
  }

  generatePolygon(sides) {
    const angles = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI;
      const x = 50 + 45 * Math.cos(angle);
      const y = 50 + 45 * Math.sin(angle);
      angles.push(`${x}% ${y}%`);
    }
    return angles.join(', ');
  }

  createParticles() {
    // Create subtle fluid particles
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 0.5,
        life: Math.random(),
        color: `hsl(${200 + Math.random() * 40}, 40%, ${70 + Math.random() * 20}%)`,
        trail: []
      });
    }
  }

  bindInteractions() {
    let isInteracting = false;
    
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      isInteracting = true;
      
      // Only create ripples occasionally for subtlety
      if (Math.random() < 0.1) {
        this.createRipple(this.mouseX, this.mouseY);
      }
    });
    
    this.container.addEventListener('mouseleave', () => {
      isInteracting = false;
    });
    
    this.container.addEventListener('click', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.createGentleExpansion(x, y);
    });
  }

  createRipple(x, y) {
    this.waves.push({
      x, y,
      radius: 0,
      maxRadius: 100 + Math.random() * 100,
      life: 1,
      decay: 0.02 + Math.random() * 0.01
    });
  }

  createGentleExpansion(x, y) {
    // Create gentle particle expansion at click point
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        life: 1,
        color: `hsl(${200 + Math.random() * 40}, 50%, 75%)`,
        trail: []
      });
    }
  }

  updateParticles() {
    this.particles = this.particles.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Add to trail
      particle.trail.push({ x: particle.x, y: particle.y });
      if (particle.trail.length > 8) particle.trail.shift();
      
      // Mouse attraction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 80) {
        const force = (80 - distance) / 80 * 0.15;
        particle.vx += dx / distance * force;
        particle.vy += dy / distance * force;
      }
      
      // Apply drag
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundary interactions
      if (particle.x < 0 || particle.x > this.width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > this.height) particle.vy *= -0.8;
      
      particle.x = Math.max(0, Math.min(this.width, particle.x));
      particle.y = Math.max(0, Math.min(this.height, particle.y));
      
      // Age particle
      particle.life -= 0.001;
      
      return particle.life > 0;
    });
  }

  updateWaves() {
    this.waves = this.waves.filter(wave => {
      wave.radius += 2;
      wave.life -= wave.decay;
      return wave.life > 0 && wave.radius < wave.maxRadius;
    });
  }

  updateCrystals() {
    this.crystals.forEach((crystal, i) => {
      crystal.phase += 0.01;
      const scale = 1 + Math.sin(crystal.phase) * 0.1;
      const rotation = this.time * 0.2 + i * 30;
      crystal.element.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    });
  }

  drawPrimaryLayer() {
    if (!this.primaryCtx) return;
    
    const ctx = this.primaryCtx;
    ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background flow field
    this.drawFlowField(ctx);
    
    // Draw waves
    this.waves.forEach(wave => {
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(35, 88, 127, ${wave.life * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner ripple
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(227, 241, 255, ${wave.life * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw particle connections
    this.drawParticleConnections(ctx);
    
    // Draw particles with trails
    this.particles.forEach(particle => {
      // Draw trail
      if (particle.trail.length > 1) {
        ctx.strokeStyle = particle.color.replace('hsl(', 'hsla(').replace(')', ', 0.3)');
        ctx.lineWidth = particle.size * 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        ctx.stroke();
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('hsl(', 'hsla(').replace(')', `, ${particle.life})`);
      ctx.fill();
      
      // Glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('hsl(', 'hsla(').replace(')', `, ${particle.life * 0.2})`);
      ctx.fill();
    });
  }

  drawFlowField(ctx) {
    const step = 40;
    ctx.strokeStyle = 'rgba(35, 88, 127, 0.05)';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x < this.width; x += step) {
      for (let y = 0; y < this.height; y += step) {
        const angle = Math.sin(x * 0.008 + this.time * 0.005) + Math.cos(y * 0.008 + this.time * 0.003);
        const length = 10;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x + Math.cos(angle) * length,
          y + Math.sin(angle) * length
        );
        ctx.stroke();
      }
    }
  }

  drawParticleConnections(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 60) {
          const opacity = (60 - distance) / 60 * 0.15;
          ctx.strokeStyle = `rgba(227, 241, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  drawEffectLayer() {
    if (!this.effectCtx) return;
    
    const ctx = this.effectCtx;
    ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw energy field
    const gradient = ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) / 2
    );
    gradient.addColorStop(0, 'rgba(227, 241, 255, 0.02)');
    gradient.addColorStop(0.5, 'rgba(35, 88, 127, 0.01)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw subtle pulsing orbs
    for (let i = 0; i < 3; i++) {
      const phase = this.time * 0.005 + i * Math.PI / 1.5;
      const x = this.width * (0.25 + i * 0.25);
      const y = this.height * (0.4 + Math.sin(phase) * 0.2);
      const radius = 15 + Math.sin(phase * 2) * 5;
      
      const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      orbGradient.addColorStop(0, `rgba(227, 241, 255, ${0.1 + Math.sin(phase) * 0.05})`);
      orbGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  initEffects() {
    // Subtle scroll parallax
    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY;
      document.body.style.setProperty('--scroll-offset', `${scrollY * 0.3}px`);
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

  startAnimation() {
    const animate = () => {
      this.time++;
      
      this.updateParticles();
      this.updateWaves();
      this.updateCrystals();
      
      this.drawPrimaryLayer();
      this.drawEffectLayer();
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }

  initContentInteraction() {
    // Subtle content overlay interactions
    this.contentOverlay.addEventListener('mouseenter', () => {
      this.contentOverlay.style.transform = 'translateY(-5px)';
      this.contentOverlay.style.filter = 'drop-shadow(0 10px 20px rgba(35, 88, 127, 0.15))';
    });
    
    this.contentOverlay.addEventListener('mouseleave', () => {
      this.contentOverlay.style.transform = 'translateY(0)';
      this.contentOverlay.style.filter = 'none';
    });
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Initialize the masterpiece
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.liquidEngine = new LiquidCrystalEngine();
  });
} else {
  window.liquidEngine = new LiquidCrystalEngine();
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

// Performance optimization
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.liquidEngine) {
    window.liquidEngine.destroy();
  } else if (!document.hidden && !window.liquidEngine) {
    window.liquidEngine = new LiquidCrystalEngine();
  }
});