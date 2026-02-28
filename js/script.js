const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');
const detailsModal = document.getElementById('detailsModal');
const listaDeTarefas = document.querySelectorAll('#tarefas div')
let buttonsModal = document.querySelectorAll('#detailsModal button');

let tasks = localStorage.getItem('tarefas');
let tasksArray = JSON.parse(tasks);

function loadTasks(){
    for(let i = 0; i < tasksArray.length; i++){
        createTask(tasksArray[i], i)
    }

}


function createTask(task, id){
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.id = `${id}`;
    taskContent.innerText = task;
    target.appendChild(taskContent);
    taskContent.setAttribute('onclick', 'detailModal(this, id)')
}

function dellTask(task){
    // tasksArray.splice(tasksArray[task.getAttribute('id')], 1)
    
    
}

dellTask()



function detailModal(task, id){
    detailsModal.style.display = 'flex';
    let taskDetailed = document.querySelector('#detailsModal div');
    taskDetailed.innerHTML = task.innerHTML;
    taskDetailed.id = `${id}`;

    buttonsModal.forEach((button) =>{
        button.addEventListener('click', ()=>{
            if(button.innerHTML == 'Concluído'){
                console.log('conc')
            }else if(button.innerHTML == 'Remover'){
                dellTask(taskDetailed)
            }else{
                detailsModal.style.display = 'none';
            }
        })
    })
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