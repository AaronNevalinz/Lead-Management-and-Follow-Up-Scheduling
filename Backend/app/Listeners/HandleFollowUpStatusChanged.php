<?php

namespace App\Listeners;

use App\Events\FollowUpStatusChanged;
use App\Models\User;
use App\Notifications\FollowUpMissedNotification;
use Illuminate\Support\Facades\Notification;

class HandleFollowUpStatusChanged
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FollowUpStatusChanged $event): void
    {
        //
        if ($event->followup->status === 'missed') {
            
            $usersToNotify = User::whereIn('role', ['admin', 'sales_manager'])->get();

            Notification::send($usersToNotify, new FollowUpMissedNotification($event->followup));
        }
    }
}
