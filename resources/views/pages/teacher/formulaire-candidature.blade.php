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
                        <p class="text-muted">Les champs marqués d’un <span class="text-danger">*</span> sont obligatoires</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====== MESSAGE SUCCÈS ====== -->
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('store_candidature.enseignant', $appel->id) }}" method="POST" enctype="multipart/form-data">
            @csrf

            <!-- ================= INFORMATIONS PERSONNELLES ================= -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4><i class="fas fa-user text-primary mr-2"></i>Informations personnelles</h4>
                </div>

                <div class="card-body">
                    <div class="row">

                        @php
                            function errorClass($errors, $field) {
                                return $errors->has($field) ? 'is-invalid' : '';
                            }
                        @endphp

                        <!-- Nom -->
                        <div class="form-group col-md-6">
                            <label>Nom <span class="text-danger">*</span></label>
                            <input type="text" name="nom" value="{{ old('nom') }}"
                                   class="form-control {{ errorClass($errors,'nom') }}">
                            @error('nom')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Prénom -->
                        <div class="form-group col-md-6">
                            <label>Prénom <span class="text-danger">*</span></label>
                            <input type="text" name="prenom" value="{{ old('prenom') }}"
                                   class="form-control {{ errorClass($errors,'prenom') }}">
                            @error('prenom')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Sexe -->
                        <div class="form-group col-md-6">
                            <label>Sexe <span class="text-danger">*</span></label>
                            <select name="sexe" class="form-control {{ errorClass($errors,'sexe') }}">
                                <option value="">-- Sélectionner --</option>
                                <option value="M" {{ old('sexe')=='M'?'selected':'' }}>Masculin</option>
                                <option value="F" {{ old('sexe')=='F'?'selected':'' }}>Féminin</option>
                            </select>
                            @error('sexe')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Photo -->
                        <div class="form-group col-md-6">
                            <label>Photo <span class="text-danger">*</span></label>
                            <input type="file" name="photo_url"
                                   class="form-control {{ errorClass($errors,'photo_url') }}">
                            @error('photo_url')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Date naissance -->
                        <div class="form-group col-md-6">
                            <label>Date de naissance <span class="text-danger">*</span></label>
                            <input type="date" name="date_naissance" value="{{ old('date_naissance') }}"
                                   class="form-control {{ errorClass($errors,'date_naissance') }}">
                            @error('date_naissance')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Lieu naissance -->
                        <div class="form-group col-md-6">
                            <label>Lieu de naissance <span class="text-danger">*</span></label>
                            <input type="text" name="lieu_naissance" value="{{ old('lieu_naissance') }}"
                                   class="form-control {{ errorClass($errors,'lieu_naissance') }}">
                            @error('lieu_naissance')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Téléphone -->
                        <div class="form-group col-md-6">
                            <label>Téléphone <span class="text-danger">*</span></label>
                            <input type="tel" name="telephone" value="{{ old('telephone') }}"
                                   class="form-control {{ errorClass($errors,'telephone') }}">
                            @error('telephone')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Adresse -->
                        <div class="form-group col-md-6">
                            <label>Adresse <span class="text-danger">*</span></label>
                            <input type="text" name="adresse" value="{{ old('adresse') }}"
                                   class="form-control {{ errorClass($errors,'adresse') }}">
                            @error('adresse')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- Email -->
                        <div class="form-group col-md-6">
                            <label>Email <span class="text-danger">*</span></label>
                            <input type="email" name="email" value="{{ old('email') }}"
                                   class="form-control {{ errorClass($errors,'email') }}">
                            @error('email')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                       

                        <!-- Diplôme -->
                        <div class="form-group col-md-6">
                            <label>Diplôme <span class="text-danger">*</span></label>
                            <input type="file" name="diplome"
                                   class="form-control {{ errorClass($errors,'diplome') }}">
                            @error('diplome')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                        <div class="form-group col-md-6">
                            <label>CV <span class="text-danger">*</span></label>
                            <input type="file" name="cv"
                                   class="form-control {{ errorClass($errors,'cv') }}">
                            @error('cv')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                    </div>
                </div>
            </div>

            <!-- ================= INFORMATIONS PROFESSIONNELLES ================= -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4><i class="fas fa-briefcase text-success mr-2"></i>Informations professionnelles</h4>
                </div>

                <div class="card-body">
                    <div class="row">

                        <!-- IFU -->
                        <div class="form-group col-md-6">
                            <label>IFU <span class="text-danger">*</span></label>
                            <input type="text" name="ifu" value="{{ old('ifu') }}"
                                   class="form-control {{ errorClass($errors,'ifu') }}">
                            @error('ifu')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                        <!-- UE -->
                        <div class="form-group col-md-6">
                            <label>UE postulée <span class="text-danger">*</span></label>
                            <select name="ue_id" class="form-control {{ errorClass($errors,'ue_id') }}">
                                <option value="">-- Sélectionner --</option>
                                @foreach($ues as $ue)
                                    <option value="{{ $ue->id }}" {{ old('ue_id')==$ue->id?'selected':'' }}>
                                        {{ $ue->name }}
                                    </option>
                                @endforeach
                            </select>
                            @error('ue_id')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                    </div>
                </div>
            </div>

            <!-- SUBMIT -->
            <div class="text-right mb-4">
                <button type="submit" class="btn btn-success btn-lg">
                    <i class="fas fa-paper-plane mr-1"></i> Soumettre la candidature
                </button>
            </div>

        </form>
    </section>
</div>
@endsection
