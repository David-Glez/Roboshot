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

    //  trae todas las recetas de un solo cliente
    Route::get('/receta/{idCliente}', 'WebController@recetasCliente');

    //  trae todos los ingredientes de un cliente
    Route::get('/ingredientes/{idCliente}', 'WebController@ingredientes');

    //  trae una receta en especifico
    Route::get('/receta/{idReceta}/{idCliente}', 'WebController@receta');

    //  captura el pedido, lo guarda y genera el codigo para canjear
    Route::post('/pedido/nuevo', 'WebController@pedido');
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

    //  ruta para roboshot local
    Route::post('/roboshots/local/actualizar', 'RoboshotController@actualizarLocal');
    
    //rutas con requerimiento de autorizacion
    Route::group([
        'middleware' => 'auth:api'
    ], function(){

        // rutas para funciones destinadas a usuarios
        Route::get('/usuarios', 'UsuariosController@inicio');
        Route::get('/clientes', 'UsuariosController@clientes');
        Route::post('/usuarios/anadir', 'UsuariosController@anadirCliente');

        // rutas para funciones destinadas a roboshots
        Route::get('/roboshots', 'RoboshotController@inicio');
        Route::post('/roboshots/revisar', 'RoboshotController@disponibles');
        
    });
});

