/**
 * Page d'accueil - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initOfferFilters();
    initCounterAnimation();
    initProcessSteps();
    initTestimonials();
    initCTAScroll();
    initMobileFeatures();
    initScrollAnimations();
});

/**
 * Slider hero
 */
function initHeroSlider() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const images = [
        'assets/images/hero1.jpeg',
        'assets/images/hero2.jpeg',
        'assets/images/hero3.jpg'
    ];
    
    let currentIndex = 0;
    let isAnimating = false;
    const interval = 5000; // 5 secondes

    // Précharger les images
    const preloadedImages = [];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        preloadedImages.push(img);
    });

    function changeBackground(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        // Animation de fondu
        heroSection.style.opacity = '0.5';
        heroSection.style.transform = 'scale(1.02)';

        setTimeout(() => {
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }

            heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
            
            // Restaurer l'opacité
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'scale(1)';
            
            // Mettre à jour les indicateurs
            updateSliderIndicators();
            
            isAnimating = false;
        }, 300);
    }

    // Créer les indicateurs
    function createSliderIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slider-indicators';
        
        images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `slider-indicator ${index === currentIndex ? 'active' : ''}`;
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
            
            indicator.addEventListener('click', function() {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                if (targetIndex !== currentIndex) {
                    currentIndex = targetIndex;
                    heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
                    updateSliderIndicators();
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        
        heroSection.appendChild(indicatorsContainer);
    }

    // Mettre à jour les indicateurs
    function updateSliderIndicators() {
        const indicators = document.querySelectorAll('.slider-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Boutons de navigation
    function createNavigationButtons() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Image précédente');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Image suivante');
        
        prevBtn.addEventListener('click', () => changeBackground('prev'));
        nextBtn.addEventListener('click', () => changeBackground('next'));
        
        heroSection.appendChild(prevBtn);
        heroSection.appendChild(nextBtn);
    }

    // Initialisation
    createSliderIndicators();
    createNavigationButtons();
    
    // Démarrer le slider automatique
    let sliderInterval = setInterval(() => changeBackground('next'), interval);
    
    // Pause au survol
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => changeBackground('next'), interval);
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeBackground('prev');
        } else if (e.key === 'ArrowRight') {
            changeBackground('next');
        }
    });
}

/**
 * Filtres des offres
 */
function initOfferFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const offerCards = document.querySelectorAll('.offer-card');
    
    if (!filterButtons.length || !offerCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour le bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les cartes
            offerCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    
                    // Animation d'apparition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    // Animation de disparition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Mettre à jour le compteur
            updateOfferCount(filterValue);
        });
    });
}

/**
 * Mettre à jour le compteur d'offres
 */
function updateOfferCount(filter) {
    const countElement = document.querySelector('.offers-count');
    if (!countElement) return;

    const totalOffers = document.querySelectorAll('.offer-card').length;
    let visibleCount;
    
    if (filter === 'all') {
        visibleCount = totalOffers;
    } else {
        visibleCount = document.querySelectorAll(`.offer-card[data-category="${filter}"]`).length;
    }
    
    // Animation du compteur
    const currentCount = parseInt(countElement.textContent) || 0;
    animateCounter(countElement, currentCount, visibleCount, 500);
}

/**
 * Animation des compteurs
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/,/g, ''));
                
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter, 0, target, 2000);
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animation d'un compteur
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Étapes du processus
 */
function initProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Animation de l'icône
                    const icon = entry.target.querySelector('.step-icon');
                    if (icon) {
                        icon.style.transform = 'scale(0)';
                        setTimeout(() => {
                            icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            icon.style.transform = 'scale(1)';
                        }, 200);
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    steps.forEach(step => observer.observe(step));
}

/**
 * Témoignages
 */
function initTestimonials() {
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (!testimonialContainer) return;

    const testimonials = [
        {
            name: 'Dr. KOFFI Mensah',
            role: 'Enseignant en Informatique',
            content: 'La plateforme de recrutement de l\'INSTI est exceptionnelle. Le processus est transparent et efficace.',
            avatar: 'KM'
        },
        {
            name: 'Prof. DOSSOU Anna',
            role: 'Examinateur',
            content: 'En tant qu\'examinateur, j\'apprécie l\'organisation et la qualité des dossiers soumis.',
            avatar: 'DA'
        },
        {
            name: 'Dr. AMOUSSOU Kévin',
            role: 'Enseignant en Génie Mécanique',
            content: 'Une expérience professionnelle enrichissante dans un environnement stimulant.',
            avatar: 'AK'
        }
    ];

    // Créer le carousel
    createTestimonialCarousel(testimonialContainer, testimonials);
}

/**
 * Créer un carousel de témoignages
 */
function createTestimonialCarousel(container, testimonials) {
    const carousel = document.createElement('div');
    carousel.className = 'testimonials-carousel';
    
    // Créer les slides
    testimonials.forEach((testimonial, index) => {
        const slide = document.createElement('div');
        slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
        slide.setAttribute('data-index', index);
        
        slide.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-text">"${testimonial.content}"</div>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.avatar}</div>
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;
        
        carousel.appendChild(slide);
    });
    
    // Ajouter la navigation
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.setAttribute('aria-label', `Témoignage ${index + 1}`);
        
        dot.addEventListener('click', function() {
            const targetIndex = parseInt(this.getAttribute('data-index'));
            goToSlide(targetIndex);
        });
        
        nav.appendChild(dot);
    });
    
    // Boutons de navigation
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Témoignage précédent');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Témoignage suivant');
    
    // Navigation
    let currentIndex = 0;
    let autoPlayInterval;
    
    function goToSlide(index) {
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dots = nav.querySelectorAll('.carousel-dot');
        
        // Mettre à jour les slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        // Mettre à jour les points
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        goToSlide(prevIndex);
    }
    
    // Événements
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause au survol
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Initialiser le positionnement
    const slides = carousel.querySelectorAll('.testimonial-slide');
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });
    
    // Assembler le carousel
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';
    wrapper.appendChild(prevBtn);
    wrapper.appendChild(carousel);
    wrapper.appendChild(nextBtn);
    
    container.innerHTML = '';
    container.appendChild(wrapper);
    container.appendChild(nav);
    
    // Démarrer l'auto-play
    startAutoPlay();
}

/**
 * Scroll vers les CTA
 */
function initCTAScroll() {
    const ctaButtons = document.querySelectorAll('[data-scroll-to]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Animation de focus
                setTimeout(() => {
                    targetElement.style.boxShadow = '0 0 0 4px rgba(10, 63, 143, 0.2)';
                    
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 1000);
                }, 500);
            }
        });
    });
}

/**
 * Fonctionnalités mobiles
 */
function initMobileFeatures() {
    // Menu accordéon pour mobile
    if (window.innerWidth <= 768) {
        initMobileAccordion();
    }
    
    // Swipe pour les carousels
    initSwipeGestures();
    
    // Optimisation du chargement des images
    initLazyLoading();
}

/**
 * Menu accordéon mobile
 */
function initMobileAccordion() {
    const accordionSections = document.querySelectorAll('.mobile-accordion');
    
    accordionSections.forEach(section => {
        const header = section.querySelector('.accordion-header');
        const content = section.querySelector('.accordion-content');
        
        if (!header || !content) return;
        
        // Initialiser
        content.style.display = 'none';
        
        // Ajouter le bouton toggle
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'accordion-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        header.appendChild(toggleBtn);
        
        // Toggle au clic
        header.addEventListener('click', function() {
            const isExpanded = content.style.display === 'block';
            
            content.style.display = isExpanded ? 'none' : 'block';
            toggleBtn.querySelector('i').className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            
            // Animation
            if (!isExpanded) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    content.style.transition = 'all 0.3s ease';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
}

/**
 * Gestures swipe
 */
function initSwipeGestures() {
    const carousels = document.querySelectorAll('.testimonials-carousel, .offers-grid');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let isSwiping = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            // Prévenir le scroll vertical pendant le swipe
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            // Seuil pour considérer un swipe
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe gauche -> suivant
                    triggerNextSlide(carousel);
                } else {
                    // Swipe droite -> précédent
                    triggerPrevSlide(carousel);
                }
            }
            
            isSwiping = false;
        });
    });
}

/**
 * Déclencher le slide suivant
 */
function triggerNextSlide(carousel) {
    const nextBtn = carousel.closest('.carousel-wrapper')?.querySelector('.carousel-btn.next');
    if (nextBtn) {
        nextBtn.click();
    }
}

/**
 * Déclencher le slide précédent
 */
function triggerPrevSlide(carousel) {
    const prevBtn = carousel.closest('.carousel-wrapper')?.querySelector('.carousel-btn.prev');
    if (prevBtn) {
        prevBtn.click();
    }
}

/**
 * Chargement différé
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Animations au scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));
}

/**
 * Initialisation des cartes d'offres interactives
 */
function initInteractiveOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Animation du bouton
            const button = this.querySelector('.apply-button');
            if (button) {
                button.style.transform = 'translateY(0)';
                button.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            
            const button = this.querySelector('.apply-button');
            if (button) {
                button.style.transform = 'translateY(10px)';
                button.style.opacity = '0';
            }
        });
        
        // Animation au clic
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.apply-button')) {
                this.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

/**
 * Système de favoris
 */
function initFavoriteSystem() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isFavorite = this.classList.contains('active');
            const offerId = this.getAttribute('data-offer-id');
            
            // Toggle l'état
            this.classList.toggle('active');
            
            // Animation
            const icon = this.querySelector('i');
            if (icon) {
                if (isFavorite) {
                    icon.className = 'far fa-heart';
                } else {
                    icon.className = 'fas fa-heart';
                    this.style.animation = 'pulse 0.5s';
                    
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                }
            }
            
            // Sauvegarder dans localStorage
            saveFavorite(offerId, !isFavorite);
            
            // Notification
            showFavoriteNotification(!isFavorite);
        });
    });
    
    // Restaurer les favoris
    restoreFavorites();
}

/**
 * Sauvegarder un favori
 */
function saveFavorite(offerId, isFavorite) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
        if (!favorites.includes(offerId)) {
            favorites.push(offerId);
        }
    } else {
        favorites = favorites.filter(id => id !== offerId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Restaurer les favoris
 */
function restoreFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    favorites.forEach(offerId => {
        const button = document.querySelector(`.favorite-btn[data-offer-id="${offerId}"]`);
        if (button) {
            button.classList.add('active');
            const icon = button.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-heart';
            }
        }
    });
}

/**
 * Notification de favori
 */
function showFavoriteNotification(isAdded) {
    const notification = document.createElement('div');
    notification.className = 'favorite-notification';
    notification.textContent = isAdded ? 'Ajouté aux favoris' : 'Retiré des favoris';
    notification.style.background = isAdded ? '#10b981' : '#64748b';
    
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Initialisation complète
window.addEventListener('load', function() {
    initInteractiveOfferCards();
    initFavoriteSystem();
    initScrollAnimations();
    
    // Mettre à jour les compteurs périodiquement
    setInterval(() => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const current = parseInt(counter.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(0, current + change);
            
            if (newValue !== current) {
                animateCounter(counter, current, newValue, 1000);
            }
        });
    }, 30000);
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .slider-indicators {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        
        .slider-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .slider-indicator.active {
            background: white;
            transform: scale(1.2);
        }
        
        .slider-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .slider-nav:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }
        
        .slider-nav.prev {
            left: 20px;
        }
        
        .slider-nav.next {
            right: 20px;
        }
        
        .testimonials-carousel {
            display: flex;
            transition: transform 0.5s ease;
            width: 100%;
        }
        
        .testimonial-slide {
            flex: 0 0 100%;
            transition: transform 0.5s ease;
        }
        
        .carousel-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
        }
        
        .carousel-nav {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        
        .carousel-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: none;
            background: #cbd5e1;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .carousel-dot.active {
            background: #0a3f8f;
            transform: scale(1.2);
        }
        
        .carousel-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 10;
            transition: all 0.3s ease;
        }
        
        .carousel-btn:hover {
            background: white;
            transform: translateY(-50%) scale(1.1);
        }
        
        .carousel-btn.prev {
            left: 10px;
        }
        
        .carousel-btn.next {
            right: 10px;
        }
        
        .favorite-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .favorite-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .pulse {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
