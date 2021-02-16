<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

//  auxiliares
use App\Clases\Conexion;
use App\Models\Categorias;
use App\Models\Ingredientes;
use App\Models\RecetaIngredientes;
use App\Models\Recetas;
use App\Models\Roboshots;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RecetasIngredientesController extends Controller
{
    public function __construct(){
        //  Necesitamos obtener una instancia de la clase Client la cual tiene algunos métodos
        //  que serán necesarios.
        //  en el caso de que marque error el metodo getDriver ignorar
        $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();   
    }
    
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
    public function recipe($id, $robot){
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

        $list_ingredients = [];
        foreach($ingredients as $ingredient){
            $quantity = RecetaIngredientes::where('idReceta', $id)
                        ->where('idIngrediente', $ingredient->idIngrediente)
                        ->where('roboshot', $robot_id)->first();
            $category = Categorias::where('idCategoria', $ingredient->categoria)
                        ->where('roboshot', $robot_id)->first();
            
            $list = array(
                'id' => $ingredient->id,
                'idIngrediente' => $ingredient->idIngrediente,
                'marca' => $ingredient->marca,
                'categoria' => $category->nombre,
                'precio' => '$'.$ingredient->precio,
                'cantidad' => $quantity->cantidad.' mL'
            );
            $list_ingredients[] = $list;
        }
        $data = array(
            'id' => $recipe->id,
            'idReceta' => $recipe->idReceta,
            'nombre' => $recipe->nombre,
            'descripcion' => $recipe->descripcion,
            'mezclar' => $recipe->mezclar,
            'roboshot' => $robot_recipe->nombre,
            'precio' => $recipe->precio,
            'activa' => $recipe->activa,
            'ingredientes' => $list_ingredients,
            'img' => $recipe->img,
            
        );
        return response()->json($data);
    }

    public function updateRecipe(Request $request){

        //  connect to client schema
        $schema = Auth::user()->cliente->esquema;
        $directory = Auth::user()->cliente->directorio;
        $station = $request->roboshot;
        $recipeID = $request->id;
        Conexion::conectaNombre($schema);
        //  find recipe data
        $robot_recipe = Roboshots::where('nombre', $station)->first();
        $robot_id = $robot_recipe->idRoboshot;
        $recipe = Recetas::where('idReceta', $recipeID)->where('roboshot', $robot_id)->first();
        $img = $recipe->img;
        $path = $recipe->path;
        if($request->hasFile('newImg')){
            try{
                $request->validate([
                    'newImg' => ['image', 'mimes:jpeg,png,jpg,svg']
                ]);
                
                //  file
                $file = $request->file('newImg');
                $extension = $file->getClientOriginalExtension();
                $fileName = $station.'-recipe-up-'.$recipeID.'.'.$extension;
                //  delete last image except if it is default image
                if($path !== 'public/images-default/camera.jpg'){
                    Storage::disk('dropbox')->delete($path);
                }
                //  move file into client directory
                $path = $file->storeAs(
                    'public/images/'.$directory,
                    $fileName,
                    'dropbox'
                );
                $url = $this->dropbox->createSharedLinkWithSettings(
                    $path, 
                    ["requested_visibility" => "public"]
                );
                //  se modifica la url para poder visualizar el contenido
                $modifiedUrl = explode('?', $url['url']);
                $img = $modifiedUrl[0].'?dl=1';

            }catch(ValidationException $e){
                $errors = [];
                foreach($e->errors() as $item) {
                    foreach($item as $x){
                        $errors[] = $x;
                    }
                }
                $data = array(
                    'status' => false,
                    'mensaje' => $errors
                );

                return response()->json($data);
            }
        }
        //  update data
        $recipe->nombre = $request->name;
        $recipe->descripcion = $request->description;
        $recipe->img = $img;
        $recipe->path = $path;
        $recipe->activa = $request->state;
        $recipe->mezclar = $request->mix;
        $recipe->precio = $request->price;
        $recipe->save();

        $data = array(
            'status' => true,
            'mensaje' => 'Receta actualizada',
        );
        return response()->json($data);
    }
}
