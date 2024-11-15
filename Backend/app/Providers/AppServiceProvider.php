<?php

namespace App\Providers;

use App\Models\Followup;
use App\Policies\FollowupPolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Followup::class => FollowupPolicy::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
