<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecetaIngredientes extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'recetaIngrediente';
    public $incrementing = false;
    //public $timestamps = false;
    protected $fillable = [
        'idReceta', 'idIngrediente', 'cantidad', 'roboshot'
    ];
}
