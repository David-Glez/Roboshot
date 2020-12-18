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

use App\Clases\ClientesWeb;
use App\Clases\Usuarios;
use Carbon\Carbon;

class UsuariosController extends Controller
{
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