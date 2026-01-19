@extends('dashboard')
@section('content')
<div class="main-content">
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">

            <!-- Message de succès -->
            @if(session('success'))
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            @endif

            <div class="card-header">
              <h4>Modifier l'utilisateur {{ $user->nom }} {{ $user->prenom }}</h4>
            </div>
            <div class="card-body">
              <form action="{{ route('user_update.gestionnaire', $user->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <!-- Nom -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="nom" class="form-control @error('nom') is-invalid @enderror" value="{{ old('nom', $user->nom) }}" required>
                    @error('nom')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Prénom -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="prenom" class="form-control @error('prenom') is-invalid @enderror" value="{{ old('prenom', $user->prenom) }}" required>
                    @error('prenom')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Sexe -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                    Sexe <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 col-md-7">
                    <select name="sexe" class="form-control selectric @error('sexe') is-invalid @enderror" required>
                      <option value="">Sélectionner</option>
                      <option value="Masculin" {{ old('sexe', $user->sexe) == 'Masculin' ? 'selected' : '' }}>Masculin</option>
                      <option value="Féminin" {{ old('sexe', $user->sexe) == 'Féminin' ? 'selected' : '' }}>Féminin</option>
                    </select>
                    @error('sexe')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Photo -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Photo</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="file" name="photo_url" class="form-control @error('photo_url') is-invalid @enderror">
                    @if($user->photo_url)
                      <img src="{{ $user->photo_url }}" alt="Photo" class="mt-2" style="width: 80px; height: 80px;">
                    @endif
                    @error('photo_url')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Date de naissance -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Date de naissance</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="date" name="date_naissance" class="form-control @error('date_naissance') is-invalid @enderror" value="{{ old('date_naissance', $user->date_naissance) }}">
                    @error('date_naissance')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Lieu de naissance -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Lieu de naissance</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="lieu_naissance" class="form-control @error('lieu_naissance') is-invalid @enderror" value="{{ old('lieu_naissance', $user->lieu_naissance) }}">
                    @error('lieu_naissance')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Téléphone -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Téléphone</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="telephone" class="form-control @error('telephone') is-invalid @enderror" value="{{ old('telephone', $user->telephone) }}">
                    @error('telephone')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Adresse -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Adresse</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="adresse" class="form-control @error('adresse') is-invalid @enderror" value="{{ old('adresse', $user->adresse) }}">
                    @error('adresse')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Diplôme -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Diplôme</label>
                  <div class="col-sm-12 col-md-7">
                    <input type="text" name="diplome" class="form-control @error('diplome') is-invalid @enderror" value="{{ old('diplome', $user->diplome) }}">
                    @error('diplome')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                    Email <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 col-md-7">
                    <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email', $user->email) }}" required>
                    @error('email')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Rôle -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                    Rôle <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm-12 col-md-7">
                    <select name="role_id" class="form-control selectric @error('role_id') is-invalid @enderror" required>
                      <option value="">Sélectionner un rôle</option>
                      @foreach($roles as $role)
                        <option value="{{ $role->id }}" {{ old('role_id', $user->role_id) == $role->id ? 'selected' : '' }}>
                          {{ $role->name }}
                        </option>
                      @endforeach
                    </select>
                    @error('role_id')
                      <small class="text-danger">{{ $message }}</small>
                    @enderror
                  </div>
                </div>

                <!-- Bouton -->
                <div class="form-group row mb-4">
                  <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                  <div class="col-sm-12 col-md-7">
                    <button class="btn btn-primary" type="submit">Attribuer</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
@endsection
