<?php

namespace App\Clases;

use App\Models\Clientes;

class Conexion{

    // conexion por nombre de esquema
    public static function conectaNombre($esquema){

        $nombre = $esquema;

        //  asigna el nombre de la base de datos en la configuracion de base de datos
        config(['database.connections.roboshot.schema' => ''.$nombre.'']);
        $conecta = config('database.connections.roboshot');

        return $conecta;
    }

     //conexion por ID de cliente
     public static function conectaID($id){
        $esquemas = Clientes::where('idCliente', $id)->first();
        config(['database.connections.roboshot.schema' => ''.$esquemas->esquema.'']);
        $conecta = config('database.connections.roboshot');

        return $conecta; 
    }
}