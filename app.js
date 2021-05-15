//selectors
const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todolist =document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todos');


//Event listeners
document.addEventListener("DOMCOntent",getTodos);
todoButton.addEventListener("click",addTodo);
todolist.addEventListener('click',deleteCheck);
filterOption.addEventListener("click",filterTodo);




//functions
function addTodo(event){
    event.preventDefault();  //prevent from reload

    const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    //add to local storage
    saveLocalTodos(todoInput.value);

    //check button
    const completeButton= document.createElement("button");
    completeButton.innerHTML= '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);

    //Trash button
    const trashButton= document.createElement("button");
    trashButton.innerHTML= '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    //
    todolist.appendChild(todoDiv);
    todoInput.value=" ";

}
function deleteCheck(e){
    const item= e.target;
    if(item.classList[0]==='trash-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    if(item.classList[0]==="complete-button"){
        const todo = item.parentElement;
        todo.classList.add("completed");  
    }
}

function filterTodo(e){
    const todos = todolist.childNodes;
    // console.log(todos);

    todos.forEach((todo) => {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;

                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    
    todos.forEach((todo)=>{
        const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //check button
    const completeButton= document.createElement("button");
    completeButton.innerHTML= '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);

    //Trash button
    const trashButton= document.createElement("button");
    trashButton.innerHTML= '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    //
    todolist.appendChild(todoDiv);

    });
}