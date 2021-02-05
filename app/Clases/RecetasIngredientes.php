<?php

namespace App\Clases;

//  modelos
use App\Models\Recetas;
use App\Models\Ingredientes;

//  auxiliares
use App\Clases\Conexion;

class RecetasIngredientes{
    
    //  trae las recetas del cliente
    public static function recetas($esquema){

        $data = [];

        //  establecer conexion al esquema que le corresponde
        Conexion::conectaNombre($esquema);

        //consulta las recetas
        $recetas = Recetas::all();

        foreach($recetas as $x){
            $receta = array(
                'id' => $x->idReceta,
                'nombre' => $x->nombre,
                'precio' => '$'.floatval($x->precio),
                'estado' => $x->activa,
                'creado' => $x->actualizado
            );

            $data[] = $receta;
        }

        return $data;
    }
}