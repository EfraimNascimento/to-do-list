const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');



function loadTasks(){
    let loadTasks = localStorage.getItem('tarefas')

    let listaArray = JSON.parse(loadTasks)
    
    for(let i = 0; i < listaArray.length; i++){
        createTask(listaArray[i])   
    }


}




function createTask(task){
    
    let taskContent = document.createElement('p');
    taskContent.classList.add('task')
    
    taskContent.innerText = task
    target.appendChild(taskContent)
    
}

function delTask(item){
    console.log(`Tarefa: ${item}`)
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