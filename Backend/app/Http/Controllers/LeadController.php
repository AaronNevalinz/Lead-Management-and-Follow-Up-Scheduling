<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $leads = Lead::all();
        return $leads;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the inputs gotten from the frontend application
        $fields =$request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:leads',
            'phone'=>'required|string',
        ]);

        $lead = Lead::create($fields);

        return response()->json($lead, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        //
        return response()->json($lead);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lead $lead)
    {
        //
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:leads,email,' . $lead->id,
            'phone' => 'nullable',
        ]);

        $lead->update($request->all());

        return response()->json($lead);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        //
        $lead->delete();

        return response()->json(null, 204);
    }
}
