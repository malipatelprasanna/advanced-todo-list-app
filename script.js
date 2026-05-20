const taskInput =
document.getElementById('taskInput');

const addTaskBtn =
document.getElementById('addTaskBtn');

const taskList =
document.getElementById('taskList');

const filterBtns =
document.querySelectorAll('.filter-btn');

let tasks =
JSON.parse(localStorage.getItem('tasks')) || [];

let currentFilter = 'all';

renderTasks();

addTaskBtn.addEventListener('click', addTask);

function addTask(){

    const taskText =
    taskInput.value.trim();

    if(taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed:false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value='';
}

function renderTasks(){

    taskList.innerHTML='';

    let filteredTasks = tasks;

    if(currentFilter === 'active'){
        filteredTasks =
        tasks.filter(task => !task.completed);
    }

    if(currentFilter === 'completed'){
        filteredTasks =
        tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li =
        document.createElement('li');

        li.classList.add('task');

        if(task.completed){
            li.classList.add('completed');
        }

        li.innerHTML = `
        
        <span>${task.text}</span>

        <div class="task-buttons">

        <button class="complete-btn"
        onclick="toggleTask(${task.id})">

        ✓

        </button>

        <button class="edit-btn"
        onclick="editTask(${task.id})">

        Edit

        </button>

        <button class="delete-btn"
        onclick="deleteTask(${task.id})">

        Delete

        </button>

        </div>
        
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed =
            !task.completed;
        }

        return task;

    });

    saveTasks();

    renderTasks();
}

function deleteTask(id){

    tasks =
    tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function editTask(id){

    const task =
    tasks.find(task => task.id === id);

    const updatedText =
    prompt('Edit task', task.text);

    if(updatedText !== null){

        task.text = updatedText;

        saveTasks();

        renderTasks();
    }
}

function saveTasks(){

    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(button =>
        button.classList.remove('active'));

        btn.classList.add('active');

        currentFilter =
        btn.dataset.filter;

        renderTasks();

    });

});