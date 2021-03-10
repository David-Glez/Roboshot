<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'idCliente';
    protected $fillable = [
        'idUsuario', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'RFC', 'email',
        'fechaNacimiento', 'logo', 'esquema', 'directorio', 'path', 'razonSocial'
    ];

    public function usuario(){
        return $this->hasOne(User::class, 'idUsuario', 'idUsuario');
    }

    public function station_rob(){
        return $this->hasMany(Roboshots::class, 'idCliente', 'idCliente');
    }
    
}
