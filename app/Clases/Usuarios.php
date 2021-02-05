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
                $roboshot = $roboshots;
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
                Storage::disk('dropbox')->deleteDirectory('public/images/'.$cliente->directorio);

                //  elimina estaciones
                Roboshots::where('idCliente', $cliente->idCliente)->delete();
                //  Elimina los datos generales
                $cliente->delete();

                //  elimina datos de inicio de sesion
                $usuario = User::find($datos->id);
                $usuario->delete();
                
                $data = array(
                    'status' => true,
                    'mensaje' => 'Cliente eliminado'
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