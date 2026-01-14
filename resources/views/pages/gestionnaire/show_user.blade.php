@extends('dashboard')
@section('content')
<div class="main-content">
    <section class="section">
        <div class="section-body">
            <div class="row mt-sm-4">
                <div class="">
                    <div class="card author-box">
                        <div class="card-body">
                            <div class="author-box-center">
                                @if ($user->photo_url)
                                <img src="{{ $user->photo_url }}" alt="Photo" style="width: 200px; height: 200px;">
                                @else
                                <ion-icon name="person-circle-outline" style="width: 200px; height: 200px"></ion-icon>
                                @endif
                                <div class="clearfix"></div>
                                <div class="author-box-name">
                                    <p> {{ $user->name }}</p>
                                </div>
                                <div class="author-box-job">{{ $role ?? 'Utilisateur simple' }}</div>
                            </div>
                            <div class="text-center">

                                <a href="#" class="btn btn-social-icon mr-1 btn-facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-github">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="btn btn-social-icon mr-1 btn-instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <div class="w-100 d-sm-none"></div>
                            </div>
                            <div class="card-header">
                                <h4>Informations personnelles</h4>
                            </div>
                            <div class="card-body">
                                <div class="py-4">
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Sexe
                                        </span>
                                        <span class="float-right text-muted">
                                            30-05-1998
                                        </span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Date de Naissance
                                        </span>
                                        <span class="float-right text-muted">
                                            30-05-1998
                                        </span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Contact
                                        </span>
                                        <span class="float-right text-muted">
                                            (0123)123456789
                                        </span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Email
                                        </span>
                                        <span class="float-right text-muted">
                                            test@example.com
                                        </span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Facebook
                                        </span>
                                        <span class="float-right text-muted">
                                            <a href="#">John Deo</a>
                                        </span>
                                    </p>
                                    <p class="clearfix">
                                        <span class="float-left">
                                            Linkedin
                                        </span>
                                        <span class="float-right text-muted">
                                            <a href="#">@johndeo</a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="col-12 col-md-12 col-lg-8">
                    <div class="card">

                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="settingSidebar">
        <a href="javascript:void(0)" class="settingPanelToggle"> <i class="fa fa-spin fa-cog"></i>
        </a>
        <div class="settingSidebar-body ps-container ps-theme-default">
            <div class=" fade show active">
                <div class="setting-panel-header">Setting Panel
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">Select Layout</h6>
                    <div class="selectgroup layout-color w-50">
                        <label class="selectgroup-item">
                            <input type="radio" name="value" value="1" class="selectgroup-input-radio select-layout" checked>
                            <span class="selectgroup-button">Light</span>
                        </label>
                        <label class="selectgroup-item">
                            <input type="radio" name="value" value="2" class="selectgroup-input-radio select-layout">
                            <span class="selectgroup-button">Dark</span>
                        </label>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">Sidebar Color</h6>
                    <div class="selectgroup selectgroup-pills sidebar-color">
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" value="1" class="selectgroup-input select-sidebar">
                            <span class="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                data-original-title="Light Sidebar"><i class="fas fa-sun"></i></span>
                        </label>
                        <label class="selectgroup-item">
                            <input type="radio" name="icon-input" value="2" class="selectgroup-input select-sidebar" checked>
                            <span class="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                data-original-title="Dark Sidebar"><i class="fas fa-moon"></i></span>
                        </label>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <h6 class="font-medium m-b-10">Color Theme</h6>
                    <div class="theme-setting-options">
                        <ul class="choose-theme list-unstyled mb-0">
                            <li title="white" class="active">
                                <div class="white"></div>
                            </li>
                            <li title="cyan">
                                <div class="cyan"></div>
                            </li>
                            <li title="black">
                                <div class="black"></div>
                            </li>
                            <li title="purple">
                                <div class="purple"></div>
                            </li>
                            <li title="orange">
                                <div class="orange"></div>
                            </li>
                            <li title="green">
                                <div class="green"></div>
                            </li>
                            <li title="red">
                                <div class="red"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <div class="theme-setting-options">
                        <label class="m-b-0">
                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                id="mini_sidebar_setting">
                            <span class="custom-switch-indicator"></span>
                            <span class="control-label p-l-10">Mini Sidebar</span>
                        </label>
                    </div>
                </div>
                <div class="p-15 border-bottom">
                    <div class="theme-setting-options">
                        <label class="m-b-0">
                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                id="sticky_header_setting">
                            <span class="custom-switch-indicator"></span>
                            <span class="control-label p-l-10">Sticky Header</span>
                        </label>
                    </div>
                </div>
                <div class="mt-4 mb-4 p-3 align-center rt-sidebar-last-ele">
                    <a href="#" class="btn btn-icon icon-left btn-primary btn-restore-theme">
                        <i class="fas fa-undo"></i> Restore Default
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection