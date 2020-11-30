<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//  clase auxiliar
use App\Clases\Web;

//  Modelos
use App\Models\Clientes;
use App\Models\Recetas;
use App\Models\Pedidos;

class WebController extends Controller
{
    //  muestra todos los clientes registrados en la bd
    public function inicio(){
        $data = [];

        $clientes = Clientes::where('esquema', '!=', '')->get();
        foreach($clientes as $i){
            $datos = array(
                'idCliente' => $i->idCliente,
                'razonSocial' => $i->razonSocial,
                'logo' => $i->logo
            );

            $data[] = $datos;
        }
        return response()->json($data);
     
    }

    //  selecciona todas las recetas de un cliente
    public function recetasCliente($idCliente){

        $x = Web::inicio($idCliente);

        return response()->json($x);
    }

    //  trae los ingredientes y categorias de un ingrediente
    public function ingredientes($idCliente){

        $x = Web::ingredientes($idCliente);
        
        return response()->json($x);
    }

    //  trae una receta en especifico
    public function receta($idReceta, $idCliente){

        $x = Web::receta($idReceta, $idCliente);
        
        return response()->json($x);
    }

    //  captura el pedido y genera el codigo para canjear
    public function pedido(Request $request){
        return response()->json($request);
        //  se genera el código del pedido
        /*$cadena = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $longitud = strlen($cadena);
        $codigo = 'rob-web-';

        for($i = 0; $i < 7; $i++){
            $codigo .= $cadena[rand(0, $longitud-1)];
        }
        
        //  se inserta el codigo de pedido en la base de datos
        $pedidos = new Pedidos;
        $pedidos->codigo = $codigo;
        $pedidos->total = $request->total;
        $pedidos->save();

        //  devuelve el codigo del pedido
        return response()->json($codigo);*/
    }
}
