const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const contadorTarefas = document.getElementById("contadorTarefas");
const contadorConcluidas = document.getElementById("contadorConcluidas");
const barraProgresso = document.getElementById("barraProgresso");


function atualizarProgresso(){
    const concluidas = document.querySelectorAll(".concluida").length;
    const total = tarefas.length;

    const porcentagem = total === 0 ? 0 : (concluidas / total) * 100;

    barraProgresso.style.width = porcentagem + "%";
}
function atualizarContador() {
    contadorTarefas.textContent = "Tarefas: " + tarefas.length;
}
function atualizarConcluidas() {
    const concluidas = document.querySelectorAll(".concluida").length;
    contadorConcluidas.textContent = "Concluídas: " + concluidas;
}
function criarTarefa(tarefa) {
    const li = document.createElement("li");
    const botao = document.createElement("button");

    li.textContent = tarefa;
    botao.textContent = "Excluir";

    li.appendChild(botao);
    listaTarefas.appendChild(li);

    botao.addEventListener('click', function (event) {
        event.stopPropagation();

        const index = tarefas.indexOf(tarefa);
        tarefas.splice(index, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        listaTarefas.removeChild(li);
        atualizarContador();
        atualizarConcluidas();
        atualizarProgresso();
    });

    li.addEventListener("click", function () {
    li.classList.toggle("concluida");
    atualizarConcluidas();
    atualizarProgresso();
});
}

tarefas.forEach(function (tarefa) {
    criarTarefa(tarefa);
    atualizarConcluidas();
    atualizarProgresso();
});

atualizarContador();

botaoAdicionar.addEventListener('click', function () {
    const tarefa = inputTarefa.value.trim();

    if (tarefa === '') {
        alert('Por favor, insira uma tarefa!');
        return;
    }

    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    criarTarefa(tarefa);
    atualizarContador();

    inputTarefa.value = '';
});

inputTarefa.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        botaoAdicionar.click();
    }
});