import './bootstrap';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all-btn');
    const profileDataContainer = document.getElementById('profile-data');

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
        taskItem.className = `flex items-center justify-between p-2 border-b ${
            task.completed ? 'bg-green-200' : 'bg-yellow-200'
        }`;
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
                    taskItem.className = `flex items-center justify-between p-2 border-b ${
                        isChecked ? 'bg-green-200' : 'bg-yellow-200'
                    }`;
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

    const loadGitHubProfile = () => {
        axios.get('https://api.github.com/users/CoffeeQuotes')
            .then(response => {
                const profile = response.data;
                profileDataContainer.innerHTML = `
                    <p><strong>Username:</strong> ${profile.login}</p>
                    <p><strong>Name:</strong> ${profile.name}</p>
                    <p><strong>Bio:</strong> ${profile.bio}</p>
                    <p><strong>Location:</strong> ${profile.location}</p>
                    <p><strong>Public Repos:</strong> ${profile.public_repos}</p>
                    <p><strong>Followers:</strong> ${profile.followers}</p>
                    <p><strong>Following:</strong> ${profile.following}</p>
                    <p><strong>GitHub Profile:</strong> <a href="${profile.html_url}" class="text-blue-500" target="_blank">${profile.html_url}</a></p>
                `;
            })
            .catch(error => {
                profileDataContainer.innerHTML = `<p class="text-red-500">Error fetching GitHub profile data</p>`;
            });
    };

    loadTasks();
    loadGitHubProfile();
});
