<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        //$2y$10$ZxsXbKd2wyYRN6zDlyP0HuLojpCCjjabBQ6Z./UX47G6yQvNTOdF.
        //$2y$10$IoUColLefoz3iiP3pnRQO.VZ2OPmXr3CiVFO2GKNSn.zaXMDI5xFq
        // dd(Hash::check('Elvne3132', '$2y$10$IoUColLefoz3iiP3pnRQO.VZ2OPmXr3CiVFO2GKNSn.zaXMDI5xFq'));

        //echo Hash::make('Elvne3132');
        return Inertia::render('Auth/Login');
        //return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
