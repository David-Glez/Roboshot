<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roboshots extends Model
{
    //protected $connection = 'pgsql';
    protected $table = 'roboshots';
    protected $primaryKey = 'idRoboshot';
    protected $fillable = [
        'idCliente', 'MAC', 'nombre', 'estado'
    ];

    public function station_client(){
        return $this->belongsToMany(Clientes::class, 'idCliente', 'idCliente');
    }

    //  relationship with recetas table in client schema
    public function robot_recipe(){
        
        $database = $this->getConnection();
        dd($database);
        return $this->hasMany(Recetas::class, 'roboshot', 'idRoboshot');
    }

}
