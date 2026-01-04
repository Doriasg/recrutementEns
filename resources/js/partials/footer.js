/**
 * Footer - JavaScript spécifique
 */

document.addEventListener('DOMContentLoaded', function() {
    initFooterAccordion();
    initFooterLinks();
    initBackToTop();
    initNewsletter();
    initSocialLinks();
    initFooterAnimations();
    initScrollEffects();
});

/**
 * Accordéon pour le footer mobile
 */
function initFooterAccordion() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach(section => {
        const heading = section.querySelector('h3');
        const content = section.querySelector('.footer-links, .contact-info');
        
        if (!heading || !content) return;

        // Ajouter le bouton toggle pour mobile
        if (window.innerWidth <= 768) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'footer-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            
            heading.appendChild(toggleBtn);
            
            // Masquer le contenu initialement sur mobile
            content.style.display = 'none';
            
            // Toggle au clic
            toggleBtn.addEventListener('click', function() {
                const isExpanded = content.style.display === 'block';
                content.style.display = isExpanded ? 'none' : 'block';
                this.querySelector('i').className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                section.classList.toggle('expanded', !isExpanded);
            });
        }
    });

    // Gérer le redimensionnement
    window.addEventListener('resize', function() {
        footerSections.forEach(section => {
            const heading = section.querySelector('h3');
            const content = section.querySelector('.footer-links, .contact-info');
            const toggleBtn = section.querySelector('.footer-toggle');
            
            if (!heading || !content) return;

            if (window.innerWidth <= 768) {
                if (!toggleBtn) {
                    const newToggleBtn = document.createElement('button');
                    newToggleBtn.className = 'footer-toggle';
                    newToggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    heading.appendChild(newToggleBtn);
                    
                    newToggleBtn.addEventListener('click', function() {
                        const isExpanded = content.style.display === 'block';
                        content.style.display = isExpanded ? 'none' : 'block';
                        this.querySelector('i').className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                        section.classList.toggle('expanded', !isExpanded);
                    });
                }
                content.style.display = section.classList.contains('expanded') ? 'block' : 'none';
            } else {
                if (toggleBtn) {
                    toggleBtn.remove();
                }
                content.style.display = '';
                section.classList.remove('expanded');
            }
        });
    });
}

/**
 * Gestion des liens du footer
 */
function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        // Ajouter des indicateurs pour les liens externes
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt external-icon';
            icon.style.marginLeft = '5px';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
        
        // Animation au survol
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // Suivi des clics (analytics)
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkUrl = this.href;
            
            // Log pour analytics (à remplacer par votre système)
            console.log('Footer link clicked:', { text: linkText, url: linkUrl });
            
            // Vous pouvez intégrer Google Analytics ou autre ici
            // gtag('event', 'footer_link_click', { link_text: linkText, link_url: linkUrl });
        });
    });
}

/**
 * Bouton "Retour en haut"
 */
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut de page');
    
    document.body.appendChild(backToTopBtn);
    
    // Afficher/cacher le bouton au défilement
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Défilement fluide vers le haut
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation d'entrée
    setTimeout(() => {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            backToTopBtn.style.transition = 'all 0.3s ease';
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        }, 100);
    }, 1000);
}

/**
 * Formulaire de newsletter
 */
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    
    if (!emailInput || !submitBtn) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNewsletterError('Veuillez saisir votre adresse email');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNewsletterError('Veuillez saisir une adresse email valide');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            showNewsletterSuccess('Merci de votre inscription à notre newsletter !');
            emailInput.value = '';
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
            
            // Sauvegarder l'email localement
            saveNewsletterEmail(email);
        }, 1500);
    });
    
    // Validation en temps réel
    emailInput.addEventListener('input', function() {
        clearNewsletterError();
    });
}

/**
 * Afficher une erreur de newsletter
 */
function showNewsletterError(message) {
    clearNewsletterError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'newsletter-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '8px';
    
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.appendChild(errorDiv);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Effacer l'erreur de newsletter
 */
function clearNewsletterError() {
    const existingError = document.querySelector('.newsletter-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Afficher un succès de newsletter
 */
function showNewsletterSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'newsletter-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    successDiv.style.color = '#10b981';
    successDiv.style.fontSize = '14px';
    successDiv.style.marginTop = '8px';
    successDiv.style.display = 'flex';
    successDiv.style.alignItems = 'center';
    successDiv.style.gap = '8px';
    
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.appendChild(successDiv);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

/**
 * Sauvegarder l'email de newsletter
 */
function saveNewsletterEmail(email) {
    let subscribedEmails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    
    if (!subscribedEmails.includes(email)) {
        subscribedEmails.push(email);
        localStorage.setItem('newsletter_emails', JSON.stringify(subscribedEmails));
    }
}

/**
 * Liens sociaux
 */
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        // Animation au survol
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Suivi des clics
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label') || this.className;
            console.log('Social link clicked:', platform);
            
            // Analytics
            // gtag('event', 'social_click', { platform: platform });
        });
    });
}

/**
 * Animations du footer
 */
function initFooterAnimations() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Animation d'entrée
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.style.transition = 'all 0.8s ease';
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(footer);

    // Animation des sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            section.style.transition = `all 0.5s ease ${index * 0.1}s`;
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300);
    });
}

/**
 * Effets de défilement
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const footerOffset = footer.offsetTop;
        
        // Afficher le footer quand on approche du bas
        if (scrollTop + windowHeight > footerOffset - 100) {
            footer.classList.add('visible');
        }
        
        // Cacher le footer en bas de page
        if (scrollTop + windowHeight >= documentHeight - 10) {
            footer.classList.add('at-bottom');
        } else {
            footer.classList.remove('at-bottom');
        }
        
        // Animation basée sur la direction du défilement
        if (scrollTop > lastScrollTop) {
            // Défilement vers le bas
            footer.style.transform = 'translateY(10px)';
        } else {
            // Défilement vers le haut
            footer.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Mise à jour dynamique du copyright
 */
function updateCopyright() {
    const copyrightElement = document.querySelector('.copyright');
    if (!copyrightElement) return;

    const currentYear = new Date().getFullYear();
    const startYear = 2023; // Année de création du site
    let yearText;
    
    if (currentYear === startYear) {
        yearText = currentYear.toString();
    } else {
        yearText = `${startYear}-${currentYear}`;
    }
    
    // Mettre à jour le texte
    const currentText = copyrightElement.textContent;
    const updatedText = currentText.replace(/\d{4}(-\d{4})?/, yearText);
    copyrightElement.textContent = updatedText;
    
    // Animation
    copyrightElement.style.opacity = '0.7';
    copyrightElement.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        copyrightElement.style.transition = 'all 0.3s ease';
        copyrightElement.style.opacity = '1';
        copyrightElement.style.transform = 'scale(1)';
    }, 10);
}

/**
 * Validation d'email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Gestion des contacts
 */
function initContactInfo() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        const text = item.querySelector('span');
        
        if (!icon || !text) return;

        // Copier au clic
        item.addEventListener('click', function() {
            const textToCopy = text.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopyFeedback(this, 'Copié !');
            }).catch(err => {
                console.error('Erreur lors de la copie:', err);
                showCopyFeedback(this, 'Erreur de copie');
            });
        });
        
        // Tooltip au survol
        item.setAttribute('title', 'Cliquer pour copier');
    });
}

/**
 * Afficher un feedback de copie
 */
function showCopyFeedback(element, message) {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    
    const rect = element.getBoundingClientRect();
    feedback.style.position = 'fixed';
    feedback.style.top = `${rect.top - 40}px`;
    feedback.style.left = `${rect.left + rect.width / 2 - 40}px`;
    feedback.style.background = '#10b981';
    feedback.style.color = 'white';
    feedback.style.padding = '8px 12px';
    feedback.style.borderRadius = '6px';
    feedback.style.fontSize = '12px';
    feedback.style.zIndex = '10000';
    
    document.body.appendChild(feedback);
    
    // Animation
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 2000);
}

/**
 * Carte interactive
 */
function initMap() {
    const mapContainer = document.querySelector('.footer-map');
    if (!mapContainer) return;

    // Créer une carte simple (à remplacer par Google Maps/Leaflet si nécessaire)
    const map = document.createElement('div');
    map.className = 'simple-map';
    map.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map-marker-alt"></i>
            <p>Campus INSTI, Lokossa, Bénin</p>
        </div>
    `;
    
    mapContainer.appendChild(map);
    
    // Au clic, ouvrir Google Maps
    map.addEventListener('click', function() {
        const address = encodeURIComponent('INSTI, Lokossa, Bénin');
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    });
}

/**
 * Horaires d'ouverture dynamiques
 */
function initOpeningHours() {
    const hoursElement = document.querySelector('.opening-hours');
    if (!hoursElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const hour = now.getHours();
    
    const schedule = {
        1: { open: 8, close: 17 }, // Lundi
        2: { open: 8, close: 17 }, // Mardi
        3: { open: 8, close: 17 }, // Mercredi
        4: { open: 8, close: 17 }, // Jeudi
        5: { open: 8, close: 17 }, // Vendredi
        6: { open: 9, close: 12 }, // Samedi
        0: null // Dimanche fermé
    };
    
    let statusText = '';
    let statusClass = '';
    
    if (schedule[day]) {
        const { open, close } = schedule[day];
        
        if (hour >= open && hour < close) {
            statusText = `Ouvert · Fermeture à ${close}h`;
            statusClass = 'open';
        } else if (hour < open) {
            statusText = `Fermé · Ouverture à ${open}h`;
            statusClass = 'closed';
        } else {
            statusText = 'Fermé · Ouverture demain';
            statusClass = 'closed';
        }
    } else {
        statusText = 'Fermé · Ouverture lundi';
        statusClass = 'closed';
    }
    
    // Mettre à jour l'élément
    const statusSpan = hoursElement.querySelector('.hours-status');
    if (statusSpan) {
        statusSpan.textContent = statusText;
        statusSpan.className = `hours-status ${statusClass}`;
    }
}

/**
 * Widget météo
 */
function initWeatherWidget() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (!weatherWidget) return;

    // Simulation de données météo
    const weatherData = {
        temp: 28,
        condition: 'Ensoleillé',
        icon: 'fa-sun',
        location: 'Lokossa'
    };
    
    weatherWidget.innerHTML = `
        <div class="weather-content">
            <i class="fas ${weatherData.icon}"></i>
            <div class="weather-info">
                <span class="weather-temp">${weatherData.temp}°C</span>
                <span class="weather-condition">${weatherData.condition}</span>
                <span class="weather-location">${weatherData.location}</span>
            </div>
        </div>
    `;
    
    // Mettre à jour périodiquement
    setInterval(() => {
        // Simulation de changement de température
        const tempChange = Math.random() * 2 - 1; // -1 à +1
        const newTemp = Math.round(weatherData.temp + tempChange);
        
        const tempElement = weatherWidget.querySelector('.weather-temp');
        if (tempElement) {
            tempElement.textContent = `${newTemp}°C`;
            weatherData.temp = newTemp;
        }
    }, 300000); // Toutes les 5 minutes
}

/**
 * Compteur de visiteurs
 */
function initVisitorCounter() {
    const counterElement = document.querySelector('.visitor-counter');
    if (!counterElement) return;

    // Récupérer le compteur actuel
    let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    
    // Incrémenter
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());
    
    // Formater le nombre
    const formattedCount = visitCount.toLocaleString();
    
    // Mettre à jour l'affichage
    counterElement.innerHTML = `
        <i class="fas fa-users"></i>
        <span>${formattedCount} visiteurs</span>
    `;
    
    // Animation
    counterElement.style.opacity = '0';
    counterElement.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        counterElement.style.transition = 'all 0.5s ease';
        counterElement.style.opacity = '1';
        counterElement.style.transform = 'scale(1)';
    }, 100);
}

// Initialisation complète
window.addEventListener('load', function() {
    updateCopyright();
    initContactInfo();
    initMap();
    initOpeningHours();
    initWeatherWidget();
    initVisitorCounter();
    
    // Mettre à jour les horaires périodiquement
    setInterval(initOpeningHours, 60000); // Toutes les minutes
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #0a3f8f;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: #0b4fa3;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
        
        .footer-toggle {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: 10px;
        }
        
        .hours-status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .hours-status.open {
            background: #d1fae5;
            color: #065f46;
        }
        
        .hours-status.closed {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .simple-map {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .simple-map:hover {
            transform: scale(1.02);
        }
        
        .map-placeholder {
            padding: 20px;
            text-align: center;
            background: #f8fafc;
            border-radius: 8px;
            color: #64748b;
        }
        
        .map-placeholder i {
            font-size: 32px;
            margin-bottom: 10px;
            color: #0a3f8f;
        }
        
        .weather-widget {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }
        
        .weather-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .weather-content i {
            font-size: 36px;
        }
        
        .weather-info {
            display: flex;
            flex-direction: column;
        }
        
        .weather-temp {
            font-size: 24px;
            font-weight: bold;
        }
        
        .visitor-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 15px;
            padding: 10px;
            background: #f1f5f9;
            border-radius: 8px;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
});
