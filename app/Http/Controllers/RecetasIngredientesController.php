<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

//  auxiliares
use App\Clases\Conexion;
use App\Models\Ingredientes;
use App\Models\RecetaIngredientes;
use App\Models\Recetas;
use App\Models\Roboshots;

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
            $robot = Roboshots::where('idRoboshot', $recipe->roboshot)->first();
            $date = Carbon::parse($recipe->created_at);
            $recipeData = array(
                'id' => $recipe->idReceta,
                'nombre' => $recipe->nombre,
                'precio' => '$'.floatval($recipe->precio),
                'estado' => $recipe->activa,
                'creado' => $date->format('Y-m-d'),
                'robot' => $robot->nombre
            );
            $data[] = $recipeData;
        }
        
        return response()->json($data);
    }

    //  consult client database for a recipe information
    public function recipe(Request $request){
        $id = $request->id;
        $robot = $request->robot;
        //  connect to client schema
        $schema = Auth::user()->cliente->esquema;
        Conexion::conectaNombre($schema);

        //  find recipe data
        $robot_recipe = Roboshots::where('nombre', $robot)->first();
        $robot_id = $robot_recipe->idRoboshot;
        $recipe = Recetas::where('idReceta', $id)->where('roboshot', $robot_recipe->idRoboshot)->first();
        
        $ingredients = Ingredientes::whereHas('recipeIngredient', function($query) use($robot_id, $id){
            $query->where('idReceta', $id)->where('roboshot', $robot_id);
        })->get();
        $data = array(
            'id' => $recipe->id,
            'idReceta' => $recipe->idReceta,
            'nombre' => $recipe->nombre,
            'descripcion' => $recipe->descripcion,
            'mezclar' => $recipe->mezclar,
            'roboshot' => $robot_recipe->nombre,
            'precio' => $recipe->precio,
            'activa' => $recipe->activa,
            'ingredientes' => $ingredients,
            'img' => $recipe->img
        );
        return response()->json($data);
    }
}
