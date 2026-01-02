/**
 * Layout Public - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initCounterAnimation();
    initProcessSteps();
    initOfferCards();
    initMobileNavigation();
});

/**
 * Initialisation du slider hero
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
    const interval = 5000; // 5 secondes

    function changeBackground() {
        heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Précharger les images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Démarrer le slider
    changeBackground();
    setInterval(changeBackground, interval);
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
                const target = parseInt(counter.textContent);
                let current = 0;
                const increment = target / 50;
                const duration = 1500;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, duration / 50);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animation des étapes du processus
 */
function initProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    steps.forEach(step => observer.observe(step));
}

/**
 * Initialisation des cartes d'offres
 */
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');
    if (!offerCards.length) return;

    offerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Navigation mobile améliorée
 */
function initMobileNavigation() {
    const menuItems = document.querySelectorAll('.header-menu a');
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                headerMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

/**
 * Gestion des filtres d'offres
 */
function initOfferFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const offerCards = document.querySelectorAll('.offer-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            offerCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Gestion du formulaire de recherche
 */
function initSearchForm() {
    const searchForm = document.getElementById('searchForm');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            // Redirection vers la page de recherche
            window.location.href = `/recherche?q=${encodeURIComponent(searchTerm)}`;
        }
    });
}

/**
 * Animation des CTA buttons
 */
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.cta-button, .apply-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Gestion des dates de deadline
 */
function initDeadlineCounters() {
    const deadlineElements = document.querySelectorAll('.deadline-date');
    
    deadlineElements.forEach(element => {
        const deadlineText = element.textContent;
        const deadlineDate = new Date(deadlineText);
        const now = new Date();
        
        if (deadlineDate > now) {
            const diffTime = deadlineDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            element.innerHTML = `
                <span class="deadline-text">${deadlineText}</span>
                <span class="deadline-counter">${diffDays} jours restants</span>
            `;
        } else {
            element.innerHTML = `
                <span class="deadline-text expired">${deadlineText}</span>
                <span class="deadline-counter expired">Expirée</span>
            `;
        }
    });
}

/**
 * Initialisation du lazy loading
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy');
        
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

// Initialisation au chargement
window.addEventListener('load', function() {
    initLazyLoading();
    initDeadlineCounters();
});
