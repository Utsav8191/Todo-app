const input = document.querySelector('#add-task');
const addBtn = document.querySelector('.add-btn');
const taskUl = document.querySelector('#task-list');
let taskArray = [];

function renderList() {
  const todoTask = JSON.parse(localStorage.getItem('task'));

  taskUl.innerHTML = '';
  for(let i= 0; i< todoTask.length; i++){
    displayTask(todoTask[i]);
  }
}
function displayTask(tasktoRender) {
  const list = document.createElement("li");
  console.log(list);

  const checkbox = document.createElement("input");
  checkbox.setAttribute('type', 'checkbox');
  if(tasktoRender.done) {
    checkbox.setAttribute('checked', '');
  }
  checkbox.setAttribute('id', `${tasktoRender.id}`);
  checkbox.classList.add('custom-checkbox');
  list.appendChild(checkbox);

  const label = document.createElement("label");
  label.setAttribute('for', `${tasktoRender.id}`);
  label.innerHTML = `${tasktoRender.data}`;
  label.classList.add('label');
  list.appendChild(label);
  
  const deleteBtn = document.createElement("label");
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-taskid', `${tasktoRender.id}`);
  deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  list.appendChild(deleteBtn);
  taskUl.appendChild(list);
}

// function addTask(task) {
//   taskArray.push(task);
//   console.log('Task pushed to task array');
//   renderList(taskArray);
//   notify("Task Added");
//   return;
// }
function addTask(task) {
  const storedArray = JSON.parse(localStorage.getItem('task'));
  console.log("This is Stored Array data",storedArray);
  storedArray.push(task);
  localStorage.setItem('task', JSON.stringify(storedArray));
  renderList();
  notify("Task Was Added");
}

function removeTask(taskid) {
  const storedArray = JSON.parse(localStorage.getItem('task'));
  const updatedTasks = storedArray.filter(function(curr){
    return curr.id !== taskid;
  });
  console.log(updatedTasks);
  localStorage.setItem('task', JSON.stringify(updatedTasks));
  renderList(taskArray);
}

function markComplete(taskid) {
  const targetTask = taskArray.filter(function(curr){
    return curr.id === taskid;
  });
  console.log(targetTask);
  if(targetTask.length > 0) {
    targetTask[0].done = !targetTask[0].done;
    renderList();
    return;
  }
}

function notify(text) {
  alert(text);
}

function handleEvent(e) {
  if (e.key == 'Enter') {
    const text = e.target.value;
    console.log(text);
    if(text == '') {
      notify("Task cannot be empty!");
      return;
    }
    const task = {
      data: text,
      id: Date.now().toString(),
      done : false
    };
    console.log(task);
    e.target.value = '';
    addTask(task);
  }
  
}

// Using event delegation for handling check-box and delete
function handleClick(e) {
  const target = e.target;
  if (target.className === 'delete-btn') {
    
    const taskId = target.dataset.taskid;
    console.log(taskId);
    removeTask(taskId);
  } else if(target.className == 'custom-checkbox') {
    const taskId = target.id;
    console.log(taskId);
    markComplete(taskId);
  }
}

function initializeApp() {
  document.addEventListener('click', handleClick);
  input.addEventListener('keypress', handleEvent);
  addBtn.addEventListener('click', handleEvent);
}

function initializeArrayList() {
  const todoTasks = JSON.parse(localStorage.getItem('task'));
  if(!todoTasks) {
    localStorage.setItem('task', JSON.stringify([]));
  } else {
    renderList();
  }
}
initializeArrayList();

initializeApp();

