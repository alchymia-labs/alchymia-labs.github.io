/**
 * Alchymia Labs - Interactive Features
 * Quantitative Alchemy Laboratory
 */

document.addEventListener('DOMContentLoaded', function() {
    initStarfield();
    initNavigation();
    initLanguageToggle();
    initSmoothScroll();
    initScrollAnimations();
});

/* ========================================
   Starfield Background Animation
   ======================================== */
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let alchemySymbols = [];

    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class - stars and dust
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.opacitySpeed = Math.random() * 0.01 + 0.005;
            this.opacityDirection = 1;

            // Color: gold or blue
            this.isGold = Math.random() > 0.7;
            if (this.isGold) {
                this.color = `rgba(212, 175, 55, ${this.opacity})`;
            } else {
                this.color = `rgba(58, 107, 140, ${this.opacity})`;
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Pulsing opacity
            this.opacity += this.opacitySpeed * this.opacityDirection;
            if (this.opacity >= 0.8 || this.opacity <= 0.1) {
                this.opacityDirection *= -1;
            }

            // Update color with new opacity
            if (this.isGold) {
                this.color = `rgba(212, 175, 55, ${this.opacity})`;
            } else {
                this.color = `rgba(58, 107, 140, ${this.opacity})`;
            }

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow for gold particles
            if (this.isGold && this.size > 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity * 0.1})`;
                ctx.fill();
            }
        }
    }

    // Alchemy Symbol class - floating alchemical symbols
    class AlchemySymbol {
        constructor() {
            this.symbols = ['⚗', '☉', '☽', '♄', '♃', '⚕', '∞', '◇'];
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            this.size = Math.random() * 12 + 8;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.15 + 0.05;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        }

        update() {
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
                this.y = this.speedY > 0 ? -50 : canvas.height + 50;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `${this.size}px serif`;
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    // Create particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Create alchemy symbols
    const symbolCount = 8;
    for (let i = 0; i < symbolCount; i++) {
        alchemySymbols.push(new AlchemySymbol());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw and update alchemy symbols
        alchemySymbols.forEach(symbol => {
            symbol.update();
            symbol.draw();
        });

        // Draw connecting lines between nearby gold particles
        particles.forEach((p1, i) => {
            if (!p1.isGold) return;
            particles.slice(i + 1).forEach(p2 => {
                if (!p2.isGold) return;
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ========================================
   Navigation
   ======================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    // Mobile menu toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Nav background on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.background = 'rgba(10, 15, 44, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(10, 15, 44, 0.9)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/* ========================================
   Language Toggle
   ======================================== */
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'zh' : 'en';

            // Toggle all language elements
            document.querySelectorAll('[data-lang]').forEach(el => {
                if (el.getAttribute('data-lang') === currentLang) {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });

            // Update button text
            langToggle.textContent = currentLang === 'en' ? 'EN / 中文' : '中文 / EN';

            // Update HTML lang attribute
            document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
        });
    }
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.capability-card, .process-step, .philosophy-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
