@extends('dashboard')
@section('content')
 {{-- TABLE DES CANDIDATURES --}}
 <div class="main-content">
    <section class="section">

        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Mes candidatures récentes</h4>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tr>
                                    <th>Poste</th>
                                    <th>Département</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                </tr>

                                <tr>
                                    <td>Enseignant Génie Électrique</td>
                                    <td>Génie Électrique</td>
                                    <td>10/12/2024</td>
                                    <td><span class="badge badge-warning">En examen</span></td>
                                </tr>

                                <tr>
                                    <td>Enseignant Informatique</td>
                                    <td>Informatique</td>
                                    <td>08/12/2024</td>
                                    <td><span class="badge badge-success">Acceptée</span></td>
                                </tr>

                                <tr>
                                    <td>Enseignant Génie Mécanique</td>
                                    <td>Génie Mécanique</td>
                                    <td>05/12/2024</td>
                                    <td><span class="badge badge-warning">En examen</span></td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>
 </div>
@endsection
