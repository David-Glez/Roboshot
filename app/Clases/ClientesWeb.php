<?php

namespace App\Clases;

//use Illuminate\Support\Facades\DB;

//  fechas
use Illuminate\Support\Carbon;

//  Modelos
use App\Models\Clientes;
use App\Models\User;
use App\Models\Pedidos;
use App\Models\RecetaPedidos;
use App\Models\IngredientePedidos;

//  auxiliares
use App\Rules\MayorEdad;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class ClientesWeb{

    //  trae los datos del usuario especifico
    public static function dataUsuario($id){

        $pedidos = [];

        //  datos generales
        $usuarioGral = Clientes::where('idUsuario', $id)->first();

        $fecha = Carbon::parse($usuarioGral->created_at)->format('d/m/Y');
        $url = Storage::url($usuarioGral->logo);
        //  arreglo de datos
        $datosUsuario = array(
            'nombres' => $usuarioGral->nombres,
            'apellidoP' => $usuarioGral->apellidoPaterno,
            'apellidoM' => $usuarioGral->apellidoMaterno,
            'img' => $url,
            'email' => $usuarioGral->email,
            'alta' => $fecha
        );

        //  pedidos del cliente
        $pedido = Pedidos::where('idUsuario', $id)->get();
        foreach($pedido as $item){
            
            $recetas = [];
            $recetaPedido = RecetaPedidos::where('codigo', $item->codigo)->get();

            //  recetas por pedido
            foreach($recetaPedido as $x){
                $cod = $item->codigo.'-'.$x->idProd;
                $listaIngredientes = [];
                //$cliente = Clientes::where('idCliente', $x->idCliente)->first();
                $razon = '-';
                $ingredientePedido = IngredientePedidos::where('codigoProd', $cod)->get();

                //  ingredientes por recetas
                foreach($ingredientePedido as $i){

                    $dataIngr = array(
                        'codProd' => $cod,
                        'idIngrediente' => $i->idIngrediente,
                        'idCategoria' => $i->idCategoria,
                        'marca' => $i->marca,
                        'cantidad' => $i->cantidad,
                        'precio' => $i->precio
                    );

                    $listaIngredientes[] = $dataIngr;
                }
                
                $dataReceta = array(
                    'idProd' => $x->idProd,
                    'cliente' => $razon,
                    'idReceta' => $x->idReceta,
                    'nombre' => $x->nombre,
                    'precio' => $x->precio,
                    'ingredientes' => $listaIngredientes

                );
                $recetas[] = $dataReceta;
            }

            $dataPedido = array(
                'codigo' => $item->codigo,
                'total' => $item->total,
                'recetas' => $recetas
            );

            $pedidos[] = $dataPedido;
            
        }

        $data = array(
            'datosUsuario' => $datosUsuario,
            'pedidos' => $pedidos
        );

        return $data;
    }

    //  registra un usuario
    public static function addUsuario($datos){
        try{
            $datos->validate([
                'usuario' => ['required', 'unique:usuarios,nombre'],
                'contrasena' => ['required', 'min:6'],
                'fechaNacimiento' => ['required', new MayorEdad]
            ]);
            
            $fechaNacimiento = Carbon::create($datos->fechaNacimiento);
            
            //   se añade el usuario a la tabla usuarios
            $user = new User;
            $user->nombre = $datos->usuario;
            $user->password = bcrypt($datos->contrasena);
            $user->idRol = 4; #id de rol por defecto para clientes
            $user->save();
            
            //  id del usuario recien creado
            $id = $user->idUsuario;

            //  se añade a la tabla clientes
            $general = new Clientes;
            $general->idUsuario = $id;
            $general->nombres = $datos->nombres;
            $general->apellidoPaterno = $datos->apellido;
            $general->fechaNacimiento = $fechaNacimiento;
            $general->apellidoMaterno = '-'; # valor temporal, en la tabla es nulo
            $general->email = $datos->correo;
            $general->logo = 'public/images-default/camera.jpg';  #   valor por defecto, personalizado por el usuario
            $general->save();

            $data = array(
                'status' => true,
                'mensaje' => 'Usuario Registrado :D ya puedes iniciar sesion'
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

            return $data;
        }

        return $data;
    }

    //  actualizar usuario
    public static function updateUsuario($datos){
        try{
            $datos->validate([
                'contrasena' => ['required', 'password:api']
            ]);
            
            //  datos del cliente
            $cliente = Clientes::where('idUsuario', Auth::user()->idUsuario)->first();
            $path = $cliente->logo;

            if($datos->hasFile('img')){
                try{
                    $datos->validate([
                        'img' => ['image', 'mimes:jpeg,png,jpg,svg']
                    ]);
                
                    $fecha = Carbon::now()->format('Y-m-d');
                    $img = $datos->file('img');
                    $extension = $img->getClientOriginalExtension();

                    //  nombre del archivo nuevo
                    $nombre = $fecha.'-'.Auth::user()->idUsuario.'-'.Auth::user()->nombre.'.'.$extension;
                    
                    if($path !== 'public/images-default/camera.jpg'){
                        Storage::delete($path);
                    }
                    //  se mueve el archivo al storage local
                    $path = Storage::putFileAs('public/img-users', $img, $nombre);
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
            $cliente->nombres = $datos->nombres;
            $cliente->apellidoPaterno = $datos->apellidos;
            $cliente->email = $datos->email;
            $cliente->logo = $path;
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

            return $data;
        }

        return $data;
    }

}