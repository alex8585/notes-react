<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Events\TestEvent;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{


    protected function setUp(): void
    {
        parent::setUp();
        $this->url = env('APP_URL');
        //dd(env('APP_ENV'));
    }

    public function testFirstTest()
    {

        //$user = User::find(1);
        $response = $this->get('/');

        $response->assertStatus(302);
        //$response->dump();
    }

    public function testPage2Test()
    {
        Event::fake();
        Mail::fake();
        $response = $this->get('/login');

        $response->assertStatus(200);

        Event::assertDispatched(TestEvent::class);

        Mail::assertSent(function (OrderShipped $mail) {
            return $mail->price === '100500';
        });
    }

    // public function testGetIndex()
    // {
    // }
}
