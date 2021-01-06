<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Clases\ClientesWeb;
use App\Clases\Usuarios;

class UsuariosController extends Controller
{
    
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