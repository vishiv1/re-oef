let tasks = [];

const setup = () => {
    loadTasks();
    renderTasks();
    setupEventListeners();
};

const loadTasks = () => {
    const saved = localStorage.getItem('VIVES-TODO');
    if (saved) tasks = JSON.parse(saved);
};

const saveTasks = () => {
    localStorage.setItem('VIVES-TODO', JSON.stringify(tasks));
};

const setupEventListeners = () => {
    document.getElementById('btnToDo').addEventListener('click', handleForm);

    document.querySelectorAll('.column').forEach(col => {
        const status = col.dataset.status;
        col.addEventListener('dragover', e => e.preventDefault());
        col.addEventListener('drop', e => handleDrop(e, status));
    });
};

const handleForm = () => {
    const title = document.getElementById('title').value.trim();
    const beschrijving = document.getElementById('beschrijving').value.trim();

    if (!title) return;

    const task = {
        id: Date.now(),
        title: title,
        beschrijving: beschrijving,
        status: 'todo'
    };
    tasks.push(task);
    saveAndRender();
};

const saveAndRender = () => {
    saveTasks();
    renderTasks();
};

const renderTasks = () => {
    ['todo', 'inprogress', 'done'].forEach(status => {
        const column = document.querySelector(`.column[data-status="${status}"] .task-list`);
        column.innerHTML = ''; // leegmaken

        tasks
            .filter(t => t.status === status)
            .forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.draggable = true;
                taskDiv.dataset.id = task.id;

                taskDiv.addEventListener('dragstart', handleDragStart);

                const title = document.createElement('strong');
                title.textContent = task.title;

                const description = document.createElement('p');
                description.textContent = task.beschrijving;

                taskDiv.appendChild(title);
                taskDiv.appendChild(description);
                column.appendChild(taskDiv);
            });
    });
};

let draggedTaskId = null;

const handleDragStart = (e) => {
    draggedTaskId = e.target.dataset.id;
};

const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const task = tasks.find(t => t.id === draggedTaskId);
    if (task) {
        task.status = newStatus;
        saveAndRender();
    }
};

window.addEventListener("load", setup);
