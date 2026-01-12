<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rens</title>

  <!-- General CSS Files -->
  <link rel="stylesheet" href="{{ asset('css/app.min.css') }}">
  <!-- Template CSS -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="{{ asset('css/components.css') }}">
  <link rel="stylesheet" href="{{ asset('bundles/datatables/datatables.min.css') }}">
  <link rel="stylesheet" href="{{ asset('bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css') }}">

  <!-- Custom style CSS -->
  <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
  <link rel='shortcut icon' type='image/x-icon' href="{{ asset('img/favicon.ico') }}" />

</head>

<body class="bg-light">
  <div class="loader"></div>
  <div class="main-wrapper main-wrapper-1">
  <div class="navbar-bg"></div>
  <nav class="navbar navbar-expand-lg main-navbar sticky">
    <div class="form-inline mr-auto">
      <ul class="navbar-nav mr-3">
        <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn"> <i data-feather="align-justify"></i></a></li>

        <li>
          <form class="form-inline mr-auto">
            <div class="search-element">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200">
              <button class="btn" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </form>
        </li>
      </ul>
    </div>
    <ul class="navbar-nav navbar-right">
      <li class="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
          class="nav-link nav-link-lg message-toggle"><i data-feather="mail"></i>
          <span class="badge headerBadge1">
            6 </span> </a>
        <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">
          <div class="dropdown-header">
            Messages
            <div class="float-right">
              <a href="#">Mark All As Read</a>
            </div>
          </div>
          <div class="dropdown-list-content dropdown-list-message">
            <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar
											text-white"> <img alt="image" src="assets/img/users/user-1.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">John
                  Deo</span>
                <span class="time messege-text">Please check your mail !!</span>
                <span class="time">2 Min Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar text-white">
                <img alt="image" src="assets/img/users/user-2.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">Sarah
                  Smith</span> <span class="time messege-text">Request for leave
                  application</span>
                <span class="time">5 Min Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar text-white">
                <img alt="image" src="assets/img/users/user-5.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">Jacob
                  Ryan</span> <span class="time messege-text">Your payment invoice is
                  generated.</span> <span class="time">12 Min Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar text-white">
                <img alt="image" src="assets/img/users/user-4.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">Lina
                  Smith</span> <span class="time messege-text">hii John, I have upload
                  doc
                  related to task.</span> <span class="time">30
                  Min Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar text-white">
                <img alt="image" src="assets/img/users/user-3.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">Jalpa
                  Joshi</span> <span class="time messege-text">Please do as specify.
                  Let me
                  know if you have any query.</span> <span class="time">1
                  Days Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-avatar text-white">
                <img alt="image" src="assets/img/users/user-2.png" class="rounded-circle">
              </span> <span class="dropdown-item-desc"> <span class="message-user">Sarah
                  Smith</span> <span class="time messege-text">Client Requirements</span>
                <span class="time">2 Days Ago</span>
              </span>
            </a>
          </div>
          <div class="dropdown-footer text-center">
            <a href="#">View All <i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </li>
      <li class="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
          class="nav-link notification-toggle nav-link-lg"><i data-feather="bell" class="bell"></i>
        </a>
        <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">
          <div class="dropdown-header">
            Notifications
            <div class="float-right">
              <a href="#">Mark All As Read</a>
            </div>
          </div>
          <div class="dropdown-list-content dropdown-list-icons">
            <a href="#" class="dropdown-item dropdown-item-unread"> <span
                class="dropdown-item-icon bg-primary text-white"> <i class="fas
												fa-code"></i>
              </span> <span class="dropdown-item-desc"> Template update is
                available now! <span class="time">2 Min
                  Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-icon bg-info text-white"> <i class="far
												fa-user"></i>
              </span> <span class="dropdown-item-desc"> <b>You</b> and <b>Dedik
                  Sugiharto</b> are now friends <span class="time">10 Hours
                  Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-icon bg-success text-white"> <i
                  class="fas
												fa-check"></i>
              </span> <span class="dropdown-item-desc"> <b>Kusnaedi</b> has
                moved task <b>Fix bug header</b> to <b>Done</b> <span class="time">12
                  Hours
                  Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-icon bg-danger text-white"> <i
                  class="fas fa-exclamation-triangle"></i>
              </span> <span class="dropdown-item-desc"> Low disk space. Let's
                clean it! <span class="time">17 Hours Ago</span>
              </span>
            </a> <a href="#" class="dropdown-item"> <span class="dropdown-item-icon bg-info text-white"> <i class="fas
												fa-bell"></i>
              </span> <span class="dropdown-item-desc"> Welcome to Otika
                template! <span class="time">Yesterday</span>
              </span>
            </a>
          </div>
          <div class="dropdown-footer text-center">
            <a href="#">View All <i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </li>
      <li class="dropdown"><a href="#" data-toggle="dropdown"
          class="nav-link dropdown-toggle nav-link-lg nav-link-user">  @if (Auth::user()?->photo_url)
          <img src="{{ Auth::user()->photo_url }}" alt="Photo" style="width: 30px; height: 30px;">
          @else:
            <ion-icon name="person-circle-outline" style="width: 40px; height: 40px; color: gray"></ion-icon>
          @endif <span class="d-sm-none d-lg-inline-block"></span></a>
        <div class="dropdown-menu dropdown-menu-right pullDown">
          <div class="dropdown-title">Hello Sarah Smith</div>
          <a href="profile.html" class="dropdown-item has-icon"> <i class="far
										fa-user"></i> Profile
          </a> <a href="timeline.html" class="dropdown-item has-icon"> <i class="fas fa-bolt"></i>
            Activities
          </a> <a href="#" class="dropdown-item has-icon"> <i class="fas fa-cog"></i>
            Settings
          </a>
          <div class="dropdown-divider"></div>
          <a href="auth-login.html" class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="index.html"> <img alt="image" src="{{ asset('img/logo_insti.jpeg') }}" class="header-logo" /> <span
            class="logo-name">INSTI-Lok</span>
        </a>
      </div>
      <ul class="sidebar-menu">
        <li class="menu-header">{{ Auth::user()->role->name ?? 'null' }}</li>
        @if (Auth::user()?->role?->name == 'gestionnaire'):
        <li class="dropdown">
          <a href="{{ route('dashboard.gestionnaire') }}" class="nav-link"><i data-feather="monitor"></i><span>Tableau de bord</span></a>
        </li>
        <li class="dropdown">
          <a href="{{ route('users.gestionnaire') }}" class="nav-link"><i data-feather="monitor"></i><span>Utilisateurs</span></a>
        </li>
        <li class="dropdown">
          <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="command"></i><span>Role</span></a>
          <ul class="dropdown-menu">
            <li><a class="nav-link" href="{{ route('role.gestionnaire') }}">Voir les roles</a></li>
            <li><a class="nav-link" href="{{ route('create_role.gestionnaire') }}">Ajouter</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="command"></i><span>Offres</span></a>
          <ul class="dropdown-menu">
            <li><a class="nav-link" href="{{ route('offres.gestionnaire') }}">Voir les offres</a></li>
            <li><a class="nav-link" href="{{ route('create_offre.gestionnaire') }}">Ajouter</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="mail"></i><span>Candidatures</span></a>
        </li>
        <li class="dropdown">
           <form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit" class="menu-toggle nav-link has-dropdown">
      <i data-feather="monitor"></i>
        Se déconnecter
    </button>
</form>
          
        </li>
       

        @elseif (Auth::user()?->role?->name == 'administrateur'):
        <li class="dropdown">
          <a href="{{ route('dashboard.gestionnaire') }}" class="nav-link"><i data-feather="monitor"></i><span>Tableau de bord</span></a>
        </li>
        <li class="dropdown">
          <a href="{{ route('users.gestionnaire') }}" class="nav-link"><i data-feather="monitor"></i><span>Utilisateurs</span></a>
        </li>

        <li class="dropdown">
          <a href="#" class="menu-toggle nav-link has-dropdown"><i data-feather="command"></i><span>Offres</span></a>
          <ul class="dropdown-menu">
            <li><a class="nav-link" href="chat.html">Voir les offres</a></li>
            <li><a class="nav-link" href="portfolio.html">Ajouter</a></li>
          </ul>
        </li>
        @elseif (Auth::user()?->role?->name == 'evaluateur'):
        <li class="dropdown">
          <a href="{{ route('dashboard.evaluateur') }}" class="nav-link"><i data-feather="monitor"></i><span>Tableau de bord</span></a>
        </li>
        <li class="dropdown">
          <a href="{{ route('evaluations.evaluateur') }}" class="nav-link"><i data-feather="monitor"></i><span>Evaluations</span></a>
        </li>
..

         <li>
           <form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit" class="menu-toggle nav-link has-dropdown">
      <i data-feather="monitor"></i>
        Se déconnecter
    </button>
</form>
          
        </li>

        @else:
         <li class="dropdown">
          <a href="{{ route('dashboard.enseignant') }}" class="nav-link"><i data-feather="monitor"></i><span>Tableau de board</span></a>
        </li>
        <li class="dropdown">
          <a href="{{ route('candidatures.enseignant') }}" class="nav-link"><i data-feather="command"></i><span>Mes candidatures</span></a>
        </li>   
        <li class="dropdown">
          <a href="{{ route('home') }}" class="nav-link"><i data-feather="monitor"></i><span>Accueil</span></a>
        </li>
        
        <li>
             <form method="POST" action="{{ route('logout') }}">
    @csrf
    <button type="submit" class="menu-toggle nav-link has-dropdown">
      <i data-feather="monitor"></i>
        Se déconnecter
    </button>
</form>
        </li>
          
          
        </li>
        @endif



      </ul>
    </aside>
  </div>
  <main>
    <div class="loader"></div>
    <div id="app">
      <div class="main-wrapper main-wrapper-1">
        
        @yield('content')
      </div>
    </div>
  </main>
  <footer class="main-footer">
    <div class="footer-left">
      <a href="templateshub.net">Templateshub</a></a>
    </div>
    <div class="footer-right">
    </div>
  </footer>
</div>
</body>

</html>

<!-- Bootstrap & FontAwesome -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- General JS Scripts -->
<script src="{{ asset('js/app.min.js') }}"></script>
<!-- JS Libraies -->
<!-- Page Specific JS File -->
<!-- Template JS File -->
<script src="{{ asset('js/scripts.js') }}"></script>
<!-- Custom JS File -->
<script src="{{ asset('js/custom.js') }}"></script>


<!-- General JS Scripts -->
<script src="{{ asset('js/app.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/datatables.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/buttons.flash.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/jszip.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/pdfmake.min.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/vfs_fonts.js') }}"></script>
<script src="{{ asset('bundles/datatables/export-tables/buttons.print.min.js') }}"></script>
<script src="{{ asset('js/page/datatables.js') }}"></script>
<!-- Template JS File -->
<script src="{{ asset('js/scripts.js') }}"></script>
<!-- Custom JS File -->
<script src="{{ asset('js/custom.js') }}"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>


<script src="{{ asset('bundles/summernote/summernote-bs4.js') }}"></script>