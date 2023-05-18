/* eslint-disable import/no-mutable-exports */
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const mytaskList = document.getElementById('myTasksList');

const renderTaskContainer = (task) => {
  const taskContainer = document.createElement('div');
  taskContainer.classList = 'content';
  taskContainer.dataset.index = task.index;

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.id = 'checkbox';
  checkboxInput.className = task.completed === true ? 'checked' : 'unchecked';
  checkboxInput.checked = task.completed === true;

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.className = task.completed === true ? 'taskCompleted editTask' : 'editTask';
  descriptionInput.value = task.description;

  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fa-solid', 'fa-trash-can', 'removeTask');
  removeIcon.id = 'removeTask';

  taskContainer.appendChild(checkboxInput);
  taskContainer.appendChild(descriptionInput);
  taskContainer.appendChild(removeIcon);

  return taskContainer;
};

const displayTask = () => {
  mytaskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskContainer = renderTaskContainer(task);
    mytaskList.appendChild(taskContainer);
  });
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(e); // pass the event object as the argument
  }
});

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
  addTask('clicked'); // pass the string 'clicked' as the argument
});

const editTask = (index, event) => {
  if (event.target.value === '') return;
  if (event.key === 'Enter') {
    tasks[index - 1].description = event.target.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const deleteTask = (targetIndex) => {
  const listFiltered = tasks.filter((item) => +item.index !== +targetIndex);
  const newList = listFiltered.map((item, index) => ({
    description: item.description,
    completed: item.completed,
    index: index + 1,
  }));
  tasks = newList;
  localStorage.setItem('tasks', JSON.stringify(newList));
  displayTask();
};

const loadTasks = (data) => {
  tasks = data;
  displayTask();
};

export {
  displayTask, editTask, deleteTask, tasks, loadTasks,
};
