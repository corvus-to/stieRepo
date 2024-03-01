const tasksArray = [];
let i = 0;
function addTodo() {
  const element = document.getElementById("task");
  const val = element.value;
  if (val != "") {
    tasksArray.push({ task: val, id: i });
    render();
  }
  i++;
}

function render() {
  let main_div = document.getElementById("tasks");
  main_div.innerHTML = "";
  tasksArray.forEach(element => {
    const taskDis = document.createElement("div");
    let checkBtn = document.createElement("INPUT");
    checkBtn.setAttribute('type', 'checkbox');
    checkBtn.onclick = highlightTodo;
    checkBtn.setAttribute('id', element["id"]);
    taskDis.appendChild(checkBtn);
    const taskVal = document.createElement("p");
    taskVal.innerText = element["task"];
    taskDis.appendChild(taskVal);
    main_div.appendChild(taskDis);
  });
}

function highlightTodo(event) {
  const checkButton = event.target;
  const idChecked = checkButton.id;
  tasksArray.forEach(element => {
    if (element.id == idChecked) {
      delete tasksArray[tasksArray.indexOf(element)]
    }
  });
  render();
}