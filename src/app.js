const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const clearTrashBtn = document.getElementById('clearTrash');

function createTask(text) {
  const div = document.createElement('div');
  div.className = 'draggable px-3 py-2 bg-slate-200 rounded shadow flex justify-between items-center cursor-pointer';
  div.draggable = true;

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'flex-1';

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'ml-2 text-sm';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.className = 'ml-2 text-sm hidden';
  delBtn.addEventListener('click', () => {
    div.remove();
  });

  div.appendChild(span);
  div.appendChild(editBtn);
  div.appendChild(delBtn);

  div.addEventListener('dragstart', () => {
    div.classList.add('dragging');
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
  });

  return div;
}

addBtn.addEventListener('click', () => {
  if (!input.value.trim()) return;
  const task = createTask(input.value.trim());
  document.getElementById('todo').appendChild(task);
  input.value = '';
});

const containers = document.querySelectorAll('#todo, #doing, #done, #trash');

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) {
      container.appendChild(dragging);
      const delBtn = dragging.querySelector('button:last-child');
      if (container.id === 'trash') {
        delBtn.classList.remove('hidden');
      } else {
        delBtn.classList.add('hidden');
      }
    }
  });
});

clearTrashBtn.addEventListener('click', () => {
  document.getElementById('trash').innerHTML = '';
});
