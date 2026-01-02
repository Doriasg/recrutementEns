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
    
    <!-- CSS Global -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    
    <!-- CSS Layout public -->
    <link rel="stylesheet" href="{{ asset('css/layouts/public.css') }}">
    
    <!-- CSS Partials -->
    <link rel="stylesheet" href="{{ asset('css/partials/header.css') }}">
    <link rel="stylesheet" href="{{ asset('css/partials/footer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/partials/sidebar.css') }}">
    
    <!-- CSS Page spécifique -->
    @stack('styles')
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
    
    <!-- JS Global -->
    <script src="{{ asset('js/app.js') }}"></script>
    
    <!-- JS Layout public -->
    <script src="{{ asset('js/layouts/public.js') }}"></script>
    
    <!-- JS Page spécifique -->
    @stack('scripts')
</body>
</html>
