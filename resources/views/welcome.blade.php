<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 p-6">
    <div id="app" class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
        <form id="task-form" class="flex mb-4">
            <input type="text" id="task-input" placeholder="Enter task" class="flex-grow p-2 border rounded mr-2">
            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Enter</button>
        </form>
        <ul id="task-list" class="list-disc pl-5"></ul>
        <button id="show-all-btn" class="mt-4 bg-green-500 text-white p-2 rounded">Show All Tasks</button>
    </div>
    <div id="github-profile" class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">GitHub Profile</h2>
        <p><strong>GitHub Repo:</strong> <a href="https://github.com/CoffeeQuotes/todoapp.git" class="text-blue-500" target="_blank">https://github.com/CoffeeQuotes/todoapp.git</a></p>
        <div id="profile-data">
            <!-- GitHub Profile data will be injected here -->
        </div>
    </div>
    @vite('resources/js/app.js')
</body>
</html>
