<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RecetaIngredientes extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'recetaIngrediente';
    public $incrementing = false;
    //public $timestamps = false;
    protected $fillable = [
        'idReceta', 'idIngrediente', 'cantidad', 'roboshot'
    ];

    public function ingredients(){
        return $this->belongsTo(Ingredientes::class, 'idIngrediente', 'idIngrediente');
    }
}
