<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $page = request('page');
        return Inertia::render('Course/CourseList',[
            'page' => $page
        ]);
    }

    public function getAllCourses(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $perPage = $perPage > 50 ? 50 : $perPage;

        $courses = Course::paginate($perPage);

        return response()->json($courses);
    }

    public function create(){
        return Inertia::render('Course/Form');
    }

    public function store(Request $request){
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|min:5',
                'description' => 'required|string|min:5',
                'price' => 'required|numeric',
                'is_active' => 'required|boolean',
                'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            ]);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('thumbnails', $fileName, 'public');
                $validatedData['thumbnail'] = '/storage/' . $filePath;
            }

            $validatedData['slug'] = Str::slug($validatedData['title']);

            $course = Course::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Course created successfully',
                'data' => $course,
            ], 201);


        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Failed to create course',
                'error' => $th->getMessage(),
            ], 500);
        }
        
    }


}
