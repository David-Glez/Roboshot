<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Clases\ClientesWeb;
use App\Models\Roles;

class InicioController extends Controller
{
    //funcion para login
    public function inicio(Request $request){

        $validaUsuario = $request->only('nombre', 'password');

        $verificacion = Auth::attempt($validaUsuario);
        
        if($verificacion){
            $user = Auth::user();
            $idUsuario = Auth::user()->idUsuario;
            $idRol = Auth::user()->idRol;
            $nombre = Auth::user()->nombre;
            $rol = Roles::where('idRol', Auth::user()->idRol)->first();

            $accessToken = $user->createToken('authToken')->accessToken;

            $datos = array(
                'id' => $idUsuario,
                'usuario' => $nombre,
                'rol' => $rol->rol,
                'idRol' => $idRol,
                'accessToken' => $accessToken,
                'autorizado' => $verificacion,
                
            );
        }else{
            $datos = array(
                'id' => 0,
                'autorizado' => $verificacion
            );
        }

    
        return response()->json($datos);
    }

    //  registro de usuarios como clientes

    public function registro(Request $request){
        
        $x = ClientesWeb::addUsuario($request);

        return response()->json($x);

    }
    
    //funcion para ver si el usuario sigue autenticado en el servidor
    public function vidaSesion(){
      
        $activo = Auth::check();

        return response()->json($activo);
    }


    //  funcion para cerrar sesion
    public function cerrarSesion(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $data = array(
            'mensaje' => 'Sesión cerrada',
            'status' => true
        );
        
        return response()->json($data);
    }

}
