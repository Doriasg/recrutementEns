@extends('dashboard')

@section('content')
<div class="main-content">
    <section class="section">
        <div class="section-body">
            @forelse($offres as $offre)
                <div class="card mb-3">
                    <div class="card-header bg-primary text-white">
                        Offre : {{ $offre->name }}
                    </div>
                    <div class="card-body p-0">
                        @if($offre->candidatures->count() > 0)
                            <table class="table table-striped table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom du candidat</th>
                                        <th>Status</th>
                                        <th>Date de soumission</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($offre->candidatures as $index => $c)
                                        <tr>
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ $c->name }}</td>
                                            <td>{{ ucfirst($c->status) }}</td>
                                            <td>{{ $c->created_at->format('d/m/Y') }}</td>
                                            <td>  <a href="{{ route('show_candidature.evaluateur', $c->id) }}"><ion-icon name="eye-outline"></ion-icon></a></td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        @else
                            <p class="text-center m-2 text-muted">Aucune candidature pour cette offre.</p>
                        @endif
                    </div>
                </div>
            @empty
                <p class="text-center text-muted">Aucune offre disponible.</p>
            @endforelse
        </div>
    </section>
</div>
@endsection
