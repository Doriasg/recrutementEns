@extends('dashboard')
@section('content')

<div class="main-content">
    <section class="section">
        <div class="section-body">
            @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>
            @endif

            <div class="row">
                <div class="col-12 col-md-12 col-lg-12">
                    <div class="card">
                        <form action="{{ route('store_offre.gestionnaire') }}" method="POST" enctype="multipart/form-data">
                            @csrf

                            <div class="card-header">
                                <h4>Ajouter une offre</h4>
                            </div>

                            <div class="card-body">
                                <!-- Titre -->
                                <div class="form-group">
                                    <label>Titre <span class="text-danger">*</span></label>
                                    <input type="text" name="title" class="form-control" value="{{ old('title') }}" required>
                                    @error('title')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Description -->
                                <div class="form-group">
                                    <label>Description <span class="text-danger">*</span></label>
                                    <textarea name="description" class="form-control" rows="3" required>{{ old('description') }}</textarea>
                                    @error('description')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Année -->
                                <div class="form-group">
                                    <label>Année <span class="text-danger">*</span></label>
                                    <select name="annee_id" class="form-control" required>
                                        <option value="">Sélectionner une année</option>
                                        @foreach($annees as $annee)
                                            <option value="{{ $annee->id }}" {{ old('annee_id') == $annee->id ? 'selected' : '' }}>
                                                {{ $annee->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('annee_id')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Semestre -->
                                <div class="form-group">
                                    <label>Semestre <span class="text-danger">*</span></label>
                                    <select name="semestre_id" class="form-control" required>
                                        <option value="">Sélectionner un semestre</option>
                                        @foreach($semestres as $semestre)
                                            <option value="{{ $semestre->id }}" {{ old('semestre_id') == $semestre->id ? 'selected' : '' }}>
                                                {{ $semestre->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('semestre_id')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Date limite -->
                                <div class="form-group">
                                    <label>Date limite <span class="text-danger">*</span></label>
                                    <input type="date" name="date_fin" class="form-control" value="{{ old('date_fin') }}" required>
                                    @error('date_fin')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Fichier -->
                                <div class="form-group">
                                    <label>Fichier <span class="text-danger">*</span></label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" name="fichier_url" id="customFile" required>
                                        <label class="custom-file-label" for="customFile">Choisir un fichier</label>
                                    </div>
                                    @error('fichier_url')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>

                                <!-- Bouton -->
                                <div class="form-group mt-4">
                                    <button type="submit" class="btn btn-primary">Ajouter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sidebar settings inchangés -->
    <div class="settingSidebar">
        <a href="javascript:void(0)" class="settingPanelToggle"><i class="fa fa-spin fa-cog"></i></a>
        <div class="settingSidebar-body ps-container ps-theme-default">
            <div class="fade show active">
                <div class="setting-panel-header">Setting Panel</div>
                <!-- ... ton code existant pour le sidebar ... -->
            </div>
        </div>
    </div>
</div>

@endsection
