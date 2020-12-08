<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredientes extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'ingredientes';
    protected $primaryKey = 'idIngrediente';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'idIngrediente', 'nombre', 'marca', 'precio', 'actualizado'
    ];
}
