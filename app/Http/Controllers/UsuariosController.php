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
    public function __construct(){
        //  Necesitamos obtener una instancia de la clase Client la cual tiene algunos métodos
        //  que serán necesarios.
        //  en el caso de que marque error el metodo getDriver ignorar
        $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();   
    }
    
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
        $id = '';
        $dir = '';
        $path = '';
        
        //  validacion de datos
        try{
             //  validacion de los datos
             $request->validate([
                'user' => ['required', 'unique:usuarios,nombre'],
                'bd' => ['required','unique:clientes,esquema'],
                'password' => ['required', 'min:6']
            ]);

             //  nombre del directorio
            $dir = 'rob_cliente_'.$request->user;
            
            //  en el caso de que en el request exista un archivo de imagen
            if($request->hasFile('img')){
                try{
                    $request->validate([
                        'img' => ['image','mimes:jpeg,png,jpg,gif,svg']
                    ]);
                    
                    //  local
                    //$path = Storage::makeDirectory('public/images'.$dir);
                    $path = Storage::disk('dropbox')->makeDirectory('public/images/'.$dir);
                    $fecha = Carbon::now()->format('Y-m-d');
                    $image = $request->file('img');
                    $extension = $image->getClientOriginalExtension();
                    $nombre = $fecha.'-'.$request->user.'.'.$extension;

                    //  se mueve el logo al directorio
                    //$path = Storage::putFileAs('public/images/'.$dir, $image, $nombre);
                    $imageUrl = $image->storeAs(
                        'public/images/'.$dir,
                        $nombre,
                        'dropbox'
                    );
                    $path = $this->dropbox->createSharedLinkWithSettings(
                        $imageUrl, 
                        ["requested_visibility" => "public"]
                    );
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
                    return response()->json($data);
                }
            }else{
                Storage::disk('dropbox')->makeDirectory('public/images/'.$dir);
                //  se copia el logo por default al directorio del cliente
                Storage::disk('dropbox')->copy('public/images-default/camera.jpg', 'public/images/'.$dir.'/camera.jpg');
                $imageUrl = 'public/images/'.$dir.'/camera.jpg';
                $path = $this->dropbox->createSharedLinkWithSettings(
                    $imageUrl, 
                    ["requested_visibility" => "public"]
                );
            }
            //  se modifica la url para poder visualizar el contenido
            $modifiedUrl = explode('?', $path['url']);
            $directLink = $modifiedUrl[0].'?dl=1';

            //  se inserta los datos de inicio
            $usuario = new User;
            $usuario->nombre = $request->user;
            $usuario->password = bcrypt($request->password);
            $usuario->idRol = 2;
            $usuario->save();

            $id = $usuario->idUsuario;

            //  se inserta los datos del cliente
            $cliente = new Clientes;
            $cliente->idUsuario = $id;
            $cliente->razonSocial = $request->razonSocial;
            $cliente->nombres = $request->nombre;
            $cliente->apellidoPaterno = $request->apellidoPaterno;
            $cliente->apellidoMaterno = $request->apellidoMaterno;
            $cliente->RFC = $request->rfc;
            $cliente->email = $request->email;
            $cliente->esquema = $request->bd;
            $cliente->directorio = $dir;
            $cliente->logo = $directLink;
            $cliente->path = $imageUrl;
            $cliente->save();
            
            //  se crea la bd para el cliente
            //Roboshot::CrearRoboshot($request->bd);

            $data = array(
                'status' => true,
                'mensaje' => 'Usuario insertado correctamente',
                //'data' => $directLink
            );
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

            return response()->json($data);
        }
        
        return response()->json($data);      
    }

    //  datos de un cliente en especifico
    public function infoCliente($id){
        $usuario = User::find($id);
        $cliente = Clientes::where('idUsuario', $id)->first();
        //$url = Storage::url($cliente->logo);
        $data = array(
            'usuario' => $usuario->nombre,
            'nombre' => $cliente->nombres,
            'apellidoPaterno' => $cliente->apellidoPaterno,
            'apellidoMaterno' => $cliente->apellidoMaterno, 
            'RFC' => $cliente->RFC,
            'razonSocial' => $cliente->razonSocial,
            'logo' => $cliente->logo,
            'email' => $cliente->email, 
            'esquema' => $cliente->esquema
        );
        
        //$x = Usuarios::infoCliente($id);
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
        $logo = $cliente->logo;
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
                // TODO: add new field 'path' to save relative path from logo
                Storage::disk('dropbox')->delete($path);
                //  mueve el elemento
                //$logo = Storage::putFileAs('public/images/'.$cliente->directorio, $image, $newLogo);
                $path = $image->storeAs(
                    'public/images/'.$cliente->directorio,
                    $newLogo,
                    'dropbox'
                );
                $newImage = $this->dropbox->createSharedLinkWithSettings(
                    $path, 
                    ["requested_visibility" => "public"]
                );
                //  se modifica la url para poder visualizar el contenido
                $modifiedUrl = explode('?', $newImage['url']);
                $logo = $modifiedUrl[0].'?dl=1';

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
                
                return $data;
            }
        }

        $cliente->razonSocial = $request->razonSocial;
        $cliente->nombres = $request->nombre;
        $cliente->apellidoPaterno = $request->apellidoPaterno;
        $cliente->apellidoMaterno = $request->apellidoMaterno;
        $cliente->RFC = $request->rfc;
        $cliente->email = $request->email;
        $cliente->logo = $logo;
        $cliente->path = $path;
        $cliente->save();

        $data = array(
            'status' => true, 
            'mensaje' => 'Datos actualizados',
        );
        return response()->json($data);
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
                    
                    if($path !== 'public/images-default/camera.jpg'){
                        Storage::disk('dropbox')->delete($path);
                    }
                    $path = $img->storeAs(
                        'public/img-users',
                        $nombre,
                        'dropbox'
                    );
                    $url = $this->dropbox->createSharedLinkWithSettings(
                        $path, 
                        ["requested_visibility" => "public"]
                    );
                    //  se modifica la url para poder visualizar el contenido
                    $modifiedUrl = explode('?', $url['url']);
                    $logo = $modifiedUrl[0].'?dl=1';
                    //  se mueve el archivo al storage local
                    //$path = Storage::putFileAs('public/img-users', $img, $nombre);
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

                    return response()->json($data);
                }
            }
            $cliente->nombres = $request->nombres;
            $cliente->apellidoPaterno = $request->apellidos;
            $cliente->email = $request->email;
            $cliente->logo = $logo;
            $cliente->path = $path;
            $cliente->update();

            $data = array(
                'status' => true,
                'mensaje' => 'Datos actualizados'
            );

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

        return response()->json($data);
    }

}