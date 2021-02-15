<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ModalController extends Controller
{
    public function index()
    {
        return Inertia::render('Modals/Index');
    }
}
