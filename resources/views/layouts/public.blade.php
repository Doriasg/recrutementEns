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
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/layouts/public.css') }}">

    <!-- Styles des partials (header, footer, sidebar) -->
    <link rel="stylesheet" href="{{ asset('css/partials/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/partials/footer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/partials/sidebar.css') }}">

    <!-- Styles spécifiques aux pages -->
    @stack('page-styles')
</head>
<body>
    <!-- Top Line -->
    <div class="top-line"></div>
    
    <!-- Header -->
    @include('partials.headers.public')
    
    <!-- Main Content -->
    <main>
        @yield('content')
    </main>
    
    <!-- Footer -->
    @include('partials.footer')
    
    <!-- Scripts globaux -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/layouts/public.js') }}"></script>

    <!-- Scripts spécifiques aux pages -->
    @stack('page-scripts')
</body>
</html>
