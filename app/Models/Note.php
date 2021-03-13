<?php

namespace App\Models;

use DateTimeInterface;
use App\Events\TestEvent;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;
    use Notifiable;

    protected $dispatchesEvents = [
        'saved' => TestEvent::class,
        'deleted' => TestEvent::class,
    ];

    // protected $dates = [
    //     'created_at',
    //     'updated_at'
    // ];


    protected $casts = [
        'created_at' => 'date:d-m-Y H:i',
        'updated_at' => 'date:d-m-Y H:i',
    ];




    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // public function serializeDate(DateTimeInterface $date)
    // {
    //     //return $date;
    //     return $date->format('d-Y-m');
    // }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('body', 'like', '%' . $search . '%')
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
            });
        })->when($filters['category_id'] ?? null, function ($query, $category_id) {
            $query->whereHas('category', function ($query) use ($category_id) {
                $query->where('id', $category_id);
            });
        });
    }

    public function scopeSort($query, $sort, $direction)
    {

        $direction = $direction ?? 'asc';
        $sort = $sort ?? 'id';

        if (!in_array($direction, ['asc', 'desc'])) {
            return $query;
        }

        if ($sort !== 'category') {
            $query->orderBy($sort, $direction);
        } else {
            $orderByRaw = \DB::raw("(select name from categories where notes.category_id = categories.id) $direction");
            $query->orderByRaw($orderByRaw);
        }

        return $query;
    }
}
