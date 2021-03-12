<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RecetaIngredientes extends pivot
{
    protected $connection = 'roboshot';
    protected $table = 'recetaIngrediente';
    public $incrementing = true;
    protected $primaryKey = 'id';
    //public $timestamps = false;
    protected $fillable = [
        'idReceta', 'idIngrediente', 'cantidad', 'roboshot'
    ];

    
}
