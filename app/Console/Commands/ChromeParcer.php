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
use App\Listeners\TestEventListener;


use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Laravel\Dusk\Chrome\ChromeProcess;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;

class ChromeParcer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chrome1';

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

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(TestEventListener $h)
    {
        // Category::factory()->count(3)
        //     ->has(Note::factory()->count(15))
        //     ->create();
        // //Note::factory()->count(5)->create();





        // dd('776');
        $process = (new ChromeProcess)->toProcess();
        $process->start();
        $options = (new ChromeOptions)->addArguments(['--disable-gpu',]);
        $capabilities = DesiredCapabilities::chrome()->setCapability(ChromeOptions::CAPABILITY, $options);
        $driver = retry(5, function () use ($capabilities) {
            return RemoteWebDriver::create('http://localhost:9515', $capabilities);
        }, 50);
        $browser = new Browser($driver);


        $browser->visit('https://www.tradingview.com/symbols/ETHUSDT/technicals/');
        $browser->waitFor('#technicals-root')->click('#technicals-root div div div div div div div div:nth-child(4)');


        $technicalsRoot = $browser->text('#technicals-root');
        dump($technicalsRoot);


        //$browser->quit();
        //$process->stop();
    }
}
