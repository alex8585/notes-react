<?php

namespace App\Listeners;

use App\Events\TestEvent;
use App\Events\PodcastProcessed;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendPodcastNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PodcastProcessed  $event
     * @return void
     */
    public function handle(TestEvent $event)
    {

        //Log::channel('app')->info('TestEvent22');
    }
}
