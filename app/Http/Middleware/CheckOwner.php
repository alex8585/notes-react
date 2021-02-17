<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CheckOwner
{
    public function handle($request, Closure $next)
    {
        $params = $request->route()->parameters();
        foreach ($params as $k => $param) {
            if (isset($param->user_id)) {
                $user_id = Auth::user()->id;
                if ($param->user_id !== $user_id) {
                    return Redirect::route('dashboard')->with('error', 'Access denied.');
                }
            }
        }

        return $next($request);
    }
}
