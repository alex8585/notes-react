<?php

namespace App\Models;

use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Category extends Model
{
    use HasFactory;
    protected $casts = [
        'created_at' => 'date:d-m-Y H:i',
        'updated_at' => 'date:d-m-Y H:i',
    ];


    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
