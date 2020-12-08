<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecetaPedidos extends Model
{
    protected $table = 'recetaPedidos';
    protected $primaryKey = null;
    public $incrementing = false;
    protected $fillable = [
        'codigo', 'idProd', 'idReceta', 'idCliente', 'nombre', 'precio'
    ];
}
