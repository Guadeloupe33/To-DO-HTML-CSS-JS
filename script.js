const todoList = [
  { name: 'make dinner', dueDate: '2025-02-22', completed: false },
  { name: 'wash dishes', dueDate: '2025-03-22', completed: false }
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate, completed } = todoObject;

    const html = `
      <div class="todo-item js-todo-item ${completed ? 'completed' : ''}">
        <input type="checkbox" class="js-complete-checkbox" ${completed ? 'checked' : ''}>
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
      </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Delete functionality
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        const todoItem = deleteButton.closest('.todo-item');
        todoItem.classList.add('fade-out');
        setTimeout(() => {
          todoList.splice(index, 1);
          renderTodoList();
        }, 300);
      });
    });

  // Mark as complete functionality
  document.querySelectorAll('.js-complete-checkbox')
    .forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        todoList[index].completed = checkbox.checked;
        renderTodoList();
      });
    });
}

// Add Todo functionality
document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name.trim() === '') {
    alert('Please enter a todo name.');
    return;
  }

  todoList.push({
    name,
    dueDate,
    completed: false
  });

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}
