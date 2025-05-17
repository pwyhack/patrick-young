// Vanilla JS for performance-friendly UI enhancements

// 1. Sticky navbar shadow / blur on scroll
const navbar = document.querySelector('.navbar');
const onScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
// Throttle with requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

afterDOMContentLoaded(() => {
  onScroll();
  fadeInObserve();
  parallaxHero();
  createPtero();
  initPointerParallax();
  initDinoSpawner();
});

function afterDOMContentLoaded(cb) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

// 2. IntersectionObserver for fade-in effects
function fadeInObserve() {
  const items = document.querySelectorAll('.writing-item');
  if (!items.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Once visible, stop observing
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach(item => observer.observe(item));
}

function parallaxHero() {
  const heroContent = document.querySelector('.about-section .content-wrapper');
  if (!heroContent) return;
  let lastY = window.scrollY;
  const onScrollParallax = () => {
    const currentY = window.scrollY;
    // Translate hero content at 20% scroll speed
    heroContent.style.transform = `translateY(${currentY * 0.2}px)`;
    lastY = currentY;
  };

  // integrate with existing rAF throttle
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        onScrollParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createPtero() {
  if (prefersReducedMotion()) return;
  const dinoLayer = document.getElementById('dinosaur-layer');
  if (!dinoLayer) {
    console.warn('Dinosaur layer not found for Ptero!');
    return;
  }
  const sprite = document.createElement('div');
  sprite.className = 'ptero';
  dinoLayer.appendChild(sprite);
}

// Pointer / tilt parallax for layer shifts
function initPointerParallax() {
  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  let targetX = 0, targetY = 0;
  const lerp = (a, b, n) => a + (b - a) * n;
  let currentX = 0, currentY = 0;

  // Pointer for desktop
  window.addEventListener('pointermove', e => {
    const { innerWidth: w, innerHeight: h } = window;
    targetX = ((e.clientX - w / 2) / (w / 2)) * 40; // px shift range
    targetY = ((e.clientY - h / 2) / (h / 2)) * 20;
  });

  // Device tilt for mobile
  window.addEventListener('deviceorientation', e => {
    if (!e.beta && !e.gamma) return;
    targetX = (e.gamma || 0) * 1; // gamma ~ left/right
    targetY = (e.beta  || 0) * 0.5; // beta ~ front/back
  });

  const update = () => {
    currentX = lerp(currentX, targetX, 0.05);
    currentY = lerp(currentY, targetY, 0.05);
    root.style.setProperty('--shiftX', currentX.toFixed(2));
    root.style.setProperty('--shiftY', currentY.toFixed(2));
    requestAnimationFrame(update);
  };
  update();
}

// Dino spawner – random ground dinos
function initDinoSpawner() {
  if (prefersReducedMotion()) return;
  const dinoLayer = document.getElementById('dinosaur-layer');
  if (!dinoLayer) {
    console.warn('Dinosaur layer not found for Dino Spawner!');
    return;
  }
  const kinds = ['raptor', 'trice'];
  const spawn = () => {
    const kind = kinds[Math.random() * kinds.length | 0];
    const dino = document.createElement('div');
    dino.className = `dino ${kind}`;
    dinoLayer.appendChild(dino);
    // remove when done
    const duration = 16000;
    setTimeout(() => dino.remove(), duration + 1000);
  };
  const schedule = () => {
    const delay = 15000 + Math.random() * 20000; // 15–35 s
    setTimeout(() => {
      spawn();
      schedule();
    }, delay);
  };
  schedule();
} 