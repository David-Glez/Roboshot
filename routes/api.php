<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| https://www.twilio.com/blog/build-secure-api-php-laravel-passport
*/

//  rutas para vista principal de roboshot
Route::group([
    'prefix' => 'web'
], function(){
    //  trae todas los clientes registrados
    Route::get('/inicio', 'WebController@inicio');

    //  consulta a bd remota desde estacion local para codigo QR
    Route::get('/codigo/{codigo}', 'WebController@codigo');

    //  trae todas las recetas de un solo cliente
    Route::get('/receta/{idCliente}', 'WebController@recetasCliente');

    //  trae todos los ingredientes de un cliente
    Route::get('/ingredientes/{idCliente}', 'WebController@ingredientes');

    //  trae una receta en especifico
    Route::get('/receta/{idReceta}/{idCliente}', 'WebController@receta');

    //  captura el pedido, lo guarda y genera el codigo para canjear
    Route::post('/pedido/nuevo', 'WebController@pedido');

    //  rutas para la modificacion y consulta de los datos del usuario
    Route::group([
        'middleware' => 'auth:api'
    ], function(){

        //  trae los datos de un solo usuario
        Route::get('/usuario/data/{id}', 'UsuariosController@usuario');

        //  actualiza los datos del usuario
        Route::post('/usuario/data/actualizar', 'UsuariosController@actualizaUsuario');
    });
});

//rutas de login y administracion
// rutas con la forma localhost/api/auth/
Route::group([
    'prefix' => 'auth'
], function(){

    //  rutas para inicio de sesion
    Route::post('/login', 'InicioController@inicio');
    Route::post('/registrar', 'InicioController@registro');
    Route::get('/sesion', 'InicioController@vidaSesion');
    Route::post('/logout', 'InicioController@cerrarSesion');

    //  ruta para roboshot local
    Route::post('/roboshots/local/actualizar', 'RoboshotController@actualizarLocal');
    
    //rutas con requerimiento de autorizacion
    Route::group([
        'middleware' => 'auth:api'
    ], function(){

        // rutas para funciones destinadas a usuarios
        Route::get('/usuarios', 'UsuariosController@inicio');
        Route::post('/usuarios/anadir', 'UsuariosController@anadirCliente');
        Route::get('/usuarios/{id}', 'UsuariosController@infoCliente');
        Route::post('/usuarios/editar', 'UsuariosController@editarCliente');
        Route::post('/usuarios/eliminar', 'UsuariosController@eliminarCliente');

        // rutas para funciones destinadas a roboshots
        Route::get('/roboshots', 'RoboshotController@inicio');
        Route::post('/roboshots/anadir', 'RoboshotController@anadir');
        Route::get('/roboshots/{id}', 'RoboshotController@info');
        Route::post('/roboshots/eliminar', 'RoboshotController@eliminar');

        //  rutas para funciones generales
        Route::get('/general/stats', 'GeneralController@statsCard');
        Route::get('/general/rutas', 'GeneralController@rutas');
        Route::get('/general/clientes', 'GeneralController@clientes');
        
    });
});

