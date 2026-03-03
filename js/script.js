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

function gerarID() {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

function createTask(item){
    //Cria uma div para envelopar as tarefas e as opções
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    target.appendChild(taskContainer);

    //Cria a tarefa e insere a mesma na lista
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.id = item.id;
    taskContent.innerText = item.task;
    
    if(item.isDone == true){
        taskContent.style.textDecoration = 'line-through';
    }else{
        taskContent.style.textDecoration = 'none';
    }

    taskContainer.appendChild(taskContent);    

    createOpts(taskContainer, item.isDone);
}

function createOpts(target, taskState){
    //Div dos botões
    let divOpts = document.createElement('div');
    divOpts.classList.add('opt-Box')
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

    if(taskState == true){
        optDone.style.backgroundColor = 'black';
        optDone.style.color = 'white';
    }else{
        optDone.style.backgroundColor = 'white';
        optDone.style.color = 'black';
    }

    optDone.setAttribute('onclick','options(this)');
    optRemove.setAttribute('onclick','options(this)');

    divOpts.appendChild(optDone);
    divOpts.appendChild(optRemove);
}

function options(opt){
    let taskChecked = opt.parentElement.parentElement.firstChild
    let actualTask = tasksArray.find(task => task.id === taskChecked.id)
    switch(opt != null){
    case opt.id == 'optDone':
        if(taskChecked.style.textDecoration != 'line-through'){
            taskChecked.style.textDecoration = 'line-through';
            opt.style.backgroundColor = 'black'
            opt.style.color = 'white'
            actualTask.isDone = true;
        }else{
            taskChecked.style.textDecoration = 'none';
            opt.style.backgroundColor = 'white'
            opt.style.color = 'black'
            actualTask.isDone = false;
        }
        updateLocalStorage(tasksArray);
    break;
    case opt.id == 'optRemove':
        removerItem(actualTask.id, taskChecked.parentElement)
        break;
    }
}

function removerItem(id, task) {
    task.remove()
    const lista = JSON.parse(localStorage.getItem('tarefas') || '[]');
    const novoArray = lista.filter(task => task.id !== id);
    localStorage.setItem('tarefas', JSON.stringify(novoArray));
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
        const newItem = {
            id: gerarID(),
            task: textInput.value,
            isDone: false
        }
        createTask(newItem);
        textInput.value='';
        tasksArray.push(newItem)
        updateLocalStorage(tasksArray);
    }else{
        warningModal('Insira uma tarefa!');
    }
}

function updateLocalStorage(array){
    localStorage.setItem('tarefas', JSON.stringify(array));
}