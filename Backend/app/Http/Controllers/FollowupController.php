<?php

namespace App\Http\Controllers;

use App\Events\FollowUpStatusChanged;
use App\Models\Followup;
use App\Models\Lead;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class FollowupController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $followUps = FollowUp::where('lead_id', $request->lead_id)->get();
        return $followUps;
    }


    public function getFollowUps(Request $request)
    {
        //
        $followups = Followup::all();
        return response()->json($followups);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // Validate the inputs gotten from the frontend application
        $fields =$request->validate([
            'lead_id' => 'required|string',
            'scheduled_at'=>'required|date|after:now',
            'status'=>'required|string',
        ]);

        $followUp = Followup::create($fields);

        return response()->json($followUp, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Followup $followUp)
    {
        //
        return response()->json($followUp);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Followup $followUp)
    {
        //
        $this->authorize('update', $followUp);

        $request->validate([
            'status' => 'required|in:pending,completed,missed',
        ]);

        // Perform status update on follow-up
        $followUp->status = $request->status;
        $followUp->save();

        // Dispatch event after status update
        FollowUpStatusChanged::dispatch($followUp, $request->user());


        return response()->json(['follow-up'=>$followUp, 'status'=>$followUp->status, 'message'=>'Status updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Followup $followUp)
    {
        //
        $followUp->delete();

        return response()->json(null, 204);
    }
}
