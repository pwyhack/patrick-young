// Unified Theme System - Interactive Effects
class ThemeEngine {
  constructor() {
    this.particles = [];
    this.maxParticles = 50;
    this.animationFrame = null;
    this.lastTime = 0;
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
    
    this.init();
  }
  
  init() {
    // Create theme effects container
    this.createEffectsContainer();
    
    // Initialize different effect systems
    this.initStarfield();
    this.initParticles();
    this.initScrollEffects();
    this.initNavbar();
    
    // Start animation loop
    this.startAnimation();
    
    // Initialize intersection observer for fade-ins
    this.initFadeInObserver();
  }
  
  createEffectsContainer() {
    const container = document.createElement('div');
    container.className = 'theme-effects';
    container.innerHTML = `
      <div class="starfield"></div>
      <div class="cosmic-gradient"></div>
      <div class="water-overlay"></div>
      <canvas id="particles-canvas"></canvas>
    `;
    document.body.prepend(container);
    
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  initStarfield() {
    // Additional dynamic stars
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;
    
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3}px;
        height: ${Math.random() * 3}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        opacity: ${0.3 + Math.random() * 0.7};
      `;
      starfield.appendChild(star);
    }
    
    // Add twinkle animation
    if (!document.querySelector('#twinkle-style')) {
      const style = document.createElement('style');
      style.id = 'twinkle-style';
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  initParticles() {
    // Create floating particles (bubbles/orbs)
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }
  
  createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() * 60 + 180, // Blue to purple range
      oscillation: Math.random() * 2 - 1,
      phase: Math.random() * Math.PI * 2
    };
  }
  
  updateParticles(deltaTime) {
    this.particles.forEach((particle, index) => {
      // Update position
      particle.y -= particle.speed * deltaTime * 0.05;
      particle.x += Math.sin(particle.phase + particle.y * 0.01) * particle.oscillation;
      
      // Reset particle if it goes off screen
      if (particle.y < -particle.radius) {
        this.particles[index] = this.createParticle();
      }
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      
      // Create gradient for each particle
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, 1)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `hsla(${particle.hue}, 100%, 50%, 0.5)`;
      this.ctx.fill();
      
      this.ctx.restore();
    });
  }
  
  initScrollEffects() {
    let ticking = false;
    
    const updateScrollEffects = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Parallax for background layers
      const starfield = document.querySelector('.starfield');
      const cosmicGradient = document.querySelector('.cosmic-gradient');
      const waterOverlay = document.querySelector('.water-overlay');
      
      if (starfield) {
        starfield.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
      if (cosmicGradient) {
        cosmicGradient.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (waterOverlay) {
        waterOverlay.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }
  
  initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  initFadeInObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
    
    // Auto-apply fade-in to certain elements
    const autoFadeElements = document.querySelectorAll(
      'article > *, .post-card, main > h1, main > p'
    );
    autoFadeElements.forEach((el, index) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${index * 50}ms`;
      observer.observe(el);
    });
  }
  
  startAnimation() {
    const animate = (currentTime) => {
      const deltaTime = currentTime - this.lastTime;
      
      if (deltaTime >= this.frameInterval) {
        this.updateParticles(deltaTime);
        this.drawParticles();
        this.lastTime = currentTime - (deltaTime % this.frameInterval);
      }
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }
  
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

// Initialize theme engine when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeEngine = new ThemeEngine();
  });
} else {
  window.themeEngine = new ThemeEngine();
}

// Add smooth scroll for anchor links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.hash) {
    const target = document.querySelector(e.target.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update URL without jumping
      history.pushState(null, null, e.target.hash);
    }
  }
});

// Add post theme enhancements
function enhancePostTheme() {
  const article = document.querySelector('article');
  if (!article) return;
  
  // Add reading progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ffff, #ff00ff);
    width: 0%;
    z-index: 1001;
    transition: width 100ms ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = `${scrollProgress}%`;
  });
  
  // Enhance code blocks
  article.querySelectorAll('pre code').forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-code';
    copyBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 12px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      color: #a0a0c0;
      font-size: 12px;
      cursor: pointer;
      transition: all 150ms ease;
      font-family: var(--font-mono);
    `;
    
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = '#00ffff';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.color = '#a0a0c0';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
    
    pre.appendChild(copyBtn);
  });
}

// Run post enhancements if on a post page
if (window.location.pathname.startsWith('/posts/')) {
  enhancePostTheme();
}

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.themeEngine) {
    window.themeEngine.destroy();
  } else if (!document.hidden && window.themeEngine) {
    window.themeEngine.startAnimation();
  }
});