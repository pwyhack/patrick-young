// Ocean Mysticism Theme - Digital Sculpture Masterpiece
class OceanEngine {
  constructor() {
    this.time = 0;
    this.phi = (1 + Math.sqrt(5)) / 2;
    this.animationFrame = null;
    
    // Musical parameters for rhythm
    this.rhythm = {
      beat: 0,
      tempo: 0.02,
      harmonics: [1, 1.618, 2.618, 4.236] // Golden ratio harmonics
    };
    
    // Color palettes that shift
    this.palettes = {
      dawn: ['#FCF9F1', '#E3F1FF', '#EFF6FB', '#23587F'],
      depths: ['#23587F', '#1A4A6B', '#0F3454', '#052238'],
      ethereal: ['#E3F1FF', '#B8E0FF', '#8CCFFF', '#5CBFFF']
    };
    
    this.currentPalette = 'dawn';
    this.nextPalette = 'depths';
    this.paletteTransition = 0;
    
    this.creatures = [];
    this.ripples = [];
    this.lightRays = [];
    
    this.init();
  }
  
  init() {
    this.initScrollEffects();
    this.initNavbar();
    this.initMasterpiece();
    this.initSubtleInteractions();
    this.initReadingProgress();
    this.startAnimation();
  }
  
  initMasterpiece() {
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;
    
    // Create the canvas for our sculpture
    const container = document.createElement('div');
    container.className = 'digital-sculpture';
    container.innerHTML = `
      <canvas class="sculpture-canvas"></canvas>
      <div class="sculpture-overlay"></div>
      <div class="light-rays-container"></div>
      <div class="particle-field"></div>
      <div class="sacred-geometry"></div>
    `;
    
    const mainElement = document.querySelector('main');
    const firstParagraph = mainElement.querySelector('p');
    if (firstParagraph && firstParagraph.nextSibling) {
      firstParagraph.parentNode.insertBefore(container, firstParagraph.nextSibling);
    } else if (mainElement) {
      mainElement.appendChild(container);
    }
    
    this.sculptureContainer = container;
    this.canvas = container.querySelector('.sculpture-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.overlay = container.querySelector('.sculpture-overlay');
    this.lightRaysContainer = container.querySelector('.light-rays-container');
    this.particleField = container.querySelector('.particle-field');
    this.sacredGeometry = container.querySelector('.sacred-geometry');
    
    this.resizeCanvas();
    this.createMasterpiece();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.sculptureContainer.getBoundingClientRect();
    this.canvas.width = rect.width * 2; // High DPI
    this.canvas.height = rect.height * 2;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.scale(2, 2);
  }
  
  createMasterpiece() {
    this.createLightRays();
    this.createParticleField();
    this.createSacredGeometry();
    this.createFloatingSymbols();
  }
  
  createLightRays() {
    // Volumetric light rays that dance
    for (let i = 0; i < 8; i++) {
      const ray = document.createElement('div');
      ray.className = 'light-ray';
      ray.style.cssText = `\n        position: absolute;\n        width: 2px;\n        height: 100%;\n        background: linear-gradient(to bottom, \n          transparent 0%, \n          rgba(227, 241, 255, 0.3) 20%,\n          rgba(35, 88, 127, 0.4) 50%,\n          rgba(227, 241, 255, 0.3) 80%,\n          transparent 100%);\n        left: ${15 + i * 12}%;\n        top: 0;\n        transform-origin: center bottom;\n        transform: rotate(${-20 + i * 5}deg) scaleY(0.8);\n        animation: lightDance ${3 + i * 0.5}s ease-in-out infinite;\n        animation-delay: ${i * 0.2}s;\n        filter: blur(1px);\n      `;\n      this.lightRaysContainer.appendChild(ray);\n    }\n  }\n  \n  createParticleField() {\n    // Mystical floating particles\n    for (let i = 0; i < 25; i++) {\n      const particle = document.createElement('div');\n      const size = 3 + Math.random() * 8;\n      const symbols = ['◦', '∘', '○', '◯', '⋄', '◊', '✦', '✧', '⟡', '⬢'];\n      const symbol = symbols[Math.floor(Math.random() * symbols.length)];\n      \n      particle.textContent = symbol;\n      particle.className = 'mystical-particle';\n      particle.style.cssText = `\n        position: absolute;\n        font-size: ${size}px;\n        color: rgba(35, 88, 127, ${0.3 + Math.random() * 0.4});\n        left: ${Math.random() * 100}%;\n        top: ${Math.random() * 100}%;\n        pointer-events: none;\n        font-family: var(--font-mono);\n        text-shadow: 0 0 ${size * 2}px rgba(227, 241, 255, 0.5);\n        animation: mysticalFloat ${8 + Math.random() * 8}s ease-in-out infinite;\n        animation-delay: ${Math.random() * 5}s;\n        z-index: 5;\n      `;\n      \n      this.particleField.appendChild(particle);\n    }\n  }\n  \n  createSacredGeometry() {\n    // SVG sacred geometry patterns\n    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n    svg.setAttribute('viewBox', '0 0 400 300');\n    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');\n    svg.className = 'sacred-svg';\n    \n    // Flower of Life pattern\n    this.createFlowerOfLife(svg);\n    \n    // Spiraling DNA-like helixes\n    this.createDNAHelix(svg);\n    \n    // Mandala rings\n    this.createMandalaRings(svg);\n    \n    // Fibonacci spiral\n    this.createFibonacciSpiral(svg);\n    \n    this.sacredGeometry.appendChild(svg);\n  }\n  \n  createFlowerOfLife(svg) {\n    const centerX = 200;\n    const centerY = 150;\n    const radius = 30;\n    \n    // Central circle\n    this.createSVGCircle(svg, centerX, centerY, radius, 'sacred-circle central');\n    \n    // Six surrounding circles\n    for (let i = 0; i < 6; i++) {\n      const angle = (i * 60) * Math.PI / 180;\n      const x = centerX + radius * Math.cos(angle);\n      const y = centerY + radius * Math.sin(angle);\n      this.createSVGCircle(svg, x, y, radius, `sacred-circle petal-${i}`);\n    }\n    \n    // Outer ring of 12 circles\n    for (let i = 0; i < 12; i++) {\n      const angle = (i * 30) * Math.PI / 180;\n      const x = centerX + radius * 2 * Math.cos(angle);\n      const y = centerY + radius * 2 * Math.sin(angle);\n      this.createSVGCircle(svg, x, y, radius * 0.7, `sacred-circle outer-${i}`);\n    }\n  }\n  \n  createSVGCircle(svg, x, y, r, className) {\n    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n    circle.setAttribute('cx', x);\n    circle.setAttribute('cy', y);\n    circle.setAttribute('r', r);\n    circle.setAttribute('fill', 'none');\n    circle.setAttribute('stroke', 'rgba(35, 88, 127, 0.4)');\n    circle.setAttribute('stroke-width', '1.5');\n    circle.className = className;\n    svg.appendChild(circle);\n    return circle;\n  }\n  \n  createDNAHelix(svg) {\n    // Two intertwining helical paths\n    for (let helix = 0; helix < 2; helix++) {\n      let path = 'M50,' + (150 + helix * 20);\n      \n      for (let x = 50; x <= 350; x += 5) {\n        const t = (x - 50) / 300;\n        const y = 150 + Math.sin(t * Math.PI * 4 + helix * Math.PI) * 40;\n        const z = Math.cos(t * Math.PI * 4 + helix * Math.PI) * 20;\n        path += ` L${x},${y + z * 0.5}`;\n      }\n      \n      const helixPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');\n      helixPath.setAttribute('d', path);\n      helixPath.setAttribute('fill', 'none');\n      helixPath.setAttribute('stroke', helix === 0 ? 'rgba(35, 88, 127, 0.5)' : 'rgba(227, 241, 255, 0.6)');\n      helixPath.setAttribute('stroke-width', '2');\n      helixPath.className = `dna-helix helix-${helix}`;\n      svg.appendChild(helixPath);\n    }\n  }\n  \n  createMandalaRings(svg) {\n    const centerX = 200;\n    const centerY = 150;\n    \n    // Multiple concentric rings with spokes\n    for (let ring = 1; ring <= 4; ring++) {\n      const radius = ring * 20;\n      \n      // Ring circle\n      this.createSVGCircle(svg, centerX, centerY, radius, `mandala-ring ring-${ring}`);\n      \n      // Spokes\n      const spokeCount = ring * 6;\n      for (let spoke = 0; spoke < spokeCount; spoke++) {\n        const angle = (spoke * 360 / spokeCount) * Math.PI / 180;\n        const x1 = centerX + (radius - 5) * Math.cos(angle);\n        const y1 = centerY + (radius - 5) * Math.sin(angle);\n        const x2 = centerX + (radius + 5) * Math.cos(angle);\n        const y2 = centerY + (radius + 5) * Math.sin(angle);\n        \n        const spokeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');\n        spokeLine.setAttribute('x1', x1);\n        spokeLine.setAttribute('y1', y1);\n        spokeLine.setAttribute('x2', x2);\n        spokeLine.setAttribute('y2', y2);\n        spokeLine.setAttribute('stroke', 'rgba(35, 88, 127, 0.3)');\n        spokeLine.setAttribute('stroke-width', '1');\n        spokeLine.className = `mandala-spoke ring-${ring}-spoke-${spoke}`;\n        svg.appendChild(spokeLine);\n      }\n    }\n  }\n  \n  createFibonacciSpiral(svg) {\n    let path = 'M200,150';\n    const goldenAngle = 137.508 * Math.PI / 180;\n    \n    for (let i = 0; i < 100; i++) {\n      const angle = i * goldenAngle;\n      const radius = Math.sqrt(i) * 5;\n      const x = 200 + radius * Math.cos(angle);\n      const y = 150 + radius * Math.sin(angle);\n      path += ` L${x},${y}`;\n    }\n    \n    const spiral = document.createElementNS('http://www.w3.org/2000/svg', 'path');\n    spiral.setAttribute('d', path);\n    spiral.setAttribute('fill', 'none');\n    spiral.setAttribute('stroke', 'rgba(227, 241, 255, 0.6)');\n    spiral.setAttribute('stroke-width', '2');\n    spiral.className = 'fibonacci-spiral';\n    svg.appendChild(spiral);\n  }\n  \n  createFloatingSymbols() {\n    // Large mystical symbols that slowly rotate\n    const symbols = [\n      { char: '🜔', size: '2rem', name: 'earth' },\n      { char: '🜁', size: '1.8rem', name: 'air' },\n      { char: '🜂', size: '2.2rem', name: 'fire' },\n      { char: '🜃', size: '2rem', name: 'water' },\n      { char: '⚹', size: '1.5rem', name: 'sextile' },\n      { char: '☉', size: '1.8rem', name: 'sun' }\n    ];\n    \n    symbols.forEach((symbol, i) => {\n      const element = document.createElement('div');\n      element.textContent = symbol.char;\n      element.className = `floating-symbol symbol-${symbol.name}`;\n      element.style.cssText = `\n        position: absolute;\n        font-size: ${symbol.size};\n        color: rgba(35, 88, 127, 0.4);\n        left: ${20 + i * 15}%;\n        top: ${30 + (i % 2) * 40}%;\n        pointer-events: none;\n        z-index: 3;\n        text-shadow: 0 0 10px rgba(227, 241, 255, 0.6);\n        animation: symbolFloat ${10 + i * 2}s linear infinite;\n        filter: drop-shadow(0 0 5px rgba(35, 88, 127, 0.3));\n      `;\n      \n      this.overlay.appendChild(element);\n    });\n  }\n  \n  drawCanvasEffects() {\n    if (!this.ctx) return;\n    \n    const width = this.canvas.width / 2;\n    const height = this.canvas.height / 2;\n    \n    // Clear with subtle gradient\n    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);\n    gradient.addColorStop(0, 'rgba(227, 241, 255, 0.03)');\n    gradient.addColorStop(1, 'rgba(35, 88, 127, 0.01)');\n    this.ctx.fillStyle = gradient;\n    this.ctx.fillRect(0, 0, width, height);\n    \n    // Draw flowing energy waves\n    this.drawEnergyWaves(width, height);\n    \n    // Draw particle connections\n    this.drawParticleConnections(width, height);\n    \n    // Draw ripple effects\n    this.drawRippleEffects(width, height);\n  }\n  \n  drawEnergyWaves(width, height) {\n    const centerX = width / 2;\n    const centerY = height / 2;\n    \n    this.ctx.strokeStyle = 'rgba(35, 88, 127, 0.1)';\n    this.ctx.lineWidth = 2;\n    \n    // Multiple wave layers\n    for (let layer = 0; layer < 5; layer++) {\n      this.ctx.beginPath();\n      \n      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {\n        const wave1 = Math.sin(angle * 3 + this.time * 0.02 + layer);\n        const wave2 = Math.cos(angle * 5 + this.time * 0.015 + layer * 0.5);\n        const wave3 = Math.sin(angle * 8 + this.time * 0.01 + layer * 0.3);\n        \n        const radius = 50 + layer * 15 + (wave1 + wave2 + wave3) * 10;\n        const x = centerX + radius * Math.cos(angle);\n        const y = centerY + radius * Math.sin(angle);\n        \n        if (angle === 0) {\n          this.ctx.moveTo(x, y);\n        } else {\n          this.ctx.lineTo(x, y);\n        }\n      }\n      \n      this.ctx.closePath();\n      this.ctx.stroke();\n    }\n  }\n  \n  drawParticleConnections(width, height) {\n    // Draw connections between particles when they're close\n    const particles = this.particleField.querySelectorAll('.mystical-particle');\n    \n    this.ctx.strokeStyle = 'rgba(227, 241, 255, 0.1)';\n    this.ctx.lineWidth = 1;\n    \n    for (let i = 0; i < particles.length; i++) {\n      for (let j = i + 1; j < particles.length; j++) {\n        const p1 = particles[i].getBoundingClientRect();\n        const p2 = particles[j].getBoundingClientRect();\n        const containerRect = this.sculptureContainer.getBoundingClientRect();\n        \n        const x1 = p1.left - containerRect.left;\n        const y1 = p1.top - containerRect.top;\n        const x2 = p2.left - containerRect.left;\n        const y2 = p2.top - containerRect.top;\n        \n        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\n        \n        if (distance < 100) {\n          const opacity = (100 - distance) / 100 * 0.3;\n          this.ctx.strokeStyle = `rgba(227, 241, 255, ${opacity})`;\n          this.ctx.beginPath();\n          this.ctx.moveTo(x1, y1);\n          this.ctx.lineTo(x2, y2);\n          this.ctx.stroke();\n        }\n      }\n    }\n  }\n  \n  drawRippleEffects(width, height) {\n    // Emanating ripples from center\n    const centerX = width / 2;\n    const centerY = height / 2;\n    \n    for (let i = 0; i < 6; i++) {\n      const phase = this.time * 0.01 + i * Math.PI / 3;\n      const radius = 30 + Math.sin(phase) * 20 + i * 25;\n      const opacity = (Math.sin(phase) + 1) * 0.1;\n      \n      this.ctx.strokeStyle = `rgba(35, 88, 127, ${opacity})`;\n      this.ctx.lineWidth = 2;\n      this.ctx.beginPath();\n      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);\n      this.ctx.stroke();\n    }\n  }\n  \n  updateMasterpiece() {\n    if (!this.sculptureContainer) return;\n    \n    this.time++;\n    \n    // Clear and redraw canvas\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.drawCanvasEffects();\n    \n    // Update rhythm\n    this.rhythm.beat += this.rhythm.tempo;\n    \n    // Color palette transitions\n    this.paletteTransition += 0.001;\n    if (this.paletteTransition >= 1) {\n      this.currentPalette = this.nextPalette;\n      this.nextPalette = this.getNextPalette();\n      this.paletteTransition = 0;\n    }\n    \n    // Update sacred geometry animations\n    this.updateSacredGeometry();\n  }\n  \n  getNextPalette() {\n    const palettes = Object.keys(this.palettes);\n    const current = palettes.indexOf(this.currentPalette);\n    return palettes[(current + 1) % palettes.length];\n  }\n  \n  updateSacredGeometry() {\n    // Rotate and pulse sacred geometry elements\n    const sacredCircles = this.sacredGeometry.querySelectorAll('.sacred-circle');\n    sacredCircles.forEach((circle, i) => {\n      const phase = this.time * 0.001 + i * Math.PI / 6;\n      const scale = 1 + Math.sin(phase) * 0.1;\n      const rotation = this.time * 0.1 + i * 10;\n      circle.setAttribute('transform', `scale(${scale}) rotate(${rotation})`);\n    });\n    \n    // Pulse mandala rings\n    const mandalaRings = this.sacredGeometry.querySelectorAll('.mandala-ring');\n    mandalaRings.forEach((ring, i) => {\n      const phase = this.time * 0.002 + i * Math.PI / 4;\n      const opacity = 0.3 + Math.sin(phase) * 0.2;\n      ring.setAttribute('stroke', `rgba(35, 88, 127, ${opacity})`);\n    });\n  }\n  \n  initSubtleInteractions() {\n    // Create expanding ripples on click\n    document.addEventListener('click', (e) => {\n      if (!e.target.matches('a[href], button, .post-card, .nav-link')) return;\n      \n      this.createClickRipple(e.clientX, e.clientY);\n    });\n  }\n  \n  createClickRipple(x, y) {\n    const ripple = document.createElement('div');\n    ripple.style.cssText = `\n      position: fixed;\n      left: ${x}px;\n      top: ${y}px;\n      width: 4px;\n      height: 4px;\n      border: 2px solid rgba(35, 88, 127, 0.6);\n      border-radius: 50%;\n      pointer-events: none;\n      z-index: 1000;\n      animation: expandingRipple 2s ease-out forwards;\n    `;\n    \n    document.body.appendChild(ripple);\n    setTimeout(() => ripple.remove(), 2000);\n  }\n  \n  initScrollEffects() {\n    let ticking = false;\n    \n    const updateParallax = () => {\n      const scrollY = window.scrollY;\n      document.body.style.setProperty('--scroll-offset', `${scrollY * 0.5}px`);\n      ticking = false;\n    };\n    \n    window.addEventListener('scroll', () => {\n      if (!ticking) {\n        requestAnimationFrame(updateParallax);\n        ticking = true;\n      }\n    });\n  }\n  \n  initNavbar() {\n    const nav = document.querySelector('nav');\n    if (!nav) return;\n    \n    window.addEventListener('scroll', () => {\n      if (window.scrollY > 20) {\n        nav.classList.add('scrolled');\n      } else {\n        nav.classList.remove('scrolled');\n      }\n    });\n  }\n  \n  initReadingProgress() {\n    if (!window.location.pathname.startsWith('/posts/')) return;\n    \n    const progressBar = document.createElement('div');\n    progressBar.className = 'reading-progress';\n    document.body.appendChild(progressBar);\n    \n    window.addEventListener('scroll', () => {\n      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;\n      const scrollProgress = (window.scrollY / scrollHeight) * 100;\n      progressBar.style.width = `${scrollProgress}%`;\n    });\n  }\n  \n  startAnimation() {\n    const animate = () => {\n      this.updateMasterpiece();\n      \n      // Silky smooth 60fps for this masterpiece\n      this.animationFrame = requestAnimationFrame(animate);\n    };\n    \n    this.animationFrame = requestAnimationFrame(animate);\n  }\n  \n  destroy() {\n    if (this.animationFrame) {\n      cancelAnimationFrame(this.animationFrame);\n    }\n  }\n}\n\n// Initialize the masterpiece\nif (document.readyState === 'loading') {\n  document.addEventListener('DOMContentLoaded', () => {\n    window.oceanEngine = new OceanEngine();\n  });\n} else {\n  window.oceanEngine = new OceanEngine();\n}\n\n// Smooth anchor scrolling\ndocument.addEventListener('click', (e) => {\n  if (e.target.tagName === 'A' && e.target.hash) {\n    const target = document.querySelector(e.target.hash);\n    if (target) {\n      e.preventDefault();\n      target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n      history.pushState(null, null, e.target.hash);\n    }\n  }\n});\n\n// Pause animation when tab is not visible\ndocument.addEventListener('visibilitychange', () => {\n  if (document.hidden && window.oceanEngine) {\n    window.oceanEngine.destroy();\n  } else if (!document.hidden && !window.oceanEngine) {\n    window.oceanEngine = new OceanEngine();\n  }\n});