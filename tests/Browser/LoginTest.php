<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Tests\Browser\Pages\Login;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testBeforeLogin()
    {
        //$users = User::factory()->count(3)->create();
        //dd(env('APP_URL'));
        $this->browse(function (Browser $browser) {
            $browser->visit(new Login)
                ->assertSee('Welcome Back!');
        });
    }

    public function testLogin()
    {

        $this->browse(function (Browser $browser) {
            $browser->visit(new Login)
                ->type('email', 'johndoe@example.com')
                ->type('password', 'secret');


            $email = $browser->value('#email');
            dump($email);

            $browser->click('[type="submit"]')->waitFor('@h1');
            //->press('Login')
            //->waitForText('1');

            $text = $browser->text('@h1');
            dump($text);

            //->screenshot('1')
            $browser->assertSee('Dashboard');
        });
    }
}
