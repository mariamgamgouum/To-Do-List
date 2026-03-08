class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
    toggle() {
        this.completed = !this.completed;
    }
}

const tasks = [];

function renderTasks() {
    const ul = document.getElementById('list2');
    ul.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            task.toggle();
            renderTasks();
        });

        // Task label text
        const label = document.createElement('span');
        label.textContent = task.description;
        label.classList.add('task-label');
        label.addEventListener('click', () => {
            task.toggle();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

document.getElementById('addBtn').addEventListener('click', () => {
    const text = document.getElementById('desc').value.trim();
    if (text) {
        tasks.push(new Task(text));
        renderTasks();
        document.getElementById('desc').value = '';
    }
});

document.getElementById('desc').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('addBtn').click();
});