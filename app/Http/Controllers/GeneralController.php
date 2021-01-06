<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rutas;
use Illuminate\Support\Facades\Auth;

class GeneralController extends Controller
{
    //  devuelve las rutas segun el rol del usuario
    public function rutas(){
        $idRol = Auth::user()->idRol;

        $rutas = Rutas::where('idRol', $idRol)->get();

        return response()->json($rutas);
    }

}
