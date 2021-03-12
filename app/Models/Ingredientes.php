<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredientes extends Model
{
    protected $connection = 'roboshot';
    protected $table = 'ingredientes';
    protected $primaryKey = 'idIngrediente';
    //public $incrementing = false;
    //public $timestamps = false;
    protected $fillable = [
        'idIngrediente', 'roboshot','categoria', 'nombre', 'marca', 'precio', 'actualizado'
    ];

    public function recipes(){
        return $this->belongsToMany(Recetas::class, 'recetaIngrediente', 'idIngrediente', 'roboshot', 'idIngrediente', 'roboshot')
                    ->using(RecetaIngredientes::class);
    }
    
}
