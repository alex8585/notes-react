<?php

namespace App\Providers;

use App\Events\TestEvent;
use Illuminate\Support\Facades\Log;
use App\Listeners\TestEventListener;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use function Illuminate\Events\queueable;
use App\Listeners\SendPodcastNotification;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,

        ],
        TestEvent::class => [
            TestEventListener::class,
            SendPodcastNotification::class,
        ],

    ];

    // public function shouldDiscoverEvents()
    // {
    //     return true;
    // }
    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
