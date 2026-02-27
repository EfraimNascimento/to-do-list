const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');

function loadTasks(){
    let loadTasks = localStorage.getItem('tarefas', JSON.parse)

    console.log(target.children.length)

    while(loadT
        console.log(loadTasks)
    }

    
}


function createTask(){
    let taskContent = document.createElement('p');
    taskContent.innerText = textInput.value
    target.appendChild(taskContent)
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
        createTask();
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas.push(textInput.value);

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        textInput.value='';
    }else{
        warningModal('Insira uma tarefa!');
    }
    
}

console.log(localStorage)