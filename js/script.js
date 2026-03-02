const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');

let tasksArray = JSON.parse(localStorage.getItem('tarefas'));

window.onload = loadTasks(tasksArray)
    
function loadTasks(array){
    for(let i = 0; i < array.length; i++){
        createTask(array[i], i)
    }
    updateLocalStorage(array)
}

function createTask(task, id){
    //Cria uma div para envelopar as tarefas e as opções
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    taskContainer.id = `${id}`;
    target.appendChild(taskContainer);

    //Cria a tarefa e insere a mesma na lista
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.id = `task-${id}`;
    taskContent.innerText = task;
    taskContainer.appendChild(taskContent);

    createOpts(taskContainer, id);
}

function createOpts(target, id){
    //Div dos botões
    let divOpts = document.createElement('div');
    divOpts.classList.add('opt-Box')
    divOpts.id = `box-${id}`
    target.appendChild(divOpts);

    //Cria as opções para cada tarefa
    let optDone = document.createElement('button');
    let optRemove = document.createElement('button');
    
    optDone.classList.add('opt-buttons');
    optRemove.classList.add('opt-buttons');

    optDone.id = 'optDone';
    optRemove.id = 'optRemove';

    optDone.innerHTML = '<i class="fa-solid fa-check"></i>';
    optRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    optDone.setAttribute('onclick','options(this)');
    optRemove.setAttribute('onclick','options(this)');

    divOpts.appendChild(optDone);
    divOpts.appendChild(optRemove);
}

function options(opt){
    let idNumber = opt.parentElement.id.replace(/\D/g, "");
    let taskChecked = document.querySelector(`#tarefas #task-${idNumber}`)
    switch(opt != null){
    case opt.id == 'optDone':
        if(taskChecked.style.textDecoration != 'line-through'){
            taskChecked.style.textDecoration = 'line-through';
            
            opt.style.backgroundColor = 'black'
            opt.style.color = 'white'   
        }else{
            taskChecked.style.textDecoration = 'none';
            opt.style.backgroundColor = 'white'
            opt.style.color = 'black'
        }
    break;
    case opt.id == 'optRemove':
        let taskToRemove = document.querySelectorAll('.taskContainer')
        taskToRemove[idNumber].remove()
        tasksArray.splice(idNumber, 1);

        console.log(tasksArray);
        updateLocalStorage(tasksArray);
        break;
    }
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
        createTask(textInput.value, tasksArray.length - 1);
        tasksArray.push(textInput.value);
        updateLocalStorage(tasksArray);
        textInput.value='';
        console.log(tasksArray)
    }else{
        warningModal('Insira uma tarefa!');
    }
}

function updateLocalStorage(array){
    localStorage.setItem('tarefas', JSON.stringify(array));
}