<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return str_random(40);
});
$router->get('/products','ProductsController@get');
$router->post('/products','ProductsController@find');
$router->post('/products/save','ProductsController@save');
$router->delete('/products/drop/{id}','ProductsController@drop');

$router->get('/alamat','AlamatController@get');
$router->get('/alamat/user/{id_user}','AlamatController@getByUser');
$router->post("/accept/{id_order}", "OrdersController@accept");
// $router->delete('/alamat/drop/{id_pengiriman}','ALamatController@drop');
// $router->post('/alamat/save','AlamatController@save');

$router->get('/user','UserController@get');
$router->get('/user/{id_user}','UserController@data');
$router->post('/user','UserController@find');
$router->post('/user/save','UserController@save');
$router->delete('/user/drop/{id_user}','UserController@drop');
$router->post('/user/auth', 'UserController@auth');
$router->post('register', 'UserController@register');
$router->post('/user/save_profil', 'UserController@save_profil');

$router->get('/order','OrderController@get');
$router->get('/order/{id_user}','OrderController@getById');
// $router->post('/order/save','OrderController@save');

$router->get("/myorder/{id_user}", "OrderController@getOrdered");
$router->post("/order/pay", "OrderController@pay");
$router->post("/decline/{id_order}", "OrderController@decline");