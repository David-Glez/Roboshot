<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    protected $table = 'pedidos';
    protected $primaryKey = 'idPedido';
    protected $fillable = [
        'idUsuario', 'codigo', 'total'
    ];
}
