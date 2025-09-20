let taskId = 0;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let task = document.getElementById(data);
  let column = ev.target.closest(".column");

  if (column.classList.contains("trash")) {
    column.querySelector(".tasks").appendChild(task);
    addDeleteButton(task);
  } else {
    column.appendChild(task);
    removeDeleteButton(task);
  }
}

function addTask() {
  let input = document.getElementById("newTask");
  let value = input.value.trim();
  if (!value) return;

  let task = document.createElement("div");
  task.className = "task";
  task.id = "task-" + taskId++;
  task.draggable = true;
  task.ondragstart = drag;

  let span = document.createElement("span");
  span.textContent = value;

  enableEditing(span);

  task.appendChild(span);

  document.querySelector(".todo").appendChild(task);
  input.value = "";
}

function enableEditing(span) {
  span.ondblclick = () => {
    span.contentEditable = true;
    span.focus();
  };

  span.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      span.contentEditable = false;
    }
  });
}

function addDeleteButton(task) {
  if (!task.querySelector(".delete-btn")) {
    let delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => task.remove();
    task.appendChild(delBtn);
  }
}

function removeDeleteButton(task) {
  let btn = task.querySelector(".delete-btn");
  if (btn) btn.remove();
}

document.getElementById("newTask").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

document.getElementById("clearTrashBtn").onclick = () => {
  document.querySelector(".trash .tasks").innerHTML = "";
};