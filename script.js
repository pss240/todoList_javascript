const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo(){
    const item = {
        id : new Date().getTime(),
        text : '',
        complete : false
    }

    todos.unshift(item);

    const {itemElement,inputElement,editBtnElement,removeBtnElement} = createTodoElement(item);


    list.prepend(itemElement);//첫번째 child전에 추가하는것

    inputElement.removeAttribute('disabled');

    inputElement.focus();
    saveToLocalStorage();

}

function createTodoElement(item){
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = item.complete;

    if(item.complete){
        itemElement.classList.add('complete');
    }

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = item.text;
    inputElement.setAttribute('disabled','');

    const actionsElement = document.createElement('div');
    actionsElement.classList.add('actions');

    const editBtnElement = document.createElement('button');
    editBtnElement.classList.add('material-icons');
    editBtnElement.innerText = 'edit';

    const removeBtnElement = document.createElement('button');
    removeBtnElement.classList.add('material-icons','remove-btn');
    removeBtnElement.innerText ='remove_circles';

    inputElement.addEventListener('input', () =>{
        item.text = inputElement.value;
    })

    checkboxElement.addEventListener('change', () =>{
        item.complete = checkboxElement.checked;
        if(item.complete){
            itemElement.classList.add('complete');
        }else{
            itemElement.classList.remove('complete');
        }
        saveToLocalStorage();

    })

    inputElement.addEventListener('blur', () =>{
        inputElement.setAttribute('disabled','');
        saveToLocalStorage();
    })

    editBtnElement.addEventListener('click', () =>{
        inputElement.removeAttribute('disabled');
        inputElement.focus();
    });

    removeBtnElement.addEventListener('click', () =>{
        todos = todos.filter(t=>t.id!== item.id);
        itemElement.remove();
        saveToLocalStorage();
    });

    actionsElement.append(editBtnElement);
    actionsElement.append(removeBtnElement);

    itemElement.append(checkboxElement);
    itemElement.append(inputElement);
    itemElement.append(actionsElement);

    return {itemElement,inputElement,editBtnElement,removeBtnElement}

}

function saveToLocalStorage(){
    const data = JSON.stringify(todos);
    window.localStorage.setItem('todos',data);
}

function loadFromLocalStorage(){
    const data = window.localStorage.getItem('todos');
    if(data){
        todos = JSON.parse(data);
    }
}

function displayTodos(){
    loadFromLocalStorage();
    for(let i = 0; i < todos.length; i++){
        const item = todos[i];
        const {itemElement} = createTodoElement(item);

        list.append(itemElement);
    }
}
displayTodos();