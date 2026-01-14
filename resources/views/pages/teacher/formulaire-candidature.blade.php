@extends('dashboard')

@section('title', 'INSTI - Candidature')

@section('content')
<div class="main-content">
    <section class="section">

        <!-- ====== HEADER ====== -->
        <div class="row">
            <div class="col-12">
                <div class="card card-hero">
                    <div class="card-body text-center">
                        <h2>Formulaire de Candidature</h2>
                        <p>Veuillez renseigner correctement vos informations</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====== AFFICHAGE DES ERREURS ====== -->
        @if($errors->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <!-- ====== FORMULAIRE ====== -->
        <form action="{{ route('store_candidature.enseignant', $offre->id) }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-user mr-2 text-primary"></i>Informations du candidat</h4>
                </div>

                <div class="card-body">
                    <div class="row">

                        <!-- Nom complet -->
                        <div class="form-group col-md-6">
                            <label>Nom complet</label>
                            <input type="text" name="name" value="{{ old('name') }}" class="form-control" required>
                        </div>

                        <!-- Sexe -->
                        <div class="form-group col-md-6">
                            <label>Sexe</label>
                            <select name="sexe" class="form-control" required>
                                <option value="">-- Sélectionner --</option>
                                <option value="M" {{ old('sexe') == 'M' ? 'selected' : '' }}>Masculin</option>
                                <option value="F" {{ old('sexe') == 'F' ? 'selected' : '' }}>Féminin</option>
                            </select>
                        </div>

                        <!-- Date de naissance -->
                        <div class="form-group col-md-6">
                            <label>Date de naissance</label>
                            <input type="date" name="date_naissance" value="{{ old('date_naissance') }}" class="form-control" required>
                        </div>

                        <!-- Contact -->
                        <div class="form-group col-md-6">
                            <label>Contact</label>
                            <input type="tel" name="contact" value="{{ old('contact') }}" class="form-control" required>
                        </div>

                        <!-- Email -->
                        <div class="form-group col-md-6">
                            <label>Email</label>
                            <input type="email" name="email" value="{{ old('email') }}" class="form-control" required>
                        </div>

                        <!-- Diplôme -->
                        <div class="form-group col-md-6">
                            <label>Diplôme</label>
                            <input type="file" name="diplome" value="{{ old('diplome') }}" class="form-control" required>
                        </div>

                        <!-- CV -->
                        <div class="form-group col-md-6">
                            <label>Curriculum Vitae (CV)</label>
                            <input type="file" name="cv" class="form-control" required>
                        </div>

                        <!-- Attestation -->
                        <div class="form-group col-md-6">
                            <label>Attestation</label>
                            <input type="file" name="attestation" class="form-control" required>
                        </div>

                        <!-- Lettre manuscrite -->
                        <div class="form-group col-md-6">
                            <label>Lettre manuscrite</label>
                            <input type="file" name="demande" class="form-control" required>
                        </div>

                    </div>
                </div>

                <!-- SUBMIT -->
                <div class="card-footer text-right">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-paper-plane mr-1"></i> Soumettre
                    </button>
                </div>
            </div>
        </form>

    </section>
</div>
@endsection
