<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;


Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

Route::apiResource('menus', MenuController::class);

Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{order}', [OrderController::class, 'show']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
Route::patch('/reservations/{reservation}', [ReservationController::class, 'update']);

Route::post('/admin/login', [
    AuthController::class,
    'login'
]);
Route::middleware('auth:sanctum')
    ->group(function () {

        Route::post(
            '/admin/logout',
            [AuthController::class, 'logout']
        );

    });
Route::middleware('auth:sanctum')
->group(function () {

    Route::get(
        '/admin/dashboard',
        [DashboardController::class, 'index']
    );

});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/admin/orders', [
        OrderController::class,
        'index'
    ]);

    Route::patch('/admin/orders/{order}', [
        OrderController::class,
        'update'
    ]);

});

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/admin/reservations',
        [ReservationController::class, 'index']
    );

    Route::patch(
        '/admin/reservations/{reservation}',
        [ReservationController::class, 'update']
    );

});
Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource(
        'admin/menus',
        MenuController::class
    );

});