<?php

namespace App\Clases;

//  modelos
use App\Models\Clientes;
use App\Models\User;
use App\Models\Roles;
use App\Models\Roboshots;

//  auxiliares
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Clases\Roboshot;

class Usuarios{

    //  muestra la lista de usuarios
    public static function listClientes(){
        $data = [];
        $listaUsuarios = User::where('idUsuario','>', 1)->get();
        foreach($listaUsuarios as $item){
            $cliente = Clientes::where('idUsuario', $item->idUsuario)->first();
            $rol = Roles::where('idRol', $item->idRol)->first()->rol;
            $roboshots = Roboshots::where('idCliente', $cliente->idCliente)->count();
            $fecha = new Carbon($cliente->created_at);
            if($roboshots == 0){
                $roboshot = '---';
            }else{
                $roboshot = 'existe';
            }
            if($cliente->razonSocial == null || $cliente->razonSocial == ''){
                $razonSocial = 'No Aplica';
            }else{
                $razonSocial = $cliente->razonSocial;
            }
            $usuarioInfo = array(
                'id' => $item->idUsuario,
                'usuario' => $cliente->nombres.' '.$cliente->apellidoPaterno.' '.$cliente->apellidoMaterno,
                'rol' => $rol,
                'esquema' => $cliente->esquema,
                'roboshots' => $roboshot,
                'razonSocial' => $razonSocial,
                'fechaCreacion' => $fecha->format('Y-m-d')
            );

            $data[] = $usuarioInfo;
        }
        return $data;
    }

    //  añade el usuario - cliente
    public static function addCliente($datos){
        $id = '';
        $dir = '';
        $path = '';
        try{
            //  validacion de los datos
            $datos->validate([
                'user' => ['required', 'unique:usuarios,nombre'],
                'bd' => ['required','unique:clientes,esquema'],
                'password' => ['required', 'min:6']
            ]);

            //  nombre del directorio
           $dir = 'rob_cliente_'.$datos->user;

            if($datos->hasFile('img')){
                try{
                    $datos->validate([
                        'img' => ['image','mimes:jpeg,png,jpg,gif,svg']
                    ]);

                    Storage::makeDirectory('public/images/'.$dir);
                    $fecha = Carbon::now()->format('Y-m-d');
                    $image = $datos->file('img');
                    $extension = $image->getClientOriginalExtension();
                    $nombre = $fecha.'-'.$datos->user.'.'.$extension;

                    //  se mueve el logo al directorio
                    $path = Storage::putFileAs('public/images/'.$dir, $image, $nombre);

                }catch(ValidationException $e){
                    $errors = [];
                    foreach($e->errors() as $item) {
                        foreach($item as $x){
                            $errors[] = $x;
                        }
                    }
                    $data = array(
                        'status' => false,
                        'mensaje' => $errors,
                    );
                     return $data;
                }
            }else{
                Storage::makeDirectory('public/images/'.$dir);
                //  se copia el logo por default al directorio del cliente
                Storage::copy('public/images-default/camera.jpg', 'public/images/'.$dir.'/camera.jpg');
                $path = 'public/images/'.$dir.'/camera.jpg';
            }

            //  se inserta los datos de inicio
            $usuario = new User;
            $usuario->nombre = $datos->user;
            $usuario->password = bcrypt($datos->password);
            $usuario->idRol = 2;
            $usuario->save();

            //  se inserta los datos del cliente
            $cliente = new Clientes;
            $cliente->idUsuario = $id;
            $cliente->razonSocial = $datos->razonSocial;
            $cliente->nombres = $datos->nombre;
            $cliente->apellidoPaterno = $datos->apellidoPaterno;
            $cliente->apellidoMaterno = $datos->apellidoMaterno;
            $cliente->RFC = $datos->rfc;
            $cliente->email = $datos->email;
            $cliente->esquema = $datos->bd;
            $cliente->directorio = $dir;
            $cliente->logo = $path;
            $cliente->save();
            
            //  se crea la bd para el cliente
            Roboshot::CrearRoboshot($datos->bd);

            $data = array(
                'status' => true,
                'mensaje' => 'Usuario insertado correctamente',
            );

        }catch(ValidationException $exception){
            $errors = [];
            foreach($exception->errors() as $item) {
                foreach($item as $x){
                    $errors[] = $x;
                }
            }
            $data = array(
                'status' => false,
                'mensaje' => $errors
            );

            return $data;
            
        }

        return $data;
    }

    //  muestra informacion de un usuario
    public static function infoCliente($id){
        //  busca los datos del usuario
        $usuario = User::find($id);
        $cliente = Clientes::where('idUsuario', $id)->first();
        $url = Storage::url($cliente->logo);
        $data = array(
            'usuario' => $usuario->nombre,
            'nombre' => $cliente->nombres,
            'apellidoPaterno' => $cliente->apellidoPaterno,
            'apellidoMaterno' => $cliente->apellidoMaterno, 
            'RFC' => $cliente->RFC,
            'razonSocial' => $cliente->razonSocial,
            'logo' => $url,
            'email' => $cliente->email, 
            'esquema' => $cliente->esquema
        );
        return $data;
    }

    //  actualiza los datos de un usuario
    public static function updateCliente($datos){        
            
        //  reinicia la contraseña
        $usuario = User::find($datos->id);
        if($datos->resetPass == true){
            $usuario->password = bcrypt('rob0sh0t-1nt3gr@');
            $usuario->save();
        }

        //  actualiza los datos del cliente
        $cliente = Clientes::where('idUsuario', $datos->id)->first();

        $logo = $cliente->logo;

        if($datos->hasFile('new_img')){
            try{
                $datos->validate([
                    'new_img' => 'image|mimes:jpeg,png,jpg,gif,svg'
                ]);
                $fecha = Carbon::now()->format('Y-m-d');
                $image = $datos->file('new_img');
                $extension = $image->getClientOriginalExtension();
                $newLogo = $fecha.'-'.$datos->id.'-'.$usuario->nombre.'.'.$extension;

                //  mueve el elemento
                $logo = Storage::putFileAs('public/images/'.$cliente->directorio, $image, $newLogo);
                

            }catch(ValidationException $exception){
                $errors = [];
                foreach($exception->errors() as $item) {
                    foreach($item as $x){
                        $errors[] = $x;
                    }
                }
                $data = array(
                    'status' => false,
                    'mensaje' => $errors
                );
                
                return $data;
            }
        }
        $cliente->razonSocial = $datos->razonSocial;
        $cliente->nombres = $datos->nombre;
        $cliente->apellidoPaterno = $datos->apellidoPaterno;
        $cliente->apellidoMaterno = $datos->apellidoMaterno;
        $cliente->RFC = $datos->rfc;
        $cliente->email = $datos->email;
        $cliente->logo = $logo;
        $cliente->save();

        $data = array(
            'status' => true, 
            'mensaje' => 'Datos actualizados',
        );
  
        
        return $data;
    }

    //  elimina un usuario
    public static function deleteCliente($datos){
        //$confirmPassword = Hash::check($datos->password, $datos->user()->password);
        try{
            $datos->validate([
                'password' => ['required', 'password:api']
            ]);

            //  datos del cliente
            $cliente = Clientes::where('idUsuario', $datos->id)->first();

            $eliminarEsquema = Roboshot::eliminarRoboshot($cliente->esquema);

            if($eliminarEsquema){
                //  se eliminan los datos del cliente y todo su contenido
                //  elimina directorio
                Storage::deleteDirectory('public/images/'.$cliente->directorio);

                //  Elimina los datos generales
                $cliente->delete();

                //  elimina datos de inicio de sesion
                $usuario = User::find($datos->id);
                $usuario->delete();
                
                $data = array(
                    'status' => true,
                    'mensaje' => 'Todo en orden'
                );
            }else{
                $data = array(
                    'status' => false,
                    'mensaje' => 'Error al eliminar.'
                );
            }

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
            
        }
        
        return $data;
    }
}