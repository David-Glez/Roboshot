<?php

namespace App\Clases;

use App\Models\Clientes;
use Illuminate\Support\Facades\DB;

class Conexion{

    // conexion por nombre de esquema
    public static function conectaNombre($esquema){

        $nombre = $esquema;

        //  asigna el nombre de la base de datos en la configuracion de base de datos
        //  para postgresql
        config(['database.connections.roboshot.schema' => ''.$nombre.'']);
        //  para mysql
        //config(['database.connections.roboshot.database' => ''.$nombre.'']);
        $conecta = config('database.connections.roboshot');

        return $conecta;
    }

     //conexion por ID de cliente
     public static function conectaID($id){
        $esquemas = Clientes::where('idCliente', $id)->first();
        //  para postgresql
        //config(['database.connections.roboshot.schema' => ''.$esquemas->esquema.'']);
        //  para mysql
        config(['database.connections.roboshot.database' => ''.$esquemas->esquema.'']);
        $conecta = config('database.connections.roboshot');

        return $conecta; 
    }

    //  cierra la conexion
    public static function desconecta(){

        //  para postgresql
        //config(['database.connections.roboshot.schema' => '']);
        //  para mysql
        config(['database.connections.roboshot.database' => '']);
        $conecta = config('database.connections.roboshot');
        
        return $conecta;
    }
}