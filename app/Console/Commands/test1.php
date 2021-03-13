<?php

namespace App\Console\Commands;


use App\User;
use App\Models\Note;
use VK\Actions\Notes;
use App\Models\Category;
use App\Events\TestEvent;
use Laravel\Dusk\Browser;
use Tests\Feature\UserTest;
use Tests\Browser\LoginTest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;


use App\Listeners\TestEventListener;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Laravel\Dusk\Chrome\ChromeProcess;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;

class test1 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test1';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }



    public function getFromCashe()
    {
        return Cache::rememberForever('test_notes4', function () {
            return  \DB::table('statistics')->limit(100000)->get();
        });
    }

    //Cache::forget('key');
    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(TestEventListener $h)
    {
        //$notes = \DB::table('statistics')->limit(500000)->get();
        //Cache::forget('test_notes4');
        //die;
        //Note::factory()->count(1000)->create();
        //dd();
        $time = now();

        $time_start = microtime(true);
        //dump($time);

        //Cache::set('test_notes4', $notes);
        $notes = $this->getFromCashe();
        echo count($notes);
        echo PHP_EOL;
        //dump(now());
        // dump($n);
        // $tt = $time->diff(now())->timestamp;
        $time = (microtime(true) - $time_start) * 1000;
        dd($time);
    }
}
