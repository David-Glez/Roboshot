<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recetas extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'recetas';
    public $incrementing = false;
    protected $fillable = [
        'idReceta', 'nombre', 'descripcion', 'precio', 'activa', 'img', 'actualizado'
    ];
}
