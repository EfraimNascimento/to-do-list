const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');
const listaDeTarefas = document.querySelectorAll('#tarefas div')
let tasks = localStorage.getItem('tarefas');
let tasksArray = JSON.parse(tasks);
console.log(tasksArray)

function loadTasks(){
    for(let i = 0; i < tasksArray.length; i++){
        createTask(tasksArray[i], i)
    }
}

function createTask(task, id){
    //Cria a tarefa e insere a mesma na lista
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.id = `${id}`;
    taskContent.innerText = task;
    target.appendChild(taskContent);

    //Cria as opções das tarefas e atribui a elas
    let taskOptions = document.createElement('button');
    taskOptions.innerText = 'Opções';
    taskOptions.classList.add('optBtn');
    taskOptions.id = `${id}`;
    taskOptions.setAttribute('onclick', 'taskOptions(this, id)');
    taskContent.appendChild(taskOptions);
}

function taskOptions(opt, id){
    console.log(tasksArray[id])
    tasksArray.splice(id, 1)
}

//console.log(target.previousElementSibling)

function warningModal(action){
    const modal = document.getElementById('avisos');

    switch(!action){
        case action == '':
            modal.style.display = 'flex';
            warnings.innerText = action;
            break;
        case action == 'close':
            modal.style.display = 'none';
            break;
        default:
            modal.style.display = 'none';
    }

}


function addtask(){
    if(textInput.value != ""){
        let actualTask = textInput.value;
        createTask(actualTask);
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas.push(textInput.value);

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        textInput.value='';
    }else{
        warningModal('Insira uma tarefa!');
    }
    
}