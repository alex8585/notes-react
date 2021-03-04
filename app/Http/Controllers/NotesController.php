<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use App\Models\Note;
use App\Utils\Utils;

use Inertia\Inertia;
use App\Models\Category;


use League\Glide\Server;
use App\Mail\OrderShipped;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use League\Glide\ServerFactory;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Intervention\Image\Facades\Image;
use App\Http\Resources\NoteCollection;
use App\Http\Requests\NoteStoreRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\CategoryCollection;
use Illuminate\Http\Request as HttpRequest;
use App\Http\Requests\CategoryUpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Request as Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(HttpRequest $request, Utils $utils, Server $glide)
    {



        // return $glide->fromPath('images/1.jpg',[])->response();
        //$carbon = Carbon::now()->diffForHumans();

        //$adjusted = Str::finish('this/string/', '/');
        //$path = resource_path();


        //dd( $path);
        //$m = Auth::user()->categories()->get();

        //dd((CategoryResource::collection($m))->resolve());
        //Log::channel('app')->info('The system is down!');
        //dd('1');


        //dd(env('APP_ENV'));

        $notes = Auth::user()->notes()->with('category')
            ->filter(Request::only('search', 'category_id'))
            ->sort(Request::only('sort', 'direction'))
            ->paginate()->withQueryString();



        $notes->getCollection()->transform(function ($notes) {
            $notes->cat_name = $notes->category->name;
            return $notes;
        });


        //dd($notes);
        return Inertia::render(
            'Notes/Index',
            [
                'filters' => Request::all('search', 'category_id'),
                'items' => (new NoteCollection($notes))->additional(['meta' => [
                    'test' => '1111',
                ]]),
                'categories' => new CategoryCollection(
                    Auth::user()->categories()->get()
                ),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     return Inertia::render('Notes/Create', [
    //         'categories' => new ResourceCollection(
    //             Auth::user()->categories()
    //                 ->get()
    //         ),
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NoteStoreRequest $request)
    {
        Auth::user()->notes()->create(
            $request->validated()
        );

        return Redirect::route('notes')->with('success', 'The note has created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit(Category $category)
    // {
    //     return Inertia::render('Categories/Edit', [
    //         'category' => new JsonResource($category),
    //     ]);
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Note $note, NoteStoreRequest $request)
    {
        $note->update(
            $request->validated()
        );

        return Redirect::route('notes')->with('success', 'The note has updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return Redirect::route('notes')->with('success', 'Note deleted.');
    }
}
