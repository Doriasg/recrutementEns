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
