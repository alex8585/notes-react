<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes([
    'login' => false,
    'logout' => false,
    'confirm' => true,
    'forgot' => true,
    'register' => true,
    'reset' => true,
    'verification' => true,
]);
// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::get('users')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
Route::get('users/create')->name('users.create')->uses('UsersController@create')->middleware('auth');
Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations


Route::get('organizations')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Contacts
Route::get('contacts')->uses('ContactsController@index')->name('contacts')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');


// Categories
Route::get('categories')->uses('CategoriesController@index')->name('categories')->middleware('remember', 'auth');
Route::get('categories/create')->name('categories.create')->uses('CategoriesController@create')->middleware('auth');
Route::post('categories')->name('categories.store')->uses('CategoriesController@store')->middleware('auth');
Route::get('categories/{category}/edit')->name('categories.edit')->uses('CategoriesController@edit')->middleware('auth');
Route::put('categories/{category}')->name('categories.update')->uses('CategoriesController@update')->middleware('auth', 'check-owner');
Route::delete('categories/{category}')->name('categories.destroy')->uses('CategoriesController@destroy')->middleware('auth', 'check-owner');
Route::put('categories/{category}/restore')->name('categories.restore')->uses('CategoriesController@restore')->middleware('auth');


// Notes
Route::get('notes')->uses('NotesController@index')->name('notes')->middleware('remember', 'auth');
Route::get('notes/create')->name('notes.create')->uses('NotesController@create')->middleware('auth');
Route::post('notes')->name('notes.store')->uses('NotesController@store')->middleware('auth');
Route::get('notes/{note}/edit')->name('notes.edit')->uses('NotesController@edit')->middleware('auth');

Route::put('notes/{note}')->name('notes.update')->uses('NotesController@update')
    ->middleware('auth', 'can:update,note');

Route::delete('notes/{note}')->name('notes.destroy')->uses('NotesController@destroy')->middleware('auth', 'check-owner');
Route::put('notes/{note}/restore')->name('notes.restore')->uses('NotesController@restore')->middleware('auth');



// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});

// Modal Demo Page
Route::get('modals')->name('modals')->uses('ModalController@index')->middleware('auth');
Route::post('organizationsFromModal')->name('organizations.storeFromModal')->uses('OrganizationsController@storeFromModal')->middleware('auth');
