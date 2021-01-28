<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientes;
use App\Clases\Roboshot;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RoboshotController extends Controller
{
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

    //  consulta lista de esquemas
    public function disponibles(Request $request){

        //  cuenta las coincidencias dentro de la BD
        $busca = Clientes::where('esquema', $request->esquema)->count();
        
        if($busca > 0){

            //  genera la sugerencia 1
            $cadena = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $longitud = strlen($cadena);
            $codigo = '';

            for($i = 0; $i < 5; $i++){
                $codigo .= $cadena[rand(0, $longitud-1)];
            }

            $sugerencia1 = $request->esquema.'_'.$codigo;

            // genera sugerencia 2
            $num = rand(0,1000);
            $sugerencia2 = $request->esquema.'_'.$num;

            $resultado = array(
                'mensaje' => 'El nombre de BD ya existe',
                'sugerencia1' => $sugerencia1,
                'sugerencia2' => $sugerencia2
            );
        }else{
            $resultado = array(
                'mensaje' => 'Nombre disponible',
                'sugerencia1' => '',
                'sugerencia2' => ''
            );
        }
        
        return response()->json($resultado);
    }

    //  actualizar roboshot
    public function actualizarLocal(Request $request){
        return response()->json($request);
        //  verifica si los campos usuario y esquema estan definidos
        /*if(isset($request->usuarioWeb) && isset($request->esquema)){
            //$usuario = User::where('nombre', $request->usuarioweb)->first();
            if(isset($request->tablaReceta)){
                $estadoRec = Roboshot::recetasWeb($request);
            }else{
                $estadoRec = 'No seleccionada';
            }
            if(isset($request->tablaIngredientes)){
                $estadoIng = Roboshot::ingredientesWeb($request);
            }else{
                $estadoIng = 'No seleccionada';
            }
            if(isset($request->tablaCategorias)){
                $estadoCat = Roboshot::categoriasWeb($request);
            }else{
                $estadoCat = 'No seleccionada';
            }
            $data = array(
                'estado' => true,
                'mensaje' => 'Tablas actualizadas',
                'tablaRecetas' => $estadoRec,
                'tablaIngredientes' => $estadoIng,
                'tablaCategorias' => $estadoCat
            );
        }else{
            $data = array(
                'estado' => false,
                'mensaje' => 'Usuario y/o esquema no definidos'
            );
        }

        return response()->json($data);*/
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

            //  se modifica el nombre del archivo para que sea identico al de la estacion
            $img = $request->file('img');

            //  se mueve al directorio
            $path = Storage::putFileAs('public/images/'.$cliente->directorio, $img, $request->fileName);

            $data = array(
                'status' => true,
                'mensaje' => 'image stored',
                'data' => $path
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
