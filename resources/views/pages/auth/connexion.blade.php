@extends('layouts.auth')

@section('title', 'INSTI - Connexion')

@section('content')
    <div class="auth-container">
        <div class="login-card">
            <div class="card-header">
                <h2>Connexion</h2>
                <p>Accédez à votre espace candidat</p>
            </div>

            <div class="card-content">
                <form method="POST" action="{{ route('login') }}" id="loginForm">
                    @csrf
                    
                    <div class="form-group">
                        <label for="login-email">Adresse email</label>
                        <div class="input-with-icon">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="login-email" name="email" value="{{ old('email') }}" 
                                   placeholder="votre.email@example.com" required autofocus>
                        </div>
                        @error('email')
                            <span class="error-message">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="login-password">Mot de passe</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="login-password" name="password" 
                                   placeholder="Votre mot de passe" required>
                            <span class="password-toggle" id="toggleLoginPassword">
                                <i class="fas fa-eye"></i>
                            </span>
                        </div>
                        @error('password')
                            <span class="error-message">{{ $message }}</span>
                        @enderror
                        <div class="forgot-password">
                            <a href="{{ route('password.request') }}">Mot de passe oublié ?</a>
                        </div>
                    </div>

                    <div class="form-group remember-me">
                        <input type="checkbox" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label for="remember">Se souvenir de moi</label>
                    </div>

                    <button type="submit" class="btn-login">
                        <i class="fas fa-sign-in-alt"></i> Se connecter
                    </button>

                    <div class="register-link">
                        Vous n'avez pas de compte ? <a href="{{ route('register') }}">Créer un compte</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Toggle password visibility
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const loginPassword = document.getElementById('login-password');

    if (toggleLoginPassword && loginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
</script>
@endpush
