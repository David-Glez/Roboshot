<?php
namespace App\Clases;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//  clase auxiliar
use App\Clases\Conexion;
use Carbon\Carbon;

//  Modelos
use App\Models\Categorias;
use App\Models\Recetas;
use App\Models\Ingredientes;
use App\Models\RecetaIngredientes;
use App\Models\Roboshots;
use App\Models\Clientes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class Roboshot{

    //  ver lista de roboshots registrados
    public static function inicio(){
        $data = [];
        $rob = Roboshots::all();
        foreach($rob as $i){
            $cliente = Clientes::where('idCliente', $i->idCliente)->first();
            $fecha = new Carbon($i->created_at);
            $datos = array(
                'id' => $i->idRoboshot,
                'nombre' => $i->nombre,
                'cliente' => $cliente->nombres.' '.$cliente->apellidoPaterno.' '.$cliente->apellidoMaterno,
                'MAC' => $i->MAC,
                'estado' => $i->estado,
                'creado' => $fecha->format('Y-m-d')
            );
            $data[] = $datos;
        }

        return $data;
    }

    //  informacion de una estacion
    public static function info($id){
        $rob = Roboshots::find($id);
        $cliente = Clientes::find($rob->idCliente);

        $data = array(
            'idCliente' => $cliente->idCliente,
            'cliente' => $cliente->nombres.' '.$cliente->apellidoPaterno.' '.$cliente->apellidoMaterno,
            'nombre' => $rob->nombre,
            'mac' => $rob->MAC,
            'estado' => $rob->estado
        );

        return $data;
    }

    //  registrar estacion 
    public static function registrar($datos){
        try{
            $datos->validate([
                'mac' => ['required', 'unique:roboshots,MAC', 'min:17'],
                'nombre' => ['required', 'unique:roboshots,nombre']
            ]);

            $roboshot = Roboshots::create([
                'idCliente' => $datos->idCliente,
                'MAC' => $datos->mac,
                'nombre' => $datos->nombre,
                'estado' => true
            ]);
            

            $data = array(
                'status' => true,
                'mensaje' => 'Estación registrada con éxito',
            );

        }catch(ValidationException $e){
            $errors = [];
            foreach($e->errors() as $item) {
                foreach($item as $x){
                    $errors[] = $x;
                }
            }
            $data = array(
                'status' => false,
                'mensaje' => $errors,
            );
            return $data;
        }

        return $data;
    }

    //  editar datos de una estacion
    public static function editar($datos){
        
        $robot = Roboshots::find($datos->idRob);
        $robot->nombre = $datos->nombre;
        $robot->MAC = $datos->mac;
        $robot->estado = $datos->estado;
        $robot->save();

        $data = array(
            'status' => true,
            'mensaje' => 'Datos actualizados'
        );

        return $data;
    }

    //  elimina el registro de una estacion roboshot
    public static function eliminar($datos){
        try{
            $datos->validate([
                'password' => ['required', 'password:api']
            ]);

            $eliminar = Roboshots::find($datos->id)->delete();

            $data = array(
                'status' => true,
                'mensaje' => 'Estación eliminada',
            );

        }catch(ValidationException $e){
            $errors = [];
            foreach($e->errors() as $item) {
                foreach($item as $x){
                    $errors[] = $x;
                }
            }
            $data = array(
                'status' => false,
                'mensaje' => $errors,
            );
            return $data;
        }

        return $data;
    }

    public static function CrearRoboshot($nombre){

        //  crea el espacio en la base de datos
        DB::statement("CREATE SCHEMA ".$nombre."");

        //  cambia archivo de configuracion de la base de datos
        Conexion::conectaNombre($nombre);

        //  tabla para categorias
        Schema::connection('roboshot')->create('categorias', function(Blueprint $table){
            $table->id();
            $table->integer('idCategoria');
            $table->integer('roboshot')->nullable();
            $table->string('nombre')->nullable();
            $table->timestamps();
        });

        //  tabla para recetas
        Schema::connection('roboshot')->create('recetas', function(Blueprint $table){
            $table->id();
            $table->integer('idReceta');
            $table->integer('roboshot')->nullable();
            $table->string('nombre')->nullable();
            $table->string('descripcion')->nullable();
            $table->float('precio', 4, 2);
            $table->boolean('activa');
            $table->string('img')->nullable();
            $table->string('path')->nullable();
            $table->boolean('mezclar');
            $table->timestamps();
        });

        //  tabla para ingredientes
        Schema::connection('roboshot')->create('ingredientes', function(Blueprint $table){
            $table->id();
            $table->integer('idIngrediente');
            $table->integer('roboshot')->nullable();
            $table->integer('categoria')->nullable();
            //$table->integer('posicion')->nullable();
            $table->string('marca')->nullable();
            $table->float('precio', 4, 2);
            $table->timestamps();
        });

        // tabla relacion receta - ingrediente
        Schema::connection('roboshot')->create('recetaIngrediente', function(Blueprint $table){
            $table->id();
            $table->integer('idReceta');
            $table->integer('roboshot')->nullable();
            $table->integer('idIngrediente');
            $table->decimal('cantidad', 8, 2);
            $table->timestamps();
        });

        return true;
    }

    //  elimina la base de datos del roboshot
    public static function eliminarRoboshot($esquema){
        //eliminar esquema
        $eliminarEsquema = DB::statement('DROP SCHEMA '.$esquema.' CASCADE');
        
        if($eliminarEsquema){
            return true;
        }else{
            return false;
        }
    }
    
}