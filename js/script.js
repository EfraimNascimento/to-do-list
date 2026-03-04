const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');

let tasksArray = JSON.parse(localStorage.getItem('tarefas'));

window.onload = loadTasks(tasksArray);

function loadTasks(array){
    for(let i = 0; i < array.length; i++){
        createTask(array[i], i);
    }
    updateLocalStorage(array)
}

function gerarID() {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

function createTask(item){
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    target.appendChild(taskContainer);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.id = item.id;
    taskContent.innerText = item.task;
    taskContainer.appendChild(taskContent); 

    if(item.isDone == true){
        taskContent.style.textDecoration = 'line-through';
    }else{
        taskContent.style.textDecoration = 'none';
    }

    createOpts(taskContainer, item);
}

function createOpts(target, taskState){
    let divOpts = document.createElement('div');
    divOpts.classList.add('opt-Box')
    target.appendChild(divOpts);

    let optDone = document.createElement('button');
    let optRemove = document.createElement('button');

    optDone.classList.add('opt-buttons');
    optRemove.classList.add('opt-buttons');

    optDone.id = 'optDone';
    optRemove.id = 'optRemove';

    optDone.innerHTML = '<i class="fa-solid fa-check"></i>';
    optRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    if(taskState.isDone == true){
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
            actualTask.time = dateAndTime();
        }else{
            taskChecked.style.textDecoration = 'none';
            opt.style.backgroundColor = 'white'
            opt.style.color = 'black'
            actualTask.isDone = false;
            actualTask.time = "";
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
    updateLocalStorage(novoArray)
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

function dateAndTime(){
    const now = new Date();

    return now.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
    });
}

function addtask(){
    if(textInput.value != ""){
        const newItem = {
            id: gerarID(),
            task: textInput.value,
            isDone: false,
            time: "", 
        }
        tasksArray.push(newItem);
        updateLocalStorage(tasksArray);
        createTask(newItem);
        textInput.value='';
    }else{
        warningModal('Insira uma tarefa!');
    }
}

textInput.addEventListener('keydown', (e)=>{
    if(e.key == "Enter"){
        if(textInput.value != ""){
            const newItem = {
                id: gerarID(),
                task: textInput.value,
                isDone: false
            }
            tasksArray.push(newItem);
            updateLocalStorage(tasksArray);
            createTask(newItem);
            textInput.value='';
        }else{
            warningModal('Insira uma tarefa!');
        }
    }
})

function updateLocalStorage(array){
    localStorage.setItem('tarefas', JSON.stringify(array));
}