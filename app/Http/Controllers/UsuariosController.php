<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Clientes;
use App\Models\Roboshots;

use App\Clases\ClientesWeb;
use App\Clases\Usuarios;
use Carbon\Carbon;

class UsuariosController extends Controller
{
    //////////////////////////////////////////////////////////////////////////////////////////
    //          informacion en dashboard mover a general controller
    //////////////////////////////////////////////////////////////////////////////////////////

    //  trae informacion para las cards
    public function statsCard(){
        if(Auth::user()->idRol == 1){
            $dataUser = 'No hay registros';
            $dataClient = 'No hay registros';
            $dataRoboshot = 'No hay registros';
            $ultimoRob = '';
            $ultimoUsuario = '';
            $ultimoCliente = '';
            $usuarios = User::all()->count();
            if($usuarios > 0){
                $lastUser = User::all()->last();
                $ultimoUsuario = Carbon::parse($lastUser->updated_at);
                $dataUser = $ultimoUsuario->diffForHumans();
            }
            
            $clientes = User::where('idRol', 2)->count();
            if($clientes > 0){
                $lastClient = Clientes::all()->last();
                $ultimoCliente = Carbon::parse($lastClient->updated_at);
                $dataClient = $ultimoCliente->diffForHumans();
            }
            
            $roboshots = Roboshots::all()->count();
            if($roboshots > 0){
                $lastRob = Roboshots::all()->last();
                $ultimoRob = Carbon::parse($lastRob->updated_at);
                $dataRoboshot = $ultimoRob->diffForHumans();
            }
           
            $data = array(
                'usuarios' => $usuarios,
                'fechaUsuario' => $ultimoUsuario,
                'mensajeUsuario' => $dataUser,
                'clientes' => $clientes,
                'fechaCliente' => $ultimoCliente,
                'mensajeCliente' => $dataClient,
                'roboshots' => $roboshots,
                'fechaRoboshot' => $ultimoRob,
                'mensajeRoboshot' => $dataRoboshot

            );
        }
        return response()->json($data);
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //          funciones para usuarios clientes
    //////////////////////////////////////////////////////////////////////////////////////////
    //ver usuarios del sistema con los request correspondientes
    public function inicio(){
        if(Auth::user()->idRol == 1){
            $x = Usuarios::listClientes();
        }else{
            
        }
        return response()->json($x);
    }


    //insertar clientes en bd
    public function anadirCliente(Request $request){
        if(Auth::user()->idRol == 1){
            $x = Usuarios::addCliente($request);
        }else{
            $x = array(
                'status' => false,
                'mensaje' => ' No tiene permisos para añadir administradores'
            );
        }
        return response()->json($x);      
    }

    //  datos de un cliente en especifico
    public function infoCliente($id){
        $x = Usuarios::infoCliente($id);
        return response()->json($x);
    }

    //  edita los datos de un cliente
    public function editarCliente(Request $request){
        if(Auth::user()->idRol == 1){
            $x = Usuarios::updateCliente($request);
        }else{
            $x = array(
                'status' => false,
                'mensaje' => ' No tiene permisos para editar usuarios'
            );
        }
         
        return response()->json($x);
    }

    //  elimina un cliente junto a todo su contenido
    public function eliminarCliente(Request $request){

        if(Auth::user()->idRol == 1){
            $x = Usuarios::deleteCliente($request);
        }else{
            $x = array(
                'status' => false,
                'mensaje' => ' No tiene permisos para editar usuarios'
            );
        }
        return response()->json($x);
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //          funciones para usuarios comunes
    //////////////////////////////////////////////////////////////////////////////////////////

    public function usuario($id){

        $x = ClientesWeb::dataUsuario($id);

        return response()->json($x);
    }

    //  actualiza los datos del usuario
    public function actualizaUsuario(Request $request){

        $x = ClientesWeb::updateUsuario($request);

        return response()->json($x);
    }

}