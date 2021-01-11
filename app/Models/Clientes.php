<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'idCliente';
    protected $fillable = [
        'idUsuario', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'RFC', 'email',
        'fechaNacimiento', 'logo', 'esquema', 'directorio'
    ];

    public function usuario(){
        return $this->hasOne(User::class, 'idUsuario', 'idUsuario');
    }
    
}
