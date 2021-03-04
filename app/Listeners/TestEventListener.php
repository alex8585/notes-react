<?php

namespace App\Listeners;

use App\Models\Note;
use App\Events\TestEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class TestEventListener implements ShouldQueue
{

    public function handle(TestEvent $event)
    {
        Log::channel('app')->critical($event->note->id);
    }
}
