<?php

namespace App\Providers;

use League\Flysystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;

class DropBoxServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Storage::extend('dropbox', function ($app, $config) { 
            $client = new DropboxClient(
                $config['authorizationToken'] // Hacemos referencia al hash
            );

            return new Filesystem(new DropboxAdapter($client)); 
        });
    }
}
