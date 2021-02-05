<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roboshots extends Model
{
    protected $table = 'roboshots';
    protected $primaryKey = 'idRoboshot';
    protected $fillable = [
        'idCliente', 'MAC', 'nombre', 'estado'
    ];

    public function station_client(){
        return $this->belongsToMany(Clientes::class, 'idCliente', 'idCliente');
    }
}
