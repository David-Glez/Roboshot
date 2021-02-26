<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Clientes;

class UsuariosDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for($i = 1; $i<=20; $i++){
            $user = User::create([
                'nombre' => 'int-'.$i,
                'password' => bcrypt('int-'.$i),
                'idRol' => 4
            ]);
            Clientes::create([
                'idUsuario' => $user->idUsuario,
                'nombres' => 'Integra',
                'apellidoPaterno' => 'Automation',
                'apellidoMaterno' => $i,
                'fechaNacimiento' => now(),
                'email' => 'int@aut-'.$i,
                'logo' => 'https://www.dropbox.com/s/jqqra9fl8w4y4i5/camera.jpg?dl=1',
                'path' => 'public/images-default/camera.jpg'
            ]);
        }
    }
}
