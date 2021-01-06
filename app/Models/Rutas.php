<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    protected $table = 'rutas';
    protected $primaryKey = 'idRuta';
    protected $fillable = [
        'idRol', 'ruta', 'icono', 'nombre'
    ];
}
