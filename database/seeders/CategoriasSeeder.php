<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        #1
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Tequila'
        ]);

        #2
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Vodka'
        ]);

        #3
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Ron'
        ]);

        #4
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Refresco'
        ]);

        #5
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Jugos y Jarabes'
        ]);

        #6
        DB::table('categoriasWeb')->insert([
            'nombre' => 'Licores'
        ]);
    }
}
