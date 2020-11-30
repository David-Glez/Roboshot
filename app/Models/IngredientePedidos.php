<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IngredientePedidos extends Model
{
    protected $table = 'ingredientePedidos';
    protected $primaryKey = null;
    public $incrementing = false;
    protected $fillable = [
        'codigoProd', 'idIngrediente', 'idCategoria', 'marca', 'posicion', 'cantidad', 'precio'
    ];
}
