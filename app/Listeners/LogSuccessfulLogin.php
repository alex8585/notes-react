<?php

namespace App\Listeners;

use App\Models\Note;
use App\Events\TestEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class LogSuccessfulLogin
{

    public function handle(Login $event)
    {
        // Log::channel('app')->critical($event->user->email);
    }
}
