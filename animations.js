/* ===== RAITHU BAZAAR — CLEAN ANIMATIONS ENGINE ===== */
window.RaithuAnimations = {

    // Call this AFTER all dynamic content has been added to the DOM
    init: function () {

        // ===== SCROLL-TO-TOP BUTTON =====
        const stb = document.getElementById('scrollTop');
        if (stb) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) { stb.style.opacity = '1'; stb.style.pointerEvents = 'auto'; }
                else { stb.style.opacity = '0'; stb.style.pointerEvents = 'none'; }
            }, { passive: true });
        }

        // ===== INTERSECTION OBSERVER — SCROLL REVEALS =====
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('.anim-reveal, .anim-left, .anim-right, .anim-scale, .anim-rotate, .anim-flip').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Already in viewport — reveal immediately
                el.classList.add('revealed');
            } else {
                revealObs.observe(el);
            }
        });

        // ===== TEXT SPLIT & REVEAL =====
        document.querySelectorAll('.text-reveal').forEach(el => {
            if (el.dataset.split === 'done') return; // already processed
            el.dataset.split = 'done';
            const text = el.textContent;
            el.textContent = '';
            el.style.opacity = '1';
            [...text].forEach((ch, i) => {
                const span = document.createElement('span');
                span.textContent = ch === ' ' ? '\u00A0' : ch;
                span.style.cssText = `display:inline-block;opacity:0;transform:translateY(40px) rotateX(-30deg);transition:all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.025}s;`;
                el.appendChild(span);
            });
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Already visible — animate in after a short delay
                setTimeout(() => {
                    el.querySelectorAll('span').forEach(s => { s.style.opacity = '1'; s.style.transform = 'translateY(0) rotateX(0)'; });
                }, 200);
            } else {
                const obs = new IntersectionObserver(([e]) => {
                    if (e.isIntersecting) {
                        el.querySelectorAll('span').forEach(s => { s.style.opacity = '1'; s.style.transform = 'translateY(0) rotateX(0)'; });
                        obs.unobserve(el);
                    }
                }, { threshold: 0.2 });
                obs.observe(el);
            }
        });

        // ===== COUNTER ANIMATION =====
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 2000;
                    const start = performance.now();
                    (function tick(now) {
                        const p = Math.min((now - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 4);
                        el.textContent = Math.floor(ease * target).toLocaleString('en-IN');
                        if (p < 1) requestAnimationFrame(tick);
                    })(start);
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

        // ===== 3D HERO MOUSE TRACKING (desktop only) =====
        const heroEl = document.getElementById('hero');
        if (heroEl && window.innerWidth > 768) {
            heroEl.addEventListener('mousemove', e => {
                const r = heroEl.getBoundingClientRect();
                const nx = (e.clientX - r.left) / r.width - 0.5;
                const ny = (e.clientY - r.top) / r.height - 0.5;
                const scene = heroEl.querySelector('.hero-3d-scene');
                if (scene) scene.style.transform = `rotateY(${nx * 10}deg) rotateX(${-ny * 6}deg)`;
                heroEl.querySelectorAll('.hero-float').forEach((f, i) => {
                    const d = 15 + i * 8;
                    f.style.transform = `translate(${nx * d}px, ${ny * d}px)`;
                });
            });
            heroEl.addEventListener('mouseleave', () => {
                const scene = heroEl.querySelector('.hero-3d-scene');
                if (scene) scene.style.transform = '';
                heroEl.querySelectorAll('.hero-float').forEach(f => { f.style.transform = ''; });
            });
        }

        // ===== SMOOTH SCROLL LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const t = document.querySelector(a.getAttribute('href'));
                if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
            });
        });
    }
};
