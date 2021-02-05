<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RutasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  rutas para super usuario
        DB::table('rutas')->insert([
            'idRol' => 1,
            'ruta' => '/admin/usuarios',
            'nombre' => 'Usuarios',
            'icono' => 'users'
        ]);

        DB::table('rutas')->insert([
            'idRol' => 1,
            'ruta' => '/admin/roboshots',
            'nombre' => 'Roboshots',
            'icono' => 'beer'
        ]);

        DB::table('rutas')->insert([
            'idRol' => 1,
            'ruta' => '/admin/rutas',
            'nombre' => 'Rutas',
            'icono' => 'route'
        ]);
        

        //  rutas para adminitrador
        DB::table('rutas')->insert([
            'idRol' => 2,
            'ruta' => '/admin/recetas',
            'nombre' => 'Recetas',
            'icono' => 'cocktail'
        ]);

        DB::table('rutas')->insert([
            'idRol' => 2,
            'ruta' => '/admin/ingredientes',
            'nombre' => 'Ingredientes',
            'icono' => 'wine-bottle'
        ]);
    }
}
