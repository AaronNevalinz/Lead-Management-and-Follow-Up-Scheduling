<?php

namespace App\Notifications;

use App\Models\Followup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FollowUpMissedNotification extends Notification
{
    use Queueable;

    protected $followup;

    /**
     * Create a new notification instance.
     */
    public function __construct(Followup $followup)
    {
        //
        $this->followup = $followup;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail',];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('Follow-up Missed.')
                    ->action('View Follow-up', url('/follow-ups/'. $this->followup->id) )
                    ->line('A follow-up has been marked as missed.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable): array
    {
        return [
            'message' => 'A follow-up has been marked as missed.',
            'follow_up_id' => $this->followup->id,
        ];
    }
}
