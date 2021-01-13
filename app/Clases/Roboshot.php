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
            $table->integer('idCategoria');
            $table->integer('roboshot')->nullable();
            $table->string('nombre')->nullable();
            $table->date('actualizado');
        });

        //  tabla para recetas
        Schema::connection('roboshot')->create('recetas', function(Blueprint $table){
            $table->integer('idReceta');
            $table->integer('roboshot')->nullable();
            $table->string('nombre')->nullable();
            $table->string('descripcion')->nullable();
            $table->float('precio', 4, 2);
            $table->boolean('activa');
            $table->string('img')->nullable();
            $table->date('actualizado');
        });

        //  tabla para ingredientes
        Schema::connection('roboshot')->create('ingredientes', function(Blueprint $table){
            $table->integer('idIngrediente');
            $table->integer('roboshot')->nullable();
            $table->integer('categoria')->nullable();
            $table->integer('posicion')->nullable();
            $table->string('marca')->nullable();
            $table->float('precio', 4, 2);
            $table->date('actualizado');
        });

        // tabla relacion receta - ingrediente
        Schema::connection('roboshot')->create('recetaIngrediente', function(Blueprint $table){
            $table->integer('idReceta');
            $table->integer('idIngrediente');
            $table->integer('cantidad');
            $table->date('actualizado');
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

    public static function recetasWeb($datos){

        //  establece la conexion a la base de datos de acuerdo al nombre
        Conexion::conectaNombre($datos->esquema);

        //  se decodifica
        $dataRecetas = json_decode($datos->tablaReceta);
        
        //  recorre el arreglo de recetas
        foreach($dataRecetas as $item){
            $busca = Recetas::where('idReceta', $item->id)->first();
            //  en el caso de que el campo sea nulo
            if($item->image == null){
                $imagen = '/images/camera.jpg';
            }else{
                $imagen = $item->image;
            }

            // si el campo no existe se añade a la tabla
            if($busca == ''){
                //   se añade a la tabla recetas
                $ingresa = new Recetas;
                $ingresa->idReceta = $item->id;
                $ingresa->nombre = $item->name;
                $ingresa->descripcion = $item->description;
                $ingresa->precio = $item->price;
                $ingresa->activa = true;
                $ingresa->img = $imagen;
                $ingresa->actualizado = Carbon::now();
                $ingresa->save();

                //  se actualizan los datos de los ingredientes
                foreach($item->idIngr as $ing){
                    $ingrediente = new RecetaIngredientes;
                    $ingrediente->idReceta = $item->id;
                    $ingrediente->idIngrediente = $ing->idIngrediente;
                    $ingrediente->cantidad = $ing->cantidad;
                    $ingrediente->actualizado = Carbon::now();
                    $ingrediente->save();

                }
            }else{
                //  se actualizan todos los campos
                $busca->idReceta = $item->id;
                $busca->nombre = $item->name;
                $busca->descripcion = $item->description;
                $busca->precio = $item->price;
                $busca->activa = true;
                $busca->img = $imagen;
                $busca->actualizado = Carbon::now();
                $busca->save();

                //  elimina los registros previos para sustituirlos por los nuevos
                $elimina = RecetaIngredientes::where('idReceta', $item->id)->delete();
                foreach($item->idIngr as $updIng){
                    $ingrediente = new RecetaIngredientes;
                    $ingrediente->idReceta = $item->id;
                    $ingrediente->idIngrediente = $updIng->idIngrediente;
                    $ingrediente->cantidad = $updIng->cantidad;
                    $ingrediente->actualizado = Carbon::now();
                    $ingrediente->save();
                }
            }
        }
        
        
        return true;

    }

    public static function ingredientesWeb($datos){

        //  establece la conexion a la base de datos de acuerdo al nombre
        Conexion::conectaNombre($datos->esquema);

        //  se decodifica
        $dataIngre = json_decode($datos->tablaIngredientes);

        //  se recorren los datos
        foreach($dataIngre as $item){
            //  se busca el elemento
            $busca = Ingredientes::where('idIngrediente', $item->id)->first();

            //   si el campo no existe se añade a la tabla
            if($busca == ''){
                $ingrediente = new Ingredientes;
                $ingrediente->idIngrediente = $item->id;
                $ingrediente->categoria = $item->category;
                $ingrediente->posicion = $item->pos;
                $ingrediente->marca = $item->marca;
                $ingrediente->precio = $item->price;
                $ingrediente->actualizado = Carbon::now();
                $ingrediente->save();
            }else{
                $busca->categoria = $item->category;
                $busca->posicion = $item->pos;
                $busca->marca = $item->marca;
                $busca->precio = $item->price;
                $busca->actualizado = Carbon::now();
                $busca->save();
            }
        }

        return $datos;

    }

    public static function categoriasWeb($datos){

        //  establece la conexion a la base de datos de acuerdo al nombre
        Conexion::conectaNombre($datos->esquema);

        //  se decodifica
        $dataCategoria = json_decode($datos->tablaCategorias);

        //  se recorren los datos
        foreach($dataCategoria as $item){

            //  se bsuca el elemento
            $busca = Categorias::where('idCategoria', $item->id)->first();

            //  si no existe se añade a la tabla
            if($busca == ''){
                $categoria = New Categorias;
                $categoria->idCategoria = $item->id;
                $categoria->nombre = $item->nombre;
                $categoria->actualizado = Carbon::now();
                $categoria->save();
            }else{
                $busca->nombre = $item->nombre;
                $busca->actualizado = Carbon::now();
                $busca->save();
            }
        }

        return true;
    }
}