const textInput = document.getElementById('text-input');
const target = document.getElementById('tarefas');
const warnings = document.getElementById('aviso');
const detailsModal = document.getElementById('detailsModal');



function loadTasks(){
    let loadTasks = localStorage.getItem('tarefas')

    let listaArray = JSON.parse(loadTasks)
    
    for(let i = 0; i < listaArray.length; i++){
        createTask(listaArray[i])   
    }

}


function createTask(task){
    
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');
    taskContent.innerText = task;
    target.appendChild(taskContent);
    taskContent.setAttribute('onclick', 'detailModal(this)')

    
    
}

function dellTask(item){
    console.log(item)
}

let buttonsModal = document.querySelectorAll('#detailsModal button');

console.log(buttonsModal)

buttonsModal.forEach((button) =>{
    button.addEventListener('click', ()=>{
        
        switch(button){
            case button.innerHTML == 'Concluído':
                console.log('conc')
                break;
            case button.innerHTML == 'Remover':
                console.log('remo')
                break;
            case button.innerHTML == 'Voltar':
                console.log('volt')
                break;
            default:
                return true;
                
        }
    })
})

function detailModal(task){
    // detailsModal.style.display = 'flex';
    const taskDetailed = document.querySelector('#detailsModal p');
    
    
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