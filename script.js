const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(){

    taskList.innerHTML = "";

    todos.forEach((todo,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task">
                <input type="checkbox" ${todo.completed ? "checked":""}>
                <span class="${todo.completed ? "completed":""}">
                    ${todo.text}
                </span>
            </div>

            <button class="delete">Delete</button>
        `;

        const checkbox = li.querySelector("input");
        const deleteBtn = li.querySelector(".delete");

        checkbox.addEventListener("change",()=>{

            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();

        });

        deleteBtn.addEventListener("click",()=>{

            todos.splice(index,1);
            saveTodos();
            renderTodos();

        });

        taskList.appendChild(li);

    });

}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        addTask();
    }
});

function addTask(){

    const text = taskInput.value.trim();

    if(text==="") return;

    todos.push({
        text:text,
        completed:false
    });

    saveTodos();
    renderTodos();

    taskInput.value="";
}

renderTodos();