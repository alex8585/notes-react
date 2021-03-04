<?php

namespace App\Providers;

use League\Glide\Server;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        JsonResource::withoutWrapping();
    }

    public function register()
    {
        $this->registerGlide();
    }

    protected function registerGlide()
    {

        $this->app->bind(Server::class, function ($app) {
            return Server::create([
                'source' => Storage::getDriver(),
                'cache' => Storage::getDriver(),
                'cache_folder' => '.glide-cache',
                'base_url' => 'img',
            ]);
        });

        DB::listen(function ($query) {
            //Log::channel('app')->info($query->sql);
            // $query->sql
            // $query->bindings
            // $query->time
        });
    }
}
