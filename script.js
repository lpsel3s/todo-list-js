
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];


function render() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('done');

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="removeTask(${index})">Remover</button>
        `;
        taskList.appendChild(li);
    });
    
    localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}


addBtn.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        tasks.push({ text: input.value, completed: false });
        input.value = '';
        render();
    }
});


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    render();
}


function removeTask(index) {
    tasks.splice(index, 1);
    render();
}

render();
