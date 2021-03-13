<?php

require __DIR__ . '/auth.php';



// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');


Route::middleware('auth', 'verified')->group(function () {
    // Dashboard
    Route::get('/')->name('dashboard')->uses('DashboardController');


    // Categories
    Route::get('categories')->uses('CategoriesController@index')->name('categories')->middleware('remember');
    Route::get('categories/create')->name('categories.create')->uses('CategoriesController@create');
    Route::post('categories')->name('categories.store')->uses('CategoriesController@store');
    Route::get('categories/{category}/edit')->name('categories.edit')->uses('CategoriesController@edit');
    Route::put('categories/{category}')->name('categories.update')->uses('CategoriesController@update')->middleware('check-owner');
    Route::delete('categories/{category}')->name('categories.destroy')->uses('CategoriesController@destroy')->middleware('check-owner');
    Route::put('categories/{category}/restore')->name('categories.restore')->uses('CategoriesController@restore');


    // Notes
    Route::get('notes')->uses('NotesController@index')->name('notes');
    Route::get('notes/create')->name('notes.create')->uses('NotesController@create');
    Route::post('notes')->name('notes.store')->uses('NotesController@store');
    Route::get('notes/{note}/edit')->name('notes.edit')->uses('NotesController@edit');
    Route::put('notes/{note}')->name('notes.update')->uses('NotesController@update')->middleware('can:update,note');
    Route::delete('notes/{note}')->name('notes.destroy')->uses('NotesController@destroy')->middleware('check-owner');
    Route::put('notes/{note}/restore')->name('notes.restore')->uses('NotesController@restore');
});
