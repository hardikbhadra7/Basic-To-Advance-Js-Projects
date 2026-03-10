// local storage object 
let taskData = {}

const todo = document.querySelector(".todo");
const progress = document.querySelector(".progress");
const done = document.querySelector(".done");
const addNewTasks = document.getElementById("add-new-task");
const toggleModalBtn = document.querySelector(".toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const eachColumns = [todo, progress, done];

if (localStorage.getItem("columnstasks")) {
    const data = JSON.parse((localStorage.getItem("columnstasks")))

    for (const col in data) {
        data[col].forEach(task => {
            addTasks(task.title, task.desc, col)
        })
    }
    updateCount()
}

function addTasks(title, desc, col) {
    const div = document.createElement("div");
    div.classList.add("tasks")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
           <h2>${title}</h2>
           <p>${desc}</p>
           <button class="delete-btn">Delete</button>
           `
    col.appendChild(div)
    div.addEventListener("dragstart", () => {
        draggedTasks = div;
    })

    const deleteTasks = div.querySelector(".delete-btn")
    deleteTasks.addEventListener("click", () => {
        div.remove()
        updateCount()
    })
}

let draggedTasks = null;

function addDragEventColumns(columns) {
    columns.addEventListener("dragenter", (e) => {
        e.preventDefault();
        columns.classList.add("hover-over");
    })
    columns.addEventListener("dragleave", (e) => {
        e.preventDefault();
        columns.classList.remove("hover-over");
    })
    columns.addEventListener("dragover", (e) => {
        e.preventDefault()
    })
    columns.addEventListener("drop", (e) => {
        console.log("Dropped", e)
        columns.appendChild(draggedTasks);
        columns.classList.remove("hover-over")
        updateCount()
    })
}
addDragEventColumns(todo);
addDragEventColumns(progress);
addDragEventColumns(done);

function updateCount() {
    eachColumns.forEach(col => {
        const columnstasks = col.querySelectorAll(".tasks")
        const count = col.querySelector(".right")

        taskData[col.id] = Array.from(columnstasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("columnstasks", JSON.stringify(taskData));
        // console.log(taskData)
        count.innerText = columnstasks.length;
    })
}

toggleModalBtn.addEventListener("click", function () {
    modal.classList.add("active");
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addNewTasks.addEventListener("click", () => {
    const tasksTitle = document.querySelector(".input-box").value;
    const tasksDescription = document.querySelector(".textarea-box").value;

    if(tasksTitle.trim() === "" || tasksDescription.trim() === ""){
        alert("Please Enter Tasks Title And Tasks Description")
        return
    }

    addTasks(tasksTitle,tasksDescription,todo)

    modal.classList.remove("active")
    document.querySelector(".input-box").value = "";
    document.querySelector(".textarea-box").value = "";
    updateCount()
})