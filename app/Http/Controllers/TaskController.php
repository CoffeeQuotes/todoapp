<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $completed = $request->query('completed');
        if ($completed === 'true') {
            return Task::where('completed', true)->get();
        } elseif ($completed === 'false') {
            return Task::where('completed', false)->get();
        }
        return Task::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:tasks',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $task->completed = $request->input('completed', $task->completed);
        $task->save();

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
