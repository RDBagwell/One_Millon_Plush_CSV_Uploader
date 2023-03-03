<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvUploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/upload', [CsvUploadController::class, 'index']);

Route::post('/upload', [CsvUploadController::class, 'upload']);

Route::get('/batch', [CsvUploadController::class, 'batch']);

Route::get('/batch/in-progress', [CsvUploadController::class, 'batchInProgress']);
