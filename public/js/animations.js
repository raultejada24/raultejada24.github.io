document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const anim = entry.target.dataset.animate;
        entry.target.classList.add('show', anim);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
});
