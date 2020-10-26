<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roboshots extends Model
{
    protected $table = 'roboshots';
    protected $primaryKey = 'idRoboshot';
    protected $fillable = [
        'idUsuario', 'MAC', 'nombre', 'esquema'
    ];
}
