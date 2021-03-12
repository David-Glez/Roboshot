<?php

namespace App\Services;

use App\Models\Clientes;

class ConnectSchemaPg{

    //  connect to client schema by name schema
    public static function connectByName($schema){
        //  asigna el nombre de la base de datos en la configuracion de base de datos
        //  para postgresql
        config(['database.connections.roboshot.schema' => ''.$schema.'']);
        
        $connection = config('database.connections.roboshot');

        return $connection;
    }

    //  connect to client schema by client ID
    public static function connectByID($id){
        $client = Clientes::find($id);
        //  para postgresql
        config(['database.connections.roboshot.schema' => ''.$client->esquema.'']);
        //  para mysql
        //config(['database.connections.roboshot.database' => ''.$esquemas->esquema.'']);
        $connection = config('database.connections.roboshot');

        return $connection;
    }
}