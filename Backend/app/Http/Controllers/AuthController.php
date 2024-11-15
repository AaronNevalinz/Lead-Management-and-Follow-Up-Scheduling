<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    //register a new user
    public function register(Request $request){
        // Validate the inputs gotten from the frontend application
        $fields =$request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'role'=>'required|string',
            'password' => 'required|confirmed'
        ]);

        // check if the role is valid
        if(!in_array($fields['role'], ['admin', 'sales_manager', 'sales_rep'])){
            return [
                'message'=>'Role can only be admin, sales_manager or sales_rep'
            ];
        }
        // register the user to the database
        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'user'=>$user,
            'token'=>$token->plainTextToken
        ];
    }

    //login a user
    public function login(Request $request){
        // Validate the inputs gotten from the frontend application
        $fields =$request->validate([
            'email' => 'required|email|exists:users',
            'password'=>'required'
        ]);

        $user = User::where('email', $fields['email'])->first();

        // when the user is not found or the password is incorrect
        if( !$user || !Hash::check($fields['password'], $user->password)){
            return [
                'errors'=>[
                    'email'=>['The provided credentials are incorrect']
                ]
                ];
        }

        // if the user is found, generate a new token and return the user and plain
        $token = $user->createToken($user->name);

        return [
            'user'=>$user,
            'token'=>$token->plainTextToken
        ];
    }

    //logout a user
    public function logout(Request $request){
        
        $request->user()->tokens()->delete();
        return ['message'=>'You are logged out'];
    }

}
