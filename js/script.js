const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');
const listaDeTarefas = document.querySelectorAll('#tarefas div')
let tasksArray = JSON.parse(localStorage.getItem('tarefas'));
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
    
    createOpts(taskContent, id);
}

function createOpts(target, id){
    //Div dos botões
    let divOpts = document.createElement('div');
    divOpts.classList.add('opt-Box')
    target.appendChild(divOpts);

    //Cria as opções das tarefas e atribui a elas
    let taskOptions = document.createElement('button');
    taskOptions.innerText = 'Opções';
    taskOptions.classList.add('optBtn');
    taskOptions.id = `${id}`;
    taskOptions.setAttribute('onclick', 'taskOptions(this, id)');

    

    divOpts.appendChild(taskOptions);

    //Cria as opções para cada tarefa
    let optDone = document.createElement('button');
    let optBack = document.createElement('button');
    let optRemove = document.createElement('button');
    
    optDone.classList.add('opt-buttons');
    optBack.classList.add('opt-buttons');
    optRemove.classList.add('opt-buttons');

    divOpts.appendChild(optDone);
    divOpts.appendChild(optBack);
    divOpts.appendChild(optRemove);

}

function taskOptions(opt, id){
    
}

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
        createTask(textInput.value);
        tasksArray.push(textInput.value);
        updateLocalStorage(tasksArray);
        textInput.value='';
    }else{
        warningModal('Insira uma tarefa!');
    }
}

function updateLocalStorage(array){
    localStorage.setItem('tarefas', JSON.stringify(array));
}