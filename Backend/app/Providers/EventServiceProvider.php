<?php

namespace App\Providers;

use App\Events\FollowUpStatusChanged;
use App\Listeners\HandleFollowUpStatusChanged;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        FollowUpStatusChanged::class => [
            HandleFollowUpStatusChanged::class,
        ],
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
