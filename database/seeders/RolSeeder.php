<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->insert([
            'rol' => 'Super Administrador'
        ]);

        DB::table('roles')->insert([
            'rol' => 'Administrador'
        ]);

        DB::table('roles')->insert([
            'rol' => 'Empleado'
        ]);

        DB::table('roles')->insert([
            'rol' => 'Cliente'
        ]);
    }
}
