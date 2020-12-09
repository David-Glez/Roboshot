<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Roles;
use App\Models\Clientes;
use App\Models\Roboshots;

use App\Clases\Roboshot;
use App\Clases\ClientesWeb;
use Carbon\Carbon;

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

                //  se crea el directorio en el storage para el usuario
                $dir = 'rob_cliente_'.$id;
                Storage::makeDirectory('public/images/'.$dir);

                //insertar registro en la tabla clientes
                $cliente = new Clientes;
                $cliente->idUsuario = $id;
                $cliente->razonSocial = $request->razon;
                $cliente->nombres = $request->nombres;
                $cliente->apellidoPaterno = $request->apellidoPaterno;
                $cliente->apellidoMaterno = $request->apellidoMaterno;
                $cliente->RFC = $request->rfc;
                $cliente->email = $request->email;
                $cliente->esquema = $request->esquema;
                $cliente->directorio = $dir;
                $cliente->logo = '/images/camera.jpg';
                $cliente->save();

                // creacion de tablas dentro del esquema nuevo
                //Artisan::call('create:roboshotspace', ['nombre' => $request->esquema]);
                Roboshot::CrearRoboshot($request->esquema);
                
                $resultado = array(
                    'insertado' => true,
                    'mensaje' => 'Datos insertados correctamente.',
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

    //////////////////////////////////////////////////////////////////////////////////////////
    //          funciones para usuarios comunes
    //////////////////////////////////////////////////////////////////////////////////////////

    public function usuario($id){

        $x = ClientesWeb::dataUsuario($id);

        return response()->json($x);
    }

    //  actualiza los datos del usuario
    public function actualizaUsuario(Request $request){

        //  verifica que la sesion este iniciada
        $activo = Auth::check();
        if($activo){

            //  verifica que la contraseña sea igual que en la base de datos
            $confirmPassword = Hash::check($request->contrasena, $request->user()->password);
            if($confirmPassword){
                
                if($request->hasFile('img')){
                    //  en el caso de que haya cargada una imagen desde el formulario
                    $this->validate($request, [
                        'img' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                    ]);

                    $fecha = Carbon::now()->format('Y-m-d');
                    $img = $request->file('img');
                    $extension = $img->getClientOriginalExtension();

                    //  nombre del archivo nuevo
                    $nombre = $fecha.'-'.Auth::user()->idUsuario.'-'.Auth::user()->nombre.'.'.$extension;
                    
                    //  se mueve el archivo al storage local
                    $path = Storage::putFileAs('public/img-users', $img, $nombre);

                    //  direccion publica de la img
                    $dir = '/storage/img-users/'.$nombre;

                    //  actualizacion de datos
                    $cliente = Clientes::where('idUsuario', Auth::user()->idUsuario)->first();
                    $cliente->nombres = $request->nombres;
                    $cliente->apellidoPaterno = $request->apellidos;
                    $cliente->email = $request->email;
                    $cliente->logo = $dir;
                    $cliente->update();

                    $data = array(
                        'status' => true,
                        'mensaje' => 'Datos actualizados'
                    );
                }else{
                    //  en el caso de que la imagen de perfil no se vaya a actualizar
                    $usuario = Clientes::where('idUsuario', Auth::user()->idUsuario)->first();
                    $usuario->nombres = $request->nombres;
                    $usuario->apellidoPaterno = $request->apellidos;
                    $usuario->email = $request->email;
                    $usuario->update();

                    $data = array(
                        'status' => true,
                        'mensaje' => 'Datos actualizados'
                    );
                }
            }else{
                $data = array(
                    'status' => false,
                    'mensaje' => 'La contraseña es incorrecta'
                );
            }
        }else{
            $data = array(
                'status' => false,
                'mensaje' => 'La sesión no esta iniciada'
            );
        }

        return response()->json($data);
    }

}