window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        delay: 2,
        onComplete: () => preloader.style.display = 'none'
    });
    
    initAnimations();
});

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
        gsap.to(cursorDot, { duration: 0.01, x: e.clientX, y: e.clientY });
    });
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2, background: 'rgba(255,255,255,0.5)' }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, background: 'var(--saffron)' }));
    });

    particlesJS('particles-js', {
        "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": ["#FF9933", "#FFFFFF", "#138808"] }, "shape": { "type": "circle" }, "opacity": { "value": 0.6, "random": true }, "size": { "value": 4, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" } }, "modes": { "bubble": { "distance": 250, "size": 8, "duration": 2, "opacity": 0.8 }, "repulse": { "distance": 400, "duration": 0.4 } } }
    });

    gsap.from(".hero-title span", { y: 150, skewY: 7, stagger: 0.1, duration: 1.5, ease: "power4.out", delay: 2.5 });
    gsap.from(".hero-subtitle", { opacity: 0, y: 20, duration: 1, ease: "power2.out", delay: 3.5 });

    let panels = gsap.utils.toArray(".timeline-panel");
    gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#timeline",
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + (document.querySelector(".timeline-container").offsetWidth - window.innerWidth)
        }
    });

    gsap.to(".timeline-chakra-container", {
        opacity: 0.15,
        scrollTrigger: {
            trigger: "#timeline",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
    
    gsap.utils.toArray('.reveal-text').forEach(elem => {
        gsap.fromTo(elem, 
            { autoAlpha: 0, y: 50, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, 
            { autoAlpha: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none none' } }
        );
    });
    
    gsap.utils.toArray('.gallery-image').forEach(img => {
        gsap.to(img, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: 0.5 } });
    });

    gsap.to('#voices', {
        backgroundPosition: 'center 20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#voices',
            scrub: true
        }
    });

    const pledgeButton = document.getElementById('pledge-button');
    const closeModalButton = document.getElementById('close-modal-button');
    const modalOverlay = document.getElementById('pledge-modal-overlay');
    const modal = document.getElementById('pledge-modal');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];

    const showModal = () => {
        gsap.to(modalOverlay, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        gsap.to(modal, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
        modalOverlay.style.pointerEvents = 'auto';
        launchConfetti();
    };

    const hideModal = () => {
        gsap.to(modalOverlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
        modalOverlay.style.pointerEvents = 'none';
    };

    pledgeButton.addEventListener('click', showModal);
    closeModalButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    const colors = ['#FF9933', '#FFFFFF', '#138808'];
    const launchConfetti = () => {
        canvas.width = modal.offsetWidth;
        canvas.height = modal.offsetHeight;
        confettiParticles = [];
        for (let i = 0; i < 100; i++) {
            confettiParticles.push(createParticle(canvas.width / 2, canvas.height));
        }
        animateConfetti();
    };

    const createParticle = (x, y) => ({
        x: x, y: y,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -15 - 5,
        alpha: 1, gravity: 0.3
    });

    const animateConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach((p, i) => {
            p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.alpha -= 0.01;
            if (p.y > canvas.height || p.alpha <= 0) confettiParticles.splice(i, 1);
            ctx.globalAlpha = p.alpha; ctx.beginPath(); ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
        });
        if (confettiParticles.length > 0) requestAnimationFrame(animateConfetti);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}