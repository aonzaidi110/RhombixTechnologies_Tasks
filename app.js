document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    addTask(taskText);
    taskInput.value = '';
});

function addTask(taskText) {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    storeTaskInLocalStorage(taskText);
}

function createTaskItem(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const span = document.createElement('span');
    span.innerText = taskText;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', () => editTask(li, span));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li, taskText));
    li.appendChild(deleteBtn);

    return li;
}

function editTask(li, span) {
    const newTaskText = prompt('Edit Task:', span.innerText);
    if (newTaskText && newTaskText.trim() !== '') {
        const oldTaskText = span.innerText;
        span.innerText = newTaskText;
        updateTaskInLocalStorage(oldTaskText, newTaskText);
    }
}

function deleteTask(li, taskText) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    }
}

function storeTaskInLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function updateTaskInLocalStorage(oldTaskText, newTaskText) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldTaskText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTaskText;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
