<?php

namespace App\Providers;

use App\Models\Note;
use App\Models\User;
use App\Policies\NotePolicy;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        //Note::class => NotePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
