@extends('layouts.auth')

@section('title', 'INSTI - Inscription')

@section('content')
    <div class="auth-container">
        <div class="register-card">
            <div class="card-header">
                <h2>Créer un compte candidat</h2>
                <p>Inscrivez-vous pour postuler aux offres</p>
            </div>

            <div class="card-content">
                <form method="POST" action="{{ route('register') }}">
                    @csrf
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="name">Nom <span class="required">*</span></label>
                            <div class="input-with-icon">
                                <i class="fas fa-user"></i>
                                <input type="text" id="name" name="name" value="{{ old('name') }}" 
                                       placeholder="Votre nom" required>
                            </div>
                            @error('name')
                                <span class="error-message">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="first_name">Prénom(s) <span class="required">*</span></label>
                            <div class="input-with-icon">
                                <i class="fas fa-user"></i>
                                <input type="text" id="first_name" name="first_name" value="{{ old('first_name') }}" 
                                       placeholder="Votre prénom" required>
                            </div>
                            @error('first_name')
                                <span class="error-message">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="email">Email <span class="required">*</span></label>
                            <div class="input-with-icon">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="email" name="email" value="{{ old('email') }}" 
                                       placeholder="email@example.com" required>
                            </div>
                            @error('email')
                                <span class="error-message">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <div class="input-with-icon">
                                <i class="fas fa-phone"></i>
                                <input type="tel" id="phone" name="phone" value="{{ old('phone') }}" 
                                       placeholder="+229 XX XX XX XX">
                            </div>
                            @error('phone')
                                <span class="error-message">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="password">Mot de passe <span class="required">*</span></label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="password" name="password" 
                                       placeholder="Mot de passe" required>
                                <span class="password-toggle" id="togglePassword">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </div>
                            @error('password')
                                <span class="error-message">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="password_confirmation">Confirmer mot de passe <span class="required">*</span></label>
                            <div class="input-with-icon">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="password_confirmation" name="password_confirmation" 
                                       placeholder="Confirmer mot de passe" required>
                                <span class="password-toggle" id="toggleConfirmPassword">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label for="specialty">Spécialité</label>
                        <select id="specialty" name="specialty">
                            <option value="" selected disabled>Choisissez votre spécialité</option>
                            <option value="informatique" {{ old('specialty') == 'informatique' ? 'selected' : '' }}>Informatique</option>
                            <option value="genie_electrique" {{ old('specialty') == 'genie_electrique' ? 'selected' : '' }}>Génie Électrique</option>
                            <option value="genie_mecanique" {{ old('specialty') == 'genie_mecanique' ? 'selected' : '' }}>Génie Mécanique</option>
                            <option value="genie_civil" {{ old('specialty') == 'genie_civil' ? 'selected' : '' }}>Génie Civil</option>
                            <option value="telecommunications" {{ old('specialty') == 'telecommunications' ? 'selected' : '' }}>Télécommunications</option>
                            <option value="gestion" {{ old('specialty') == 'gestion' ? 'selected' : '' }}>Gestion</option>
                        </select>
                        @error('specialty')
                            <span class="error-message">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="checkbox-group">
                        <input type="checkbox" id="terms" name="terms" required {{ old('terms') ? 'checked' : '' }}>
                        <label for="terms">
                            J'accepte les <a href="{{ route('terms') }}" target="_blank">conditions générales</a> et la
                            <a href="{{ route('privacy') }}" target="_blank">politique de confidentialité</a>
                            <span class="required">*</span>
                        </label>
                        @error('terms')
                            <span class="error-message">{{ $message }}</span>
                        @enderror
                    </div>

                    <button type="submit" class="btn-register">
                        <i class="fas fa-user-plus"></i> Créer mon compte
                    </button>

                    <div class="login-link">
                        Déjà inscrit ?
                        <a href="{{ route('login') }}">Se connecter</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPassword = document.getElementById('password_confirmation');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    if (toggleConfirmPassword && confirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Password strength check
    password.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        updatePasswordStrength(strength);
    });

    function checkPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    function updatePasswordStrength(strength) {
        // Implementation for password strength indicator
        console.log('Password strength:', strength);
    }
</script>
@endpush
