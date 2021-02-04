<?php

namespace App\Http\Controllers;

use App\Clases\Conexion;
use Illuminate\Http\Request;
use App\Models\Clientes;
use App\Clases\Roboshot;
use App\Models\RecetaIngredientes;
use App\Models\Recetas;
use App\Models\Roboshots;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RoboshotController extends Controller
{
    public function __construct(){
        //  Necesitamos obtener una instancia de la clase Client la cual tiene algunos métodos
        //  que serán necesarios.
        //  en el caso de que marque error el metodo getDriver ignorar
        $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();   
    }

    //  ver la lista de roboshots registrados
    public function inicio(){

        $x = Roboshot::inicio();
        
        return response()->json($x);
    }

    //  informacion de un roboshot
    public function info($id){
        $x = Roboshot::info($id);
        return response()->json($x);
    }

    // registrar roboshot
    public function anadir(Request $request){

        $x = Roboshot::registrar($request);

        return response()->json($x);
    }

    //  editar datos de una estacion
    public function editar(Request $request){

        $x = Roboshot::editar($request);
        
        return response()-> json($x);
    }

    //  elimina un roboshot
    public function eliminar(Request $request){

        if(Auth::user()->idRol== 1){
            $x = Roboshot::eliminar($request);
        }else{
            $x = array(
                'status' => false,
                'mensaje' => 'No tiene permisos para eliminar estaciones',
            );
        }
        return response()->json($x);
    }

    //  actualizar roboshot
    public function actualizarLocal(Request $request){

        //  verifica si los campos usuario y esquema estan definidos
        if(isset($request->usuarioWeb) && isset($request->esquema)){
            $stationName = $request->roboshotName;
            $userName = $request->usuarioWeb;
            $schema = $request->esquema;
            $recipes = $request->tablaReceta;

            //  client info
            $cliente = Clientes::whereHas('station_rob', function($query) use($stationName){
                $query->where('nombre', $stationName);
            })->first();
            
            if(isset($request->tablaReceta)){
                $estadoRec = $this->updateRecipes($recipes, $schema, $cliente->directorio, $stationName);
            }else{
                $estadoRec = 'No seleccionada';
            }
            if(isset($request->tablaIngredientes)){
                $estadoIng = Roboshot::ingredientesWeb($request);
            }else{
                $estadoIng = 'No seleccionada';
            }
            /*if(isset($request->tablaCategorias)){
                $estadoCat = Roboshot::categoriasWeb($request);
            }else{
                $estadoCat = 'No seleccionada';
            }*/
            $data = array(
                'estado' => true,
                'mensaje' => 'Tablas actualizadas',
                'tablaRecetas' => $estadoRec,
                'tablaIngredientes' => $estadoIng,
                //'tablaCategorias' => $estadoCat
            );
        }else{
            $data = array(
                'estado' => false,
                'mensaje' => 'Usuario y/o esquema no definidos'
            );
        }

        return response()->json($data);
    }

    //  updates recetas table from client database
    public function updateRecipes($localRecipes, $schema, $directory, $stationName){
        //  client database connection 
        Conexion::conectaNombre($schema);

        //  decodified recipes
        $recipes = json_decode($localRecipes);

        //  find Roboshot ID
        $robot = Roboshots::where('nombre', $stationName)->first();
 
        foreach($recipes as $item){
            // generate absolut path from local file path
            $localPath = explode('\\', $item->image);
            $fileName = end($localPath);
            $imagePath = 'public/images/'.$directory.'/'.$fileName;

            //  check if file exists in client storage
            $locatedImage = Storage::disk('dropbox')->exists($imagePath);
            if(!$locatedImage){
                // if file not exists searchs in images-without-roboshot
                $temporaryPath = 'public/images/images-without-roboshot/'.$fileName;
                //  check if file exists in temporary directory
                $locatedMissingImage = Storage::disk('dropbox')->exists($temporaryPath);
                //  if file is located move it to client directory
                if($locatedMissingImage){
                    Storage::disk('dropbox')->copy($temporaryPath, $imagePath);
                }else{
                    $imagePath = 'public/images-default/camera.jpg';
                }
            }
            //  check if shared link exists
            $locatedSharedLink = $this->dropbox->listSharedLinks($imagePath);
            //  if shared link not exists it is created
            if(empty($locatedSharedLink)){
                $dropboxUrl = $this->dropbox->createSharedLinkWithSettings(
                    $imagePath, 
                    ["requested_visibility" => "public"]
                );
                $urlArray = explode('?', $dropboxUrl['url']);
                $url = $urlArray[0].'?dl=1';
            }else{
                $urlArray = explode('?', $locatedSharedLink[0]['url']);
                $url = $urlArray[0].'?dl=1';
            }

            //  updates recetas table, if the register is not found it's created
            $updatedRecipe = Recetas::updateOrCreate(
                ['idReceta' => $item->id, 'roboshot' => $robot->idRoboshot], // conditional
                [
                    'nombre' => $item->name,
                    'descripcion' => $item->description,
                    'precio' => $item->price,
                    'activa' => true,
                    'img' => $url,
                    'path' => $imagePath
                ]
            );

            //  updates recetaIngrediente table, if the register is not found it's created
            foreach($item->lista_ingredientes as $updIng){
                $updatedRecipeIngredient = RecetaIngredientes::updateOrCreate(
                    ['idReceta' => $item->id, 'roboshot' => $robot->idRoboshot], //conditional
                    [
                        'idIngrediente' => $updIng->idIngrediente,
                        'cantidad' => $updIng->cantidad
                    ]
                );
            }
        }

        return true;
    }

    //  updates ingredientes table from client database
    public function updateIngredients(){
        
    }

    //  recibe la imagen al crear la receta en local
    public function receiveImg(Request $request){
        if($request->hasFile('img')){
            $stationName = $request->station;
            $macAddress = $request->mac_address;

            //  buscar el directorio del cliente
            $cliente = Clientes::whereHas('station_rob', function($query) use($stationName){
                $query->where('nombre', $stationName);
            })->first();
            if($cliente == ''){
                $dir = 'images-without-roboshot';
            }else{
                $dir = $cliente->directorio;
            }
            //  se modifica el nombre del archivo para que sea identico al de la estacion
            $img = $request->file('img');

            //  se mueve al directorio
            //$path = Storage::putFileAs('public/images/'.$cliente->directorio, $img, $request->fileName);
            $imageUrl = $img->storeAs(
                'public/images/'.$dir,
                $request->fileName,
                'dropbox'
            );
            
            $data = array(
                'status' => true,
                'mensaje' => 'image stored',
            );
        }else{
            $data = array(
                'status' => false,
                'mensaje' => 'no image'
            );
        }

        return response()->json($data);
    }
}
