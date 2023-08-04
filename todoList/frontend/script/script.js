const tBody = document.querySelector("tbody");
const addForm = document.querySelector(".add_form");
const inputTask = document.querySelector(".input_task");

const pesqTaks = async () => {
  const response = await fetch("http://localhost:3300/tasks");
  const task = await response.json();
  return task;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch("http://localhost:3300/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  });

  inputTask.value = "";
  loadTasks();
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3300/tasks/${id}`, { method: "delete" });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3300/tasks/${id}`, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const option = { dateStyle: "short", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", option);
  return date;
};

const creteElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

const createSelect = (value) => {
  const select = creteElement(
    "select",
    "",
    '<option value="pendente">pendente</option>' +
      '<option value="concluido">concluido</option>' +
      '<option value="em andamento">em andamento</option>'
  );
  select.value = value;

  return select;
};

const createRow = (task) => {
  const { id, title, create_at, status_ } = task;

  const tr = creteElement("tr");
  const tdTitle = creteElement("td", title);
  const tdCreate = creteElement("td", formatDate(create_at));
  const tdStatus = creteElement("td");
  const tdAction = creteElement("td");

  const deleteButton = creteElement("button", "deletar");
  const editButton = creteElement("button", "editar");

  editButton.classList.add("btn_action");
  deleteButton.classList.add("btn_action");

  const editForm = creteElement("form");
  const editInput = creteElement("input");

  editInput.value = title;

  editForm.appendChild(editInput);

  const select = createSelect(status_);

  tdAction.appendChild(deleteButton);
  tdAction.appendChild(editButton);
  tdStatus.appendChild(select);
  tr.appendChild(tdTitle);
  tr.appendChild(tdCreate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdAction);

  select.addEventListener("change", ({ target }) =>
    updateTask({ id, title, status: target.value })
  );
  deleteButton.addEventListener("click", () => deleteTask(id));

  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateTask({ id, title: editInput.value, status: status_ });
  });

  return tr;
};

const loadTasks = async () => {
  const tasks = await pesqTaks();

  tBody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tBody.appendChild(tr);
  });
};

addForm.addEventListener("submit", addTask);

loadTasks();