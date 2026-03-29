alert('JS is connected!');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

       li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}">
        ${task.text}
    </span>
    <button onclick="deleteTask(${index})">X</button>
`;

        li.onclick = function(e) {
            if (e.target.tagName === "BUTTON") return;
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function clearTasks() {
    tasks = [];
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();