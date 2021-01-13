<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//  auxiliares
use App\Clases\RecetasIngredientes;

class RecetasIngredientesController extends Controller
{
    //  trae las recetas del cliente logueado
    public function inicio(){
        $esquema = Auth::user()->cliente->esquema;

        $x = RecetasIngredientes::recetas($esquema);

        return response()->json($x);
    }
}
