<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

use App\Clases\ClientesWeb;
use App\Clases\Usuarios;
use App\Clases\Roboshot;

//  modelos
use App\Models\Clientes;
use App\Models\User;

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
        $dir = '';
        $path = '';
        
        try{
             //  validacion de los datos
             $request->validate([
                'user' => ['required', 'unique:usuarios,nombre'],
                'bd' => ['required','unique:clientes,esquema'],
                'password' => ['required', 'min:6'],
            ]);

             //  nombre del directorio
            $dir = 'rob_cliente_'.$request->user;
            
            //  en el caso de que en el request exista un archivo de imagen
            if($request->hasFile('img')){
                try{
                    $request->validate([
                        'img' => ['image','mimes:jpeg,png,jpg,gif,svg']
                    ]);
                    //  aws s3
                    Storage::disk('s3')->makeDirectory('clients/'.$dir.'/images');
                    $fecha = Carbon::now()->format('Y-m-d');
                    $image = $request->file('img');
                    $extension = $image->getClientOriginalExtension();
                    $nombre = $fecha.'-'.$request->user.'.'.$extension;

                    $path = $image->storePubliclyAs(
                        'clients/'.$dir.'/images',
                        $nombre,
                        's3'
                    );
                    
                }catch(ValidationException $e){
                    $errors = [];
                    $status = 415;  //  unsupported media type
                    foreach($e->errors() as $item) {
                        foreach($item as $x){
                            $errors[] = $x;
                        }
                    }
                    $data = array(
                        'status' => false,
                        'mensaje' => $errors,
                    );
                    return response()->json($data, $status);
                }
            }else{
                Storage::disk('s3')->makeDirectory('clients/'.$dir.'/images');
                Storage::disk('s3')->copy('images/camera.jpg', 'clients/'.$dir.'/images/camera.jpg');
                $path = 'clients/'.$dir.'/images/camera.jpg';
            }

            $usuario = User::create([
                'nombre' => $request->user,
                'password' => bcrypt($request->password),
                'idRol' => 2
            ]);

            $cliente = Clientes::create([
                'idUsuario' => $usuario->idUsuario,
                'razonSocial' => $request->razonSocial,
                'nombres' => $request->nombre,
                'apellidoPaterno' => $request->apellidoPaterno,
                'apellidoMaterno' => $request->apellidoMaterno,
                'RFC' => $request->rfc,
                'email' => $request->email,
                'esquema' => $request->bd,
                'directorio' => $dir,
                'logo' => '-',  //  TODO: delete column from clientes table
                'path' => $path
            ]);

            //  create client schema
            Roboshot::CrearRoboshot($request->bd);
            
            $status = 200;  //  OK
            $data = array(
                'status' => true,
                'mensaje' => 'Usuario insertado correctamente',
                //'data' => $cliente
            );
            return response()->json($data, $status);

        }catch(ValidationException $e){
            $errors = [];
            $status = 400;  //  Bad request
            foreach($e->errors() as $item) {
                foreach($item as $x){
                    $errors[] = $x;
                }
            }
            $data = array(
                'status' => false,
                'mensaje' => $errors,
            );

            return response()->json($data, $status);
        }
          
    }

    //  datos de un cliente en especifico
    public function infoCliente($id){
        $usuario = User::find($id);
        $cliente = Clientes::where('idUsuario', $id)->first();
        $url = Storage::disk('s3')->url($cliente->path);
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
        
        return response()->json($data);
    }

    //  edita los datos de un cliente
    public function editarCliente(Request $request){
        
        //  se busca el usuario
        $usuario = User::find($request->id);

        //  se reinicia la contraseña de ser necesario
        if($request->resetPass == true){
            $usuario->password = bcrypt('rob0sh0t-1nt3gr@');
            $usuario->save();
        }

        //  actualiza los datos
        $cliente = Clientes::where('idUsuario', $request->id)->first();
        $path = $cliente->path;

        //  en el caso de que exista un archivo de imagen 
        if($request->hasFile('new_img')){
            try{
                $request->validate([
                    'new_img' => 'image|mimes:jpeg,png,jpg,gif,svg'
                ]);
                $fecha = Carbon::now()->format('Y-m-d');
                $image = $request->file('new_img');
                $extension = $image->getClientOriginalExtension();
                $newLogo = $fecha.'-'.$request->id.'-'.$usuario->nombre.'.'.$extension;
                //  elimina el archivo anterior
                Storage::disk('s3')->delete($path);
                //  mueve el elemento
                $path = $image->storeAs(
                    'clients/'.$cliente->directorio.'/images',
                    $newLogo,
                    's3'
                );
                
            }catch(ValidationException $e){
                $errors = [];
                $status = 415;  //  unsupported media type
                foreach($e->errors() as $item) {
                    foreach($item as $x){
                        $errors[] = $x;
                    }
                }
                $data = array(
                    'status' => false,
                    'mensaje' => $errors
                );
                return response()->json($data, $status);
            }
        }

        $cliente->razonSocial = $request->razonSocial;
        $cliente->nombres = $request->nombre;
        $cliente->apellidoPaterno = $request->apellidoPaterno;
        $cliente->apellidoMaterno = $request->apellidoMaterno;
        $cliente->RFC = $request->rfc;
        $cliente->email = $request->email;
        //$cliente->logo = $logo;
        $cliente->path = $path;
        $cliente->save();

        $status = 200;  //  OK
        $data = array(
            'status' => true, 
            'mensaje' => 'Datos actualizados',
        );
        return response()->json($data, $status);
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
        $status = 0;
        try{
            $request->validate([
                'contrasena' => ['required', 'password:api']
            ]);
            
            //  datos del cliente
            $cliente = Clientes::where('idUsuario', Auth::user()->idUsuario)->first();
            $path = $cliente->path;
            $logo = $cliente->logo;

            if($request->hasFile('img')){
                try{
                    $request->validate([
                        'img' => ['image', 'mimes:jpeg,png,jpg,svg']
                    ]);
                
                    $fecha = Carbon::now()->format('Y-m-d');
                    $img = $request->file('img');
                    $extension = $img->getClientOriginalExtension();

                    //  nombre del archivo nuevo
                    $nombre = $fecha.'-'.Auth::user()->idUsuario.'-'.Auth::user()->nombre.'.'.$extension;
                    
                    if($path !== 'images/camera.jpg'){
                        Storage::disk('s3')->delete($path);
                    }
                    $path = $img->storeAs(
                        'users/images',
                        $nombre,
                        's3'
                    );
                    
                }catch(ValidationException $e){
                    $errors = [];
                    $status = 415;  //  unsupported media type
                    foreach($e->errors() as $item) {
                        foreach($item as $x){
                            $errors[] = $x;
                        }
                    }
                    $data = array(
                        'status' => false,
                        'mensaje' => $errors
                    );

                    return response()->json($data, $status);
                }
            }
            $cliente->nombres = $request->nombres;
            $cliente->apellidoPaterno = $request->apellidos;
            $cliente->email = $request->email;
            //$cliente->logo = $logo;
            $cliente->path = $path;
            $cliente->update();

            $status = 200;  //  OK
            $data = array(
                'status' => true,
                'mensaje' => 'Datos actualizados'
            );

            return response()->json($data, $status);

        }catch(ValidationException $e){
            $errors = [];
            $status = 401;  //  unauthorized
            foreach($e->errors() as $item) {
                foreach($item as $x){
                    $errors[] = $x;
                }
            }
            $data = array(
                'status' => false,
                'mensaje' => $errors
            );

            return response()->json($data, $status);
        }

        
    }

}