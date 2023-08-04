//criar as rotas da api
const express = require("express");

const router = express.Router();

const tasksController = require("./controllers/taskscontrollers");
const tasksMiddleware = require("./middleware/tasksMiddleware");

router.get("/tasks",tasksController.getAll);
router.post("/tasks",tasksMiddleware.validadeTitle, tasksController.createTask);
router.delete("/tasks/:id",tasksController.deleteTasks);
router.put("/tasks/:id",tasksMiddleware.validadeStatus, tasksMiddleware.validadeTitle, tasksController.updateTasks);

module.exports = router;
