// Task array to store all tasks
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const filterBtns = document.querySelectorAll('.filter-btn');
const darkModeBtn = document.getElementById('darkModeBtn');

// Initialize app
init();

function init() {
    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    darkModeBtn.addEventListener('click', toggleDarkMode);

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = 'Light Mode';
    }

    renderTasks();
}

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();

    // Validation
    if (taskText === '') {
        alert('⚠ Please enter a task!');
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    taskInput.focus();
    
    renderTasks();
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks to display</li>';
    } else {
        filteredTasks.forEach(task => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    }

    updateCounter();
}

// Create Task Element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="action-btn complete-btn" onclick="toggleComplete(${task.id})">
            ${task.completed ? '↩' : '✓'}
        </button>
        <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    return li;
}

// Toggle Complete
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Edit Task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edit task:', task.text);
    
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

// Delete Task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
}

// Get Filtered Tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(t => t.completed);
        case 'pending':
            return tasks.filter(t => !t.completed);
        default:
            return tasks;
    }
}

// Update Counter
function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = 'Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeBtn.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
    }
}