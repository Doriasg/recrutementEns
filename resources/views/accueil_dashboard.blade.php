<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Administration | Plateforme de Recrutement INSTI</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Icônes -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-lg border-0 rounded-4 w-100" style="max-width: 850px;">
        <div class="row g-0">

            <!-- Colonne gauche -->
            <div class="col-md-5 bg-primary text-white d-flex flex-column justify-content-center p-4 rounded-start-4">
                <h2 class="fw-bold mb-3">
                    <i class="bi bi-mortarboard-fill me-2"></i> INSTI
                </h2>
                <p class="fs-6">
                    Plateforme officielle de gestion et de recrutement des enseignants.
                </p>
                <p class="small opacity-75">
                    Administration sécurisée • Transparence • Excellence académique
                </p>
            </div>

            <!-- Colonne droite -->
            <div class="col-md-7 p-5">
                <h3 class="fw-bold mb-3">Bienvenue sur la plateforme de recrutement des enseignants de l'INSTI</h3>

                <p class="text-muted">
                    Vous êtes connecté en tant qu’<strong> administrateur</strong> de la plateforme
                    de recrutement des enseignants de l’INSTI.
                </p>

                <div class="alert alert-info mt-4">
                    <i class="bi bi-info-circle-fill me-2"></i>
                    Cliquez sur <strong>Commencer</strong> pour accéder à votre espace de gestion.
                </div>

                <div class="d-flex justify-content-end mt-4">
                    <a href="{{ @if(auth()->user()->role == 'gestionnaire') route('dashboard.gestionnaire')
                     @elseif(auth()->user()->role == 'evaluateur') route('dashboard.evaluateur')
                     @else route('dashboard.enseignant')
                      @endif }}"
                       class="btn btn-primary btn-lg px-4">
                        <i class="bi bi-arrow-right-circle me-2"></i>
                        Commencer
                    </a>
                </div>
            </div>

        </div>
    </div>
</div>

</body>
</html>
