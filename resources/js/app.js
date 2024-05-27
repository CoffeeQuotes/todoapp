import './bootstrap';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all-btn');

    const loadTasks = (completed = false) => {
        const url = completed ? '/api/tasks' : '/api/tasks?completed=false';
        axios.get(url)
            .then(response => {
                taskList.innerHTML = '';
                response.data.forEach(task => {
                    appendTask(task);
                });
            });
    };

    const appendTask = (task) => {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;
        taskItem.className = "flex items-center justify-between p-2 border-b";
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox">
            <span class="flex-grow ml-2">${task.title}</span>
            <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        `;
        taskList.appendChild(taskItem);
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (!title) return;

        axios.post('/api/tasks', { title })
            .then(response => {
                appendTask(response.data);
                taskInput.value = '';
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    alert('Task already exists!');
                } else {
                    alert('An error occurred. Please try again.');
                }
            });
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.closest('li');
            const taskId = taskItem.dataset.id;
            const isChecked = e.target.checked;

            axios.put(`/api/tasks/${taskId}`, { completed: isChecked })
                .then(response => {
                    if (isChecked) {
                        taskItem.remove();
                    }
                });
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.closest('li');
            const taskId = taskItem.dataset.id;
            if (confirm('Are you sure to delete this task?')) {
                axios.delete(`/api/tasks/${taskId}`)
                    .then(() => {
                        taskItem.remove();
                    });
            }
        }
    });

    showAllBtn.addEventListener('click', () => loadTasks(true));

    loadTasks();
});
