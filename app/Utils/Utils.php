<?php

namespace App\Utils;

class Utils
{
    public $a = 5;
    public function test()
    {
        return '1111';
    }

    public function __toString()
    {
        return json_encode([
            'aaaa' => 'bbbb',
            'aaa1' => 'bbb1'
        ]);
    }
}
