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

class ClientesWeb{

    //  trae los datos del usuario especifico
    public static function dataUsuario($id){

        $pedidos = [];

        //  datos generales
        $usuarioGral = Clientes::where('idUsuario', $id)->first();

        $fecha = Carbon::parse($usuarioGral->created_at)->format('d/m/Y');

        //  arreglo de datos
        $datosUsuario = array(
            'nombres' => $usuarioGral->nombres,
            'apellidoP' => $usuarioGral->apellidoPaterno,
            'apellidoM' => $usuarioGral->apellidoMaterno,
            'img' => $usuarioGral->logo,
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

}