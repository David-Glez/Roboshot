<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Clientes;
use App\Models\Roles;
use App\Models\User;
use App\Rules\MayorEdad;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Lcobucci\JWT\Parser;

class InicioController extends Controller
{
    //funcion para login
    public function inicio(Request $request){
        $state = 0;
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
                'mensaje' => 'ok'
                
            );
            $state = 200;
        }else{
            $datos = array(
                'id' => 0,
                'autorizado' => $verificacion,
                'mensaje' => 'Usuario y/o contraseña incorrectos.'
            );
            $state = 401;
        }

    
        return response()->json($datos, $state);
    }

    //  registro de usuarios como clientes

    public function registro(Request $request){
        $state = 0;
        try{
            $request->validate([
                'usuario' => ['required', 'unique:usuarios,nombre', 'min:6'],
                'contrasena' => ['required', 'min:8'],
                'fechaNacimiento' => ['required', new MayorEdad]
            ]);
            
            $fechaNacimiento = Carbon::create($request->fechaNacimiento);
            
            //   se añade el usuario a la tabla usuarios
            $user = new User;
            $user->nombre = $request->usuario;
            $user->password = bcrypt($request->contrasena);
            $user->idRol = 4; #id de rol por defecto para clientes
            $user->save();
            
            //  id del usuario recien creado
            $id = $user->idUsuario;

            //  se añade a la tabla clientes
            $general = new Clientes;
            $general->idUsuario = $id;
            $general->nombres = $request->nombres;
            $general->apellidoPaterno = $request->apellido;
            $general->fechaNacimiento = $fechaNacimiento;
            $general->apellidoMaterno = '-'; # valor temporal, en la tabla es nulo
            $general->email = $request->correo;
            $general->logo = 'https://www.dropbox.com/s/jqqra9fl8w4y4i5/camera.jpg?dl=1';  #   valor por defecto, personalizado por el usuario
            $general->path = 'public/images-default/camera.jpg';
            $general->save();

            $data = array(
                'status' => true,
                'mensaje' => 'Usuario Registrado :D ya puedes iniciar sesion'
            );
            
            $state = 200;
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
            $state = 401;
            //return $data;
        }

        return response()->json($data, $state);

    }
    
    //funcion para ver si el usuario sigue autenticado en el servidor
    public function vidaSesion(){
      
        //$activo = Auth::check();
        $user = Auth::user();

        return response()->json($user);
    }


    //  funcion para cerrar sesion
    public function cerrarSesion(){
        $status = 0;
        $token = Auth::user()->token()->revoke();
        
        /*$request->session()->invalidate();
        $request->session()->regenerateToken();*/
        
        if($token){
            $data = array(
                'mensaje' => 'Sesión cerrada',
                'status' => true
            );
            $status = 200;
        }else{
            $data = array(
                'mensaje' => 'Error al cerrar',
                'status' => false
            );
            $status = 500;
        }
        
        
        return response()->json($data, $status);
    }

}
