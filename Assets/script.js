// ============================================
        // PRELOADER
        // ============================================
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
            }, 1500);
        });

        // ============================================
        // INITIALIZE AOS
        // ============================================
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        });

        // ============================================
        // CUSTOM CURSOR
        // ============================================
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.querySelectorAll('a, button, .tech-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
        });

        // ============================================
        // PARTICLES GENERATION
        // ============================================
        const particlesContainer = document.getElementById('particles');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            
            const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }

        // ============================================
        // NAVBAR SCROLL EFFECT
        // ============================================
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============================================
        // MOBILE MENU TOGGLE
        // ============================================
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // ============================================
        // ACTIVE NAV LINK ON SCROLL
        // ============================================
        const sections = document.querySelectorAll('section');
        const navLinksAll = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // ============================================
        // TYPING EFFECT
        // ============================================
        const typedStrings = [
            'stunning websites',
            'cloud servers',
            'user experiences',
            'creative designs'
        ];

        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedOutput = document.getElementById('typed-output');

        function type() {
            const currentString = typedStrings[stringIndex];
            
            if (isDeleting) {
                typedOutput.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedOutput.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typedStrings.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }

        type();

        // ============================================
        // COUNTER ANIMATION
        // ============================================
        const counters = document.querySelectorAll('.stat-number');
        let countersAnimated = false;

        function animateCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }

        // Intersection Observer for counters
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        document.querySelector('.hero-stats').querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });

        // ============================================
        // TECH PROGRESS BARS
        // ============================================
        const progressBars = document.querySelectorAll('.tech-progress-bar');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));

        // ============================================
        // PROJECT FILTER
        // ============================================
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        

        // ============================================
        // CONTACT FORM HANDLING
        // ============================================
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state on button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate server request
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                
                // Reset form (Optional: reset after 5 seconds to allow new message)
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
            }, 1500);
        });

        // ============================================
        // BACK TO TOP
        // ============================================
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================
        // MAGNETIC BUTTON PHYSICS
        // ============================================
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const position = btn.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2 - window.scrollY;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            });
            btn.addEventListener('mouseout', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });

        const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop the page from refreshing
    
    const status = document.querySelector(".submit-btn span");
    const data = new FormData(event.target);
    
    status.innerText = "Sending...";

    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            status.innerText = "Message Sent!";
            form.reset();
        } else {
            // This will tell us EXACTLY what Formspree doesn't like
            console.error("Formspree Error:", result);
            status.innerText = "Error: Check Console";
            alert("Submission failed: " + (result.errors ? result.errors[0].message : "Unknown error"));
        }
    } catch (error) {
        console.error("Network Error:", error);
        status.innerText = "Network Error";
    }
});