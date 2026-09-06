document.querySelectorAll('.shiner').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    const target = document.getElementById('content-below-quote');
    if (!target) return;

    const scrollTo = target.getBoundingClientRect().top + window.scrollY - ((window.innerHeight / 2 - 35));
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  });
});
