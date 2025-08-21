
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
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim();

    if (!title) return; // Titel is verplicht

    const task = {
        title: title,
        description: description,
        createdAt: new Date().toISOString(), // als string opslaan
        status: 'todo'
    };

    tasks.push(task);
    saveAndRender();

    // Formulier leegmaken
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
};

const saveAndRender = () => {
    saveTasks();
    renderTasks();
};

const handleDragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
};

const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const task = tasks.find(t => t.createdAt === id);
    if (task) {
        task.status = newStatus;
        saveAndRender();
    }
};

const renderTasks = () => {
    ['todo', 'inprogress', 'done'].forEach(status => {
        const column = document.getElementById(status);

        // Bewaar de <h3>
        const heading = column.querySelector('h3');
        column.innerHTML = '';
        column.appendChild(heading);

        // Voeg taken toe
        tasks
            .filter(t => t.status === status)
            .forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.draggable = true;
                taskDiv.id = task.createdAt;
                taskDiv.addEventListener('dragstart', handleDragStart);

                // Titel
                const title = document.createElement('strong');
                title.textContent = task.title;

                // Beschrijving
                const desc = document.createElement('div');
                desc.textContent = task.description;

                // Datum
                const date = document.createElement('small');
                const formattedDate = new Date(task.createdAt).toLocaleString();
                date.textContent = formattedDate;

                taskDiv.appendChild(title);
                taskDiv.appendChild(document.createElement('br'));
                taskDiv.appendChild(desc);
                taskDiv.appendChild(document.createElement('br'));
                taskDiv.appendChild(date);

                column.appendChild(taskDiv);
            });
    });
};

window.addEventListener('load', setup);
