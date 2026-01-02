<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'INSTI - Administration')</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/layouts/admin.css') }}">
    @stack('styles')
</head>
<body>
    <!-- Top Line -->
    <div class="top-line"></div>
    
    <!-- Header -->
    @include('partials.headers.admin')
    
    <!-- Main Content -->
    <div class="main-wrapper">
        <!-- Sidebar -->
        @include('partials.sidebar.admin')
        
        <!-- Content Area -->
        <main class="content-area">
            @yield('content')
        </main>
    </div>
    
    <!-- Footer -->
    @include('partials.footer')
    
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/layouts/admin.js') }}"></script>
    @stack('scripts')
</body>
</html>
