@extends('dashboard')
@section('content')
<div class="main-content">
    <section class="section">

        <!-- Messages de succès / erreur -->
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if($errors->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="section-body">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>Liste des utilisateurs</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover" id="tableExport" style="width:100%;">
                                    <thead>
                                        <tr>
                                            <th>Nom complet</th>
                                            <th>Email</th>
                                            <th>Photo</th>
                                            <th>Sexe</th>
                                            <th>Rôle</th>
                                            <th>Date de création</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($users as $user)
                                        <tr class="clickable-row" data-href="{{ route('show_user.gestionnaire', $user->id) }}">
                                            <td>{{ $user->nom }} {{ $user->prenom }}</td>
                                            <td>{{ $user->email }}</td>
                                            <td>
                                                @if ($user->photo_url)
                                                    <img src="{{ $user->photo_url }}" alt="Photo" style="width: 40px; height: 40px; border-radius:50%;">
                                                @else
                                                    <ion-icon name="person-circle-outline" style="width: 40px; height: 40px"></ion-icon>
                                                @endif
                                            </td>
                                            <td>{{ $user->sexe ?? 'Non défini' }}</td>
                                            <td>{{ $user->role->name ?? 'Non défini' }}</td>
                                            <td>{{ $user->created_at->format('d/m/Y H:i') }}</td>
                                            <td>
                                                <a href="{{ route('edit_user.gestionnaire', $user->id) }}" class="btn btn-sm btn-primary">Modifier</a>
                                                <a href="{{ route('show_user.gestionnaire', $user->id) }}" class="btn btn-sm btn-info">
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </a>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <!-- Sidebar settings (inchangées) -->
    <div class="settingSidebar">
        <a href="javascript:void(0)" class="settingPanelToggle"> <i class="fa fa-spin fa-cog"></i></a>
        <div class="settingSidebar-body ps-container ps-theme-default">
            <div class="fade show active">
                <div class="setting-panel-header">Setting Panel</div>
                <!-- ton contenu sidebar ici... -->
            </div>
        </div>
    </div>
</div>

<!-- Script pour redirection en cliquant sur la ligne -->
@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.clickable-row').forEach(row => {
            row.addEventListener('click', () => {
                window.location.href = row.dataset.href;
            });
        });
    });
</script>
@endpush
@endsection
