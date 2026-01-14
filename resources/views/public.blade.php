<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'INSTI - Institut National Supérieur de Technologie Industrielle')</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Styles globaux -->
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
    <link rel="stylesheet" href="{{ asset('css/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
    


    <!-- Styles spécifiques aux pages -->
    @stack('page-styles')
</head>

<body>
    <!-- Top Line -->
    <div class="top-line"></div>
    <header class="header">
        <div class="header-container">
            <div class="header-top">
                <div class="header-left">
                    <div class="logo-container">
                        <img src="{{ asset('img/logo_insti.jpeg') }}" alt="INSTI" class="logo-inst">
                        <div class="header-title">
                            <h1>INSTI</h1>
                            <span>
                                Institut National Supérieur<br>
                                de Technologie Industrielle de Lokossa
                            </span>
                        </div>
                    </div>
                </div>

                <div class="header-right">
                    <div class="item">
                        <i class="fas fa-user"></i>
                        <span>Accès rapide</span>
                    </div>
                    <div class="item">
                        <i class="fas fa-eye"></i>
                        <span>Observatoire</span>
                    </div>
                    <img src="{{ asset('img/logo_unstim.jpeg') }}" alt="UNSTIM" class="unstim-logo-top">
                </div>

                <!-- Hamburger Menu -->
                <div class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="header-line"></div>

            <div class="header-menu">
                <nav>
                    <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">ACCUEIL</a>
                    <a href="#offres">OFFRES</a>
                    <a href="#">CONTACTS</a>
                    @auth
                    <a href="{{ route('dashboard') }}">DASHBOARD</a>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf

                        <button type="submit" class="btn-logout">DÉCONNEXION</button>

                    </form>
                    @else
                    <a href="{{ route('login') }}" class="{{ request()->routeIs('login') ? 'active' : '' }}">CONNEXION</a>
                    @endauth



                </nav>
            </div>
        </div>
    </header>

    <div>
        @yield('content')


        <!-- Footer -->
        <footer>
            <div class="footer-container">
                <div class="footer-grid">
                    <!-- Nos Ressources -->
                    <div class="footer-section">
                        <h3>Nos Ressources</h3>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fas fa-rocket"></i> Incubateur de startups</a></li>
                            <li><a href="#"><i class="fas fa-cogs"></i> Unité d'application de l'INSTI</a></li>
                            <li><a href="#"><i class="fas fa-laptop"></i> Plateforme E-learning</a></li>
                            <li><a href="#"><i class="fas fa-blog"></i> Blog officiel de l'INSTI</a></li>
                        </ul>
                    </div>

                    <!-- Liens utiles -->
                    <div class="footer-section">
                        <h3>Liens utiles</h3>
                        <ul class="footer-links">
                            <li><a href="#"><i class="fas fa-graduation-cap"></i> Ministère de l'Enseignement Supérieur</a></li>
                            <li><a href="#"><i class="fas fa-cogs"></i> Unité d'application de l'INSTI</a></li>
                        </ul>
                    </div>

                    <!-- Navigations -->
                    <div class="footer-section">
                        <h3>Navigations</h3>
                        <ul class="footer-links">
                            <li><a href="{{ route('home') }}"><i class="fas fa-home"></i> Accueil</a></li>
                            <li><a href="#"><i class="fas fa-book"></i> Formation</a></li>
                            <li><a href="#"><i class="fas fa-users"></i> Vie estudiantine</a></li>
                            <li><a href="#"><i class="fas fa-photo-video"></i> Médiathèque</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="footer-section">
                        <h3>Contact Recrutement</h3>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>recrutement@insti.bj</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+229 21 91 66 66</span>
                            </div>
                            <div class="moto">
                                Science et technologie au service de l'homme
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="copyright">
                        INSTI-UNSTIM © {{ date('Y') }} | Plateforme de Recrutement des Enseignants
                    </div>
                </div>
            </div>
        </footer>


        <!-- Scripts globaux -->
        <script src="{{ asset('js/home.js') }}"></script>


        <!-- Scripts spécifiques aux pages -->
        @stack('page-scripts')
</body>

</html>
 <script>
        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {

            // Initialize loader
            setTimeout(function() {
                document.getElementById('loader').classList.add('hidden');
            }, 1000);

            // Toggle instructions
            const instructionsToggle = document.getElementById('instructionsToggle');
            const imageInstructions = document.getElementById('imageInstructions');

            instructionsToggle.addEventListener('click', () => {
                imageInstructions.classList.toggle('show');
            });

            // Close instructions when clicking outside
            document.addEventListener('click', (e) => {
                if (!instructionsToggle.contains(e.target) && !imageInstructions.contains(e.target)) {
                    imageInstructions.classList.remove('show');
                }
            });

            // Hero Slider
            const heroSlides = document.querySelectorAll('.hero-slide');
            const sliderDots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            const totalSlides = heroSlides.length;

            function showSlide(index) {
                // Hide all slides
                heroSlides.forEach(slide => slide.classList.remove('active'));
                sliderDots.forEach(dot => dot.classList.remove('active'));

                // Show current slide
                heroSlides[index].classList.add('active');
                sliderDots[index].classList.add('active');
                currentSlide = index;
            }

            // Auto slide every 5 seconds
            setInterval(() => {
                let nextSlide = (currentSlide + 1) % totalSlides;
                showSlide(nextSlide);
            }, 5000);

            // Dot click events
            sliderDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });

            // Scroll Progress
            const scrollProgress = document.getElementById('scrollProgress');

            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';

                // Show/hide back to top button
                const backToTop = document.getElementById('backToTop');
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }

                // Section animations
                const sections = document.querySelectorAll('.section-hidden');

                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;

                    if (sectionTop < windowHeight * 0.85) {
                        section.classList.add('section-visible');
                    }
                });

                // Animate counters when stats section is visible
                const statsSection = document.querySelector('.stats-section');
                const statNumbers = document.querySelectorAll('.stat-number');

                if (statsSection.classList.contains('section-visible')) {
                    statNumbers.forEach(statNumber => {
                        if (!statNumber.classList.contains('animated')) {
                            const target = parseInt(statNumber.getAttribute('data-count'));
                            const duration = 2000; // 2 seconds
                            const increment = target / (duration / 16); // 60fps
                            let current = 0;

                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                    statNumber.classList.add('animated');
                                }

                                statNumber.textContent = Math.floor(current);
                            }, 16);
                        }
                    });
                }
            });

            // Back to top button
            document.getElementById('backToTop').addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Create particles
            const particlesContainer = document.getElementById('particlesContainer');

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                // Random size
                const size = Math.random() * 5 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';

                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';

                // Random animation duration
                const duration = Math.random() * 30 + 20;
                particle.style.animationDuration = duration + 's';

                // Random color
                const colors = ['#1a237e', '#3949ab', '#ff6b6b', '#0d1556'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;

                // Random opacity
                particle.style.opacity = Math.random() * 0.2 + 0.05;

                particlesContainer.appendChild(particle);
            }

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Offer card hover effect enhancement
            const offerCards = document.querySelectorAll('.offer-card');

            offerCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Process step hover effect
            const processSteps = document.querySelectorAll('.process-step');

            processSteps.forEach(step => {
                step.addEventListener('mouseenter', () => {
                    const icon = step.querySelector('.step-icon');
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                });

                step.addEventListener('mouseleave', () => {
                    const icon = step.querySelector('.step-icon');
                    icon.style.transform = 'scale(1) rotate(0)';
                });
            });

            // CTA button ripple effect
            const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-primary');

            ctaButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;

                    const ripple = document.createElement('span');
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');

                    this.appendChild(ripple);

                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });

            // Add ripple effect CSS
            const style = document.createElement('style');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            // Initialize animations for elements already in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.section-hidden').forEach(section => {
                observer.observe(section);
            });

            // Add floating particles to hero section
            function createFloatingParticles() {
                const hero = document.getElementById('hero');

                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('floating-particle');

                    // Random size
                    const size = Math.random() * 10 + 2;
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';

                    // Random position
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';

                    // Random animation
                    const duration = Math.random() * 20 + 10;
                    const delay = Math.random() * 5;
                    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

                    // Random opacity
                    particle.style.opacity = Math.random() * 0.4 + 0.1;

                    // Random shape
                    if (Math.random() > 0.5) {
                        particle.style.borderRadius = '50%';
                        particle.style.background = 'rgba(255, 255, 255, 0.3)';
                    } else {
                        particle.style.borderRadius = '2px';
                        particle.style.background = 'rgba(255, 255, 255, 0.2)';
                        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                    }

                    hero.appendChild(particle);
                }
            }

            createFloatingParticles();

            // Add keyboard navigation for slider
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    let prevSlide = currentSlide - 1;
                    if (prevSlide < 0) prevSlide = totalSlides - 1;
                    showSlide(prevSlide);
                } else if (e.key === 'ArrowRight') {
                    let nextSlide = (currentSlide + 1) % totalSlides;
                    showSlide(nextSlide);
                }
            });

            // Add dynamic year to footer
            document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} INSTI - Recrutement Enseignants. Tous droits réservés.`;
        });

        // Window load event for final initialization
        window.addEventListener('load', function() {
            // Trigger initial scroll event to check visible sections
            window.dispatchEvent(new Event('scroll'));

            // Add loaded class to body for final transitions
            document.body.classList.add('loaded');

            // Add CSS for loaded state
            const loadedStyle = document.createElement('style');
            loadedStyle.textContent = `
                body.loaded .offer-card,
                body.loaded .process-step,
                body.loaded .stat-item {
                    transition: transform 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
                }
            `;
            document.head.appendChild(loadedStyle);
        });

        // Error handling for images
        window.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.log('Image failed to load:', e.target.src);
            }
        }, true);

        // Comment ajouter vos propres images :
        /*
        INSTRUCTIONS POUR AJOUTER VOS IMAGES :
        
        1. Pour changer les images du héros :
           - Ouvrez le code dans un éditeur de texte
           - Cherchez les lignes avec .hero-slide-1 à .hero-slide-5
           - Remplacez les URLs dans 'background-imagebackground-image: url('...')' 
           - Exemple : background-image: url('https://votresite.com/votre-image.jpg');
        
        2. Pour changer les images des offres d'emploi :
           - Les offres n'utilisent pas d'images dans cette version
           - Vous pouvez ajouter des images si nécessaire
        
        3. Recommandations :
           - Utilisez des images de haute qualité
           - Taille recommandée : 1920x1080 pixels minimum
           - Format : JPG, PNG ou WebP
           - Compression optimisée pour le web
        */
    </script>