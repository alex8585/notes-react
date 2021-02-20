<?php

namespace App\Http\Controllers;


use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Requests\NoteStoreRequest;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $direction = Request::input('direction') ?? 'asc';
        $sort = Request::input('sort') ?? 'id';
        //dd($direction);
        $notes = Auth::user()->notes()->with('category')->filter(Request::only('search', 'category_id'));
        if ($sort && $direction) {
            $notes = $notes->orderBy($sort, $direction);
        }

        $notes = $notes->paginate()->appends(Request::all());
        return Inertia::render(
            'Notes/Index',
            [
                'filters' => Request::all('search', 'category_id'),
                'items' => new ResourceCollection($notes),
                'categories' => new ResourceCollection(
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
    public function create()
    {
        return Inertia::render('Notes/Create', [
            'categories' => new ResourceCollection(
                Auth::user()->categories()
                    ->get()
            ),
        ]);
    }

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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => new JsonResource($category),
        ]);
    }

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
