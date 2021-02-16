<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\Clientes;
use App\Models\Roboshots;
use App\Models\Rutas;
use App\Models\User;
use App\Models\Recetas;
use App\Models\Ingredientes;
use App\Models\Pedidos;


use App\Clases\Conexion;

class GeneralController extends Controller
{
   
    //////////////////////////////////////////////////////////////////////////////////////////
    //          informacion en dashboard 
    //////////////////////////////////////////////////////////////////////////////////////////

    //  trae informacion para las cards
    public function statsCard(){
        $data = [];
        $idRol = Auth::user()->idRol;

        switch($idRol){
            case 1:
                //  datos sobre usuarios
                $noUsuario = User::all()->count();
                $fechaUsuario = '';
                $mensajeUsuario = 'No hay registros';
                $iconoUser = 'users';
                if($noUsuario > 0){
                    $fechaUsuario = Carbon::parse(User::all()->last()->updated_at);
                    $mensajeUsuario = $fechaUsuario->diffForHumans();
                }

                $user = array(
                    'icono' => $iconoUser,
                    'nombre' => 'Usuarios',
                    'total' => $noUsuario,
                    'fecha' => $fechaUsuario,
                    'mensaje' => $mensajeUsuario
                );

                //  datos sobre clientes
                $noClientes = Clientes::all()->count();
                $fechaCliente = '';
                $mensajeCliente = 'No hay registros';
                $iconoCliente = 'user-tie';
                if($noClientes > 0){
                    $fechaCliente = Carbon::parse(Clientes::all()->last()->updated_at);
                    $mensajeCliente = $fechaCliente->diffForHumans();
                }

                $clients = array(
                    'icono' => $iconoCliente,
                    'nombre' => 'Clientes',
                    'total' => $noClientes,
                    'fecha' => $fechaCliente,
                    'mensaje' => $mensajeCliente
                );

                //  datos sobre roboshots
                $noRoboshot = Roboshots::all()->count();
                $fechaRoboshot = '';
                $mensajeRoboshot = 'No hay registros';
                $iconoRob = 'beer';
                if($noRoboshot > 0){
                    $fechaRoboshot = Carbon::parse(Roboshots::all()->last()->updated_at);
                    $mensajeRoboshot = $fechaRoboshot->diffForHumans();
                }

                $roboshot = array(
                    'icono' => $iconoRob,
                    'nombre' => 'Roboshots',
                    'total' => $noRoboshot,
                    'fecha' => $fechaRoboshot,
                    'mensaje' => $mensajeRoboshot
                );

                $data[] = $user;
                $data[] = $clients;
                $data[] = $roboshot;
                
                break;
            case 2:
                $idCliente = Clientes::where('idUsuario', Auth::user()->idUsuario)->first();
                Conexion::conectaID($idCliente->idCliente);

                //  datos sobre recetas
                $noRecetas = Recetas::all()->count();
                $fechaReceta = '';
                $mensajeReceta = 'No hay registros';
                $iconoReceta = 'cocktail';
                if($noRecetas > 0){
                    $fechaReceta = Carbon::parse(Recetas::all()->last()->created_at);
                    $mensajeReceta = $fechaReceta->diffForHumans();
                }

                $recetas = array(
                    'icono' => $iconoReceta,
                    'nombre' => 'Recetas',
                    'total' => $noRecetas,
                    'fecha' => $fechaReceta,
                    'mensaje' => $mensajeReceta
                );

                //  datos sobre ingredientes
                $noIng = Ingredientes::all()->count();
                $fechaIng = '';
                $mensajeIng = 'No hay registros';
                $iconoIng = 'wine-bottle';
                if($noIng > 0){
                    $fechaIng = Carbon::parse(Ingredientes::all()->last()->created_at);
                    $mensajeIng = $fechaIng->diffForHumans();
                }

                $ingredientes = array(
                    'icono' => $iconoIng,
                    'nombre' => 'Ingredientes',
                    'total' => $noIng,
                    'fecha' => $fechaIng,
                    'mensaje' => $mensajeIng
                );

                $data[] = $recetas;
                $data[] = $ingredientes;
                break;
        }
        
        return response()->json($data);
    }

     //  devuelve las rutas segun el rol del usuario
     public function rutas(){
        $idRol = Auth::user()->idRol;

        $rutas = Rutas::where('idRol', $idRol)->get();

        return response()->json($rutas);
    }

    //  consulta una lista de clientes
    public function clientes(){
        $data = [];
        $clientes = Clientes::whereHas('usuario', function($query){
            $query->where('idRol', 2);
        })->get();

        foreach($clientes as $i){

            $x = array(
                'idCliente' => $i->idCliente,
                'nombre' => $i->nombres.' '.$i->apellidoPaterno.' '.$i->apellidoMaterno
            );
            $data[] = $x;
        }

        return response()->json($data);
    }

    

}
