//funçoes de controle de banco de dados
const connection = require("./connection");

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks");
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;

  const dateUTC = new Date(Date.now()).toUTCString();

  const query = "INSERT INTO TASKS(title , status_ , create_at) VALUES (? , ? , ?)";

  const [createdTask] = await connection.execute(query, [title,"pendente",dateUTC]);

  return { inssertId: createdTask.insertId };
};

const deleteTasks = async (id) => {
    const query = "DELETE FROM tasks WHERE id = ?"
    const removeTasks = await connection.execute(query , [id])
    return removeTasks
}

const updateTasks = async (id , task) => {
    const {title , status} = task

    const query = "UPDATE tasks SET title = ?, status_ = ? WHERE id = ?"
    const [updateTasks] = await connection.execute(query , [title , status , id])

    return updateTasks
}

module.exports = {
  getAll,
  createTask,
  deleteTasks,
  updateTasks
};
