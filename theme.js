// Ocean Mysticism Theme - 3D ASCII Wave Field
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.animationFrame = null;
    
    // Wave parameters
    this.waveConfig = {
      amplitude: 3,
      frequency: 0.08,
      speed: 0.02,
      damping: 0.85
    };
    
    // ASCII depth mapping
    this.depthChars = [
      { char: '░', threshold: -2.5 },
      { char: '▒', threshold: -1.5 },
      { char: '▓', threshold: -0.5 },
      { char: '≈', threshold: 0.5 },
      { char: '~', threshold: 1.5 },
      { char: '∼', threshold: 2.0 },
      { char: '-', threshold: 2.5 },
      { char: '=', threshold: 3.0 },
      { char: '≡', threshold: 3.5 },
      { char: '°', threshold: 4.0 },
      { char: '∘', threshold: 5.0 }
    ];
    
    this.init();
  }
  
  init() {
    this.initScrollEffects();
    this.initNavbar();
    this.initOceanVisualization();
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
  
  // Generate 3D wave field using multiple sine waves
  generateWaveField(time) {
    const width = 80;
    const height = 24;
    const depth = 20;
    
    let field = [];
    
    for (let z = 0; z < depth; z++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        // Create complex wave patterns using golden ratio
        const wave1 = Math.sin((x * this.waveConfig.frequency + time) * this.phi) * 
                      Math.cos(z * this.waveConfig.frequency * 0.5);
        
        const wave2 = Math.sin((x * this.waveConfig.frequency * 0.7 - time * 0.8) + 
                      z * this.waveConfig.frequency * 0.3) * 0.5;
        
        const wave3 = Math.cos((x + z) * this.waveConfig.frequency * 1.3 + time * 1.2) * 0.3;
        
        // Fibonacci-inspired wave interference
        const interference = Math.sin(x * 0.0618 + time * 0.5) * 
                           Math.cos(z * 0.0382 - time * 0.3) * 0.4;
        
        // Combine waves with depth-based damping
        const dampingFactor = Math.pow(this.waveConfig.damping, z / depth * 3);
        const height = (wave1 + wave2 + wave3 + interference) * 
                      this.waveConfig.amplitude * dampingFactor;
        
        row.push(height);
      }
      field.push(row);
    }
    
    return field;
  }
  
  // Convert height values to ASCII characters
  heightToChar(height) {
    for (let i = this.depthChars.length - 1; i >= 0; i--) {
      if (height >= this.depthChars[i].threshold) {
        return this.depthChars[i].char;
      }
    }
    return this.depthChars[0].char;
  }
  
  // Apply perspective projection for 3D effect
  projectTo2D(field) {
    const width = field[0].length;
    const depth = field.length;
    const viewHeight = 20;
    
    let ascii = [];
    
    // Perspective parameters
    const fov = 60;
    const cameraHeight = 15;
    const horizon = viewHeight * 0.4;
    
    for (let y = 0; y < viewHeight; y++) {
      let line = '';
      
      // Calculate which depth slice to sample based on perspective
      const perspectiveDepth = (y - horizon) / (viewHeight - horizon);
      const z = Math.floor(Math.max(0, Math.min(depth - 1, 
                perspectiveDepth * perspectiveDepth * depth)));
      
      for (let x = 0; x < width; x++) {
        // Add some horizontal perspective distortion
        const perspectiveX = x + (x - width/2) * perspectiveDepth * 0.1;
        const sampleX = Math.floor(Math.max(0, Math.min(width - 1, perspectiveX)));
        
        const height = field[z][sampleX];
        line += this.heightToChar(height);
      }
      
      ascii.push(line);
    }
    
    // Add mystical symbols at cardinal points
    if (this.time % 200 < 100) {
      // North star
      if (ascii[0]) ascii[0] = ascii[0].substring(0, 40) + '✦' + ascii[0].substring(41);
      // Sacred geometry markers
      if (ascii[10]) ascii[10] = '◊' + ascii[10].substring(1, 79) + '◊';
    }
    
    return ascii.join('\n');
  }
  
  updateOcean() {
    if (!this.oceanContainer) return;
    
    const field = this.generateWaveField(this.time);
    const ascii = this.projectTo2D(field);
    
    this.oceanContainer.textContent = ascii;
    
    // Gentle breathing effect
    const breathe = Math.sin(this.time * 0.05) * 0.05 + 1;
    this.oceanContainer.style.transform = `scale(${breathe})`;
  }
  
  initScrollEffects() {
    // Subtle parallax for water overlay
    let ticking = false;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const waterOverlay = document.querySelector('body::before');
      
      if (waterOverlay) {
        document.body.style.setProperty('--scroll-offset', `${scrollY * 0.5}px`);
      }
      
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
    // Only on post pages
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
      
      // Slower frame rate for ASCII (15 fps)
      setTimeout(() => {
        this.animationFrame = requestAnimationFrame(animate);
      }, 1000 / 15);
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

// Add subtle water ripple effect on mouse movement (homepage only)
if (window.location.pathname === '/' || window.location.pathname === '') {
  let rippleTimeout;
  
  document.addEventListener('mousemove', (e) => {
    clearTimeout(rippleTimeout);
    
    rippleTimeout = setTimeout(() => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 1px;
        height: 1px;
        background: transparent;
        border-radius: 50%;
        pointer-events: none;
        z-index: 5;
        box-shadow: 0 0 10px 10px rgba(35, 88, 127, 0.1);
        animation: ripple 2s ease-out forwards;
      `;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 2000);
    }, 100);
  });
  
  // Add ripple animation if not exists
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          box-shadow: 0 0 40px 40px rgba(35, 88, 127, 0);
          transform: scale(40);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Code block enhancements for posts
function enhanceCodeBlocks() {
  const article = document.querySelector('article');
  if (!article) return;
  
  article.querySelectorAll('pre').forEach(pre => {
    pre.style.position = 'relative';
    
    const code = pre.querySelector('code');
    if (!code) return;
    
    // Add line numbers
    const lines = code.textContent.split('\n');
    if (lines.length > 3) {
      const lineNumbers = document.createElement('div');
      lineNumbers.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3em;
        padding: 1rem 0.5rem;
        text-align: right;
        color: rgba(35, 88, 127, 0.3);
        border-right: 1px solid rgba(35, 88, 127, 0.1);
        font-family: var(--font-mono);
        font-size: 0.875em;
        line-height: inherit;
        user-select: none;
      `;
      
      for (let i = 1; i <= lines.length; i++) {
        lineNumbers.innerHTML += `${i}<br>`;
      }
      
      pre.appendChild(lineNumbers);
      code.style.marginLeft = '4em';
    }
  });
}

if (window.location.pathname.startsWith('/posts/')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }
}

// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.oceanEngine) {
    window.oceanEngine.destroy();
  } else if (!document.hidden && !window.oceanEngine) {
    window.oceanEngine = new OceanEngine();
  }
});