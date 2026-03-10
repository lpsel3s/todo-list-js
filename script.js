// Selecionar os elementos que vamos usar
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Carregar tarefas do banco de dados do navegador (LocalStorage)
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

// 2. Função para mostrar as tarefas na tela
function render() {
    taskList.innerHTML = ''; // Limpa a lista antes de redesenhar
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('done');

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="removeTask(${index})">Remover</button>
        `;
        taskList.appendChild(li);
    });
    // Salva a lista atualizada no LocalStorage
    localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

// 3. Função para Adicionar
addBtn.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        tasks.push({ text: input.value, completed: false });
        input.value = '';
        render();
    }
});

// 4. Função para Concluir/Desmarcar
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    render();
}

// 5. Função para Remover
function removeTask(index) {
    tasks.splice(index, 1);
    render();
}

// Inicia o app desenhando o que já estiver salvo
render();