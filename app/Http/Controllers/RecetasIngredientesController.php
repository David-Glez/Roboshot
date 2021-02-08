<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//  auxiliares
use App\Clases\Conexion;
use App\Models\Recetas;

class RecetasIngredientesController extends Controller
{
    //  select all recipes from client
    public function inicio(){
        //  connect with client schema 
        $schema = Auth::user()->cliente->esquema;
        Conexion::conectaNombre($schema);
        $data = [];
        $recipes = Recetas::all();
        foreach($recipes as $recipe){
            $recipeData = array(
                'id' => $recipe->idReceta,
                'nombre' => $recipe->nombre,
                'precio' => '$'.floatval($recipe->precio),
                'estado' => $recipe->activa,
                'creado' => $recipe->created_at
            );
            $data[] = $recipeData;
        }
        
        return response()->json($data);
    }
}
