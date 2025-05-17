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