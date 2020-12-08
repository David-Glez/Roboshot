<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\Roles;
use App\Models\User;
use App\Models\Clientes;

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

    //  registro de usuarios como clientes

    public function registro(Request $request){
        
        //  cuenta las veces que esta repetido el nombre de usuario
        $count = User::where('nombre', $request->usuario)->count();

        //  calcula la edad del usuario
        $fechaHoy = Carbon::now();
        $fechaNacimiento = Carbon::create($request->yearN, $request->mesN, $request->diaN);
        $edad = Carbon::parse($fechaNacimiento)->floatDiffInYears($fechaHoy);

        if($count > 0){
            $data = array(
                'status' => false,
                'mensaje' => 'El nombre de usuario ya existe. Elige otro.'
            );
        }else{
            if($edad > 18){
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
                $general->logo = '/images/camera.jpg';  #   valor por defecto, personalizado por el usuario
                $general->save();

                $data = array(
                    'status' => true,
                    'mensaje' => 'Usuario Registrado :D ya puedes iniciar sesion'
                );
            }else{
                $data = array(
                    'status' => false,
                    'mensaje' => 'Usted es menor de edad. No puede registrarse'
                );
            }
            
        }

        return response()->json($data);
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
