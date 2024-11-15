<?php

namespace App\Policies;

use App\Models\Followup;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FollowupPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Followup $followup): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Followup $followup)
    {
        // restrict access to Admin and Sales Manager roles:
        return in_array($user->role, array('admin', 'sales_manager'));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Followup $followup): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Followup $followup): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Followup $followup): bool
    {
        //
    }
}
