<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Roles;
use App\Models\Clientes;
use App\Models\Roboshots;

use App\Clases\Roboshot;

class UsuariosController extends Controller
{
    //ver usuarios del sistema con los request correspondientes
    public function inicio(){

        $rolUsuario = Auth::user()->idRol;
        $data = [];

        if($rolUsuario == 1){
            $listaUsuarios = User::where('idUsuario','>', 1)->get();
            foreach($listaUsuarios as $item){
                $cliente = Clientes::where('idUsuario', $item->idUsuario)->first();
                $rol = Roles::where('idRol', $item->idRol)->first()->rol;
                $roboshots = Roboshots::where('idCliente', $cliente->idCliente)->count();
                if($roboshots == 0){
                   $roboshot = '---';
                }else{
                    $roboshot = 'existe';
                }
                $usuarioInfo = array(
                    'id' => $item->idUsuario,
                    'usuario' => $cliente->nombres.' '.$cliente->apellidoPaterno.' '.$cliente->apellidoMaterno,
                    'rol' => $rol,
                    'esquema' => $cliente->esquema,
                    'roboshots' => $roboshot,
                    'fechaCreacion' => $cliente->created_at
                );

                $data[] = $usuarioInfo;
            }
        }else{

        }

        return response()->json($data);
    }

    // ver clientes registrados en bd
    public function clientes(){
        $data = [];
        $clientes = Clientes::all();
        foreach($clientes as $item){
            $dato = array(
                "idCliente" => $item->idCliente,
                "nombre" => $item->nombres.' '.$item->apellidoPaterno.' '.$item->apellidoMaterno
            );
            $data[] = $dato;
        }
        return response()->json($data);
    }

    //insertar clientes en bd
    public function anadirCliente(Request $request){
       
        //si el usuario que registra es el super administrador el rol a insertar es 2
        if(Auth::user()->idRol == 1){

            //revisa si existe un nombre de usuario igual
            $registrado = User::where('nombre', $request->usuario)->count();

            //si no hay coincidencias se registra
            if($registrado == 0){
                //insertar registro en tabla usuarios
                $usuario = new User;
                $usuario->nombre = $request->usuario;
                $usuario->password = bcrypt($request->contrasena);
                $usuario->idRol = 2;
                $usuario->save();

                $id = $usuario->idUsuario;

                //insertar registro en la tabla clientes
                $cliente = new Clientes;
                $cliente->idUsuario = $id;
                $cliente->nombres = $request->nombres;
                $cliente->apellidoPaterno = $request->apellidoPaterno;
                $cliente->apellidoMaterno = $request->apellidoMaterno;
                $cliente->RFC = $request->rfc;
                $cliente->email = $request->email;
                $cliente->esquema = $request->esquema;
                $cliente->save();

                // creacion de tablas dentro del esquema nuevo
                //Artisan::call('create:roboshotspace', ['nombre' => $request->esquema]);
                Roboshot::CrearRoboshot($request->esquema);
                
                $resultado = array(
                    'insertado' => true,
                    'mensaje' => 'request Insertados Correctamente.',
                    'id' => $id
                );
            }else{
                $resultado = array(
                    'insertado' => false,
                    'mensaje' => 'El nombre de usuario ya existe. Intente con otro.'
                );
            }
            
        }else{
            $resultado = array(
                'insertado' => false,
                'mensaje' => 'No tiene permisos para insertar clientes'
            );
        }
        return response()->json($resultado);
    }
}