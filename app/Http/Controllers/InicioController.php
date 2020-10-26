<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Roles;
use App\Models\User;

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
            //$accessToken = $user->createToken('authToken')->accessToken;

            $datos = array(
                'id' => $idUsuario,
                'usuario' => $nombre,
                'rol' => $rol->rol,
                'idRol' => $idRol,
                'accessToken' => $accessToken,
                'autorizado' => $verificacion
            );
        }else{
            $datos = array(
                'id' => 0,
                'autorizado' => $verificacion
            );
        }

    
        return response()->json($datos);
    }

    //funcion para ver si el usuario sigue autenticado en el servidor
    public function vidaSesion(){
      
        $activo = Auth::check();

        return response()->json($activo);
    }


}
