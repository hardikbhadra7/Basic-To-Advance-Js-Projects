let usertasks = document.getElementById("input");
let addbutton = document.querySelector("#addtasks");
let task = document.querySelector(".tasks");
function tasksadd(){
    if(usertasks.value==""){
        usertasks.value="";
        usertasks.style.border="2px solid red"
        usertasks.placeholder="please enter your tasks"
    }else{
        let newEle = document.createElement("li")
        newEle.innerHTML = `${usertasks.value} <i class="fas fa-trash"></i>
`;
        task.appendChild(newEle);
        usertasks.value="";
        usertasks.style.border="";
        newEle.querySelector("i").addEventListener("click", remove);
        function remove(){
            newEle.remove();
        }
    }
}
addbutton.addEventListener("click", tasksadd);