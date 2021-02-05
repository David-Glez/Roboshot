<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorias extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'categorias';
    protected $primaryKey = 'idCategoria';
    //public $incrementing = false;
    //public $timestamps = false;
    protected $fillable = [
        'idCategoria', 'roboshot', 'nombre'
    ];
}
